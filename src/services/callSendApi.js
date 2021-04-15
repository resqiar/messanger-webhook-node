const axios = require('axios')

// Handles messaging_postbacks events
module.exports = callSendApi = (sender_psid, response, isCustomTemplate) => {
    let defaultResponse = {
        text: response
    }

    if (isCustomTemplate) {
        defaultResponse = response
    }

    // message body
    const request_body = {
        recipient: {
            id: sender_psid
        },
        message: defaultResponse
    }

    // request URL
    const REQUEST_URL = `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.ACCESS_TOKEN}`

    // Send the HTTP request to the Messenger Platform
    axios.post(REQUEST_URL, request_body).then(() => {
        console.log('message sent!')
    }).catch(err => {
        console.error("Unable to send message:" + err.detail);
    })
}