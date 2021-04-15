let GLOBAL = require("../constants/variables")
const callSendApi = require("./callSendApi")
const diffDate = require("./diffDate")

module.exports = handlePostback = (id, received_postback) => {
    if (received_postback.payload === 'DATE_AHEAD_YES') {
        /**
             * Compare how many days left to
             * get to the user's birthday
             */
        const day_ahead = diffDate(CURRENT_BIRTHDATE)

        callSendApi(
            id,
            `There are ${day_ahead} days left until your next birthday!`,
            false
        )

        GLOBAL.MESSAGE_COUNTER = 0
        GLOBAL.IS_ASKING_FOR_BIRTHDAY = false
    } else if (received_postback.payload === 'DATE_AHEAD_NO') {
        callSendApi(id, 'Sure, goodbye!', false)

        GLOBAL_VALUE.MESSAGE_COUNTER = 0
        GLOBAL.IS_ASKING_FOR_BIRTHDAY = false
    }
}