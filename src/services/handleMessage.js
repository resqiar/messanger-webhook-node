const callSendAPI = require('./callSendApi')

// Handles messaging_postbacks events
module.exports = handleMessage = (sender_psid, received_message) => {
    let response

    // check if the message contains a text
    if (received_message.text) {

        // Create the payload for a basic text message
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
        }

        // Sends the response message
        callSendAPI(sender_psid, response);
    }
}