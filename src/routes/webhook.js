const express = require('express')
const callSendApi = require('../services/callSendApi')
const diffDate = require('../services/diffDate')
const router = express.Router()

let message_counter = 0
let current_birthdate

router.post('/webhook', (req, res) => {
    const requestBody = req.body
    /**
     * Check if this is an event from a page subscription
     * @True => GET the messages
     * @False => SEND 404
     */
    if (requestBody.object === 'page') {
        // Iterates over each entry - there may be multiple if batched
        requestBody.entry.forEach((entry) => {
            /**
             * Gets the message. entry.messaging is an array, but
             * will only ever contain one message, so we get index 0
             */
            const webhook_event = entry.messaging[0]
            console.log('webhook_event', webhook_event)

            // SENDER ID
            const sender_psid = webhook_event.sender.id
            console.log('Sender PSID: ' + sender_psid)

            /**
             * Check if the event is a message or postback and
             * pass the event to the appropriate handler function
             */
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message.text)
            }
        })
        res.send('EVENT_RECEIVED')
    } else {
        res.sendStatus(404)
    }
})

handleMessage = (id, received_message) => {
    if (message_counter == 0) {
        callSendApi(id, {
            "text": "Hi! welcome to bot-testing-node, what is your name?"
        })
        message_counter = 1;
    } else if (message_counter == 1) {
        callSendApi(id, {
            "text": `Hello ${received_message}, when is your birthdate?`
        })
        message_counter = 2;
    } else if (message_counter == 2) {
        const birthdate = new Date(received_message).toDateString()

        if (birthdate === 'Invalid Date') {
            return callSendApi(id, {
                "text": "Invalid date, please make sure it is valid date format, e.g YYYY-MM-DD"
            })
        }

        callSendApi(id, {
            "text": `Your birthdate is on ${birthdate}`
        })

        current_birthdate = birthdate

        callSendApi(id, {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Do you want to see how many days ahead to your next birthday?",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "YES",
                                "payload": "DATE_AHEAD_YES",
                            },
                            {
                                "type": "postback",
                                "title": "NO",
                                "payload": "DATE_AHEAD_NO",
                            }
                        ],
                    }]
                }
            }
        })

        message_counter = 3
    } else if (message_counter === 3) {
        const similar_yes_message = ['yes', 'yes!', 'yeah', 'ok', 'y', 'yup', 'yah', 'sure']
        const similar_no_message = ['no', 'nah', 'not', 'no!', 'not sure', 'n']

        if (similar_yes_message.includes(received_message.toLowerCase())) {
            const day_ahead = diffDate(new Date.now(), current_birthdate)

            callSendApi(id, {
                "text": `There are ${day_ahead} days left until your next birthday!`
            })

            message_counter = 0
        } else if (similar_no_message.includes(received_message.toLowerCase())) {
            callSendApi(id, {
                "text": "Sure, goodbye!"
            })

            message_counter = 0
        } else {
            callSendApi(id, {
                "text": "I dont know what you say?"
            })
        }
    }
}
/**
 * Adds support for GET requests to our webhook
 * This code adds support for the Messenger Platform's webhook verification to webhook.
 * This is required to ensure webhook is authentic and working.
 */
router.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN

    // Query Params
    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    // Checks if token and mode exist
    if (mode && token) {
        if (token === VERIFY_TOKEN && mode === 'subscribe') {
            // Responds with the message from the request
            console.log('WEBHOOK_VERIFIED')
            res.status(200).send(challenge)
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(401)
    }
})

module.exports = router
