const Message = require('../schemas/message')

module.exports = handleSaveMessages = async (sender_psid, received_message) => {
    try {
        await Message.create({
            message: received_message,
            sender_id: sender_psid,
        })
    } catch (e) {
        console.log(e)
    }
}
