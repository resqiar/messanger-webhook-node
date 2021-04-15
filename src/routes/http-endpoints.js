const express = require('express')
const router = express.Router()

const Message = require('../schemas/message')

router.get('/messages', async (req, res) => {
    res.send(await Message.find())
})

router.get('/messages?_id=:id', async (req, res) => {
    const { id } = req.params

    /**
     * Search messages by id
     */
    const result = await Message.findById(id)

    if (!result) res.sendStatus(404)

    res.send(result)
})

router.delete('/messages?_id=:id', async (req, res) => {
    const { id } = req.params

    /**
     * Search messages by id
     */
    const result = await Message.findByIdAndDelete(id)

    if (!result) res.sendStatus(404)

    res.send({
        status: "DELETED"
    })
})

module.exports = router