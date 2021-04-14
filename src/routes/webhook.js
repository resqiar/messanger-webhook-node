const express = require('express')
const router = express.Router()

router.post('/webhook', (req, res) => {
    const requestBody = req.body
    /**
     * Check if this is an event from a page subscription
     * @True => GET the messages
     * @False => SEND 404
     */
    if (requestBody.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        requestBody.entry.map(entry => {
            /** 
             * Gets the message. entry.messaging is an array, but 
             * will only ever contain one message, so we get index 0
            */
            const webhook_event = entry.messaging[0];
            console.log(webhook_event);
        })
        res.send('EVENT_RECEIVED')
    } else {
        res.sendStatus(404)
    }
})

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
    const message = req.query['hub.message']

    // Checks if token and mode exist
    if (mode && token) {
        if (token === VERIFY_TOKEN && mode === 'subscribe') {
            // Responds with the message from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(message);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(401)
    }
})

module.exports = router