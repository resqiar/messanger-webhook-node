const { MESSAGE_COUNTER, CURRENT_BIRTHDATE, IS_ASKING_FOR_BIRTHDAY } = require("../constants/variables")
const { SIMILAR_YES_MESSAGE, SIMILAR_NO_MESSAGE } = require("../constants/similar")
const GENERIC_BUTTON_TEMPLATE = require("../templates/generics")
const callSendApi = require("./callSendApi")
const diffDate = require("./diffDate")

module.exports = handleMessage = (id, received_message) => {
    /**
     * @MESSAGE_COUNTER @CURRENT_BIRTHDATE @IS_ASKING_FOR_BIRTHDAY
     * are a global variables used to update 
     * the behavior of the applications
     */
    if (MESSAGE_COUNTER === 0) {
        callSendApi(
            id,
            'Hi! welcome to bot-testing-node, what is your name?',
            false
        )

        Object.assign(MESSAGE_COUNTER, 1)
    } else if (MESSAGE_COUNTER === 1) {
        callSendApi(
            id,
            `Hello ${received_message}, when is your birthdate?`,
            false
        )

        Object.assign(MESSAGE_COUNTER, 2)
    } else if (MESSAGE_COUNTER === 2) {
        const birthdate = new Date(received_message)

        /**
         * If received date is invalid date
         * return back a message to provide
         * a correct one
         */
        if (birthdate.toString() === 'Invalid Date') {
            return callSendApi(
                id,
                'Invalid date, please make sure it is valid date format, e.g YYYY-MM-DD',
                false
            )
        }

        callSendApi(
            id,
            `Your birthdate is on ${birthdate.toDateString()}`,
            false
        )

        /**
         * Update user current birthdate
         * this should be saved with senderId to
         * persist if current user has already saved their birthdate
         * but for the sake of simplicity, i skip that.
         */
        Object.assign(CURRENT_BIRTHDATE, birthdate)

        /**
         * Send a template message with a
         * button, "YES" or "NO"
         * @see src/templates/generics
         */
        callSendApi(id, GENERIC_BUTTON_TEMPLATE, true)


        Object.assign(MESSAGE_COUNTER, 3)
        Object.assign(IS_ASKING_FOR_BIRTHDAY, true)
    } else if (MESSAGE_COUNTER === 3 && IS_ASKING_FOR_BIRTHDAY) {
        if (SIMILAR_YES_MESSAGE.includes(received_message.toLowerCase())) {
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

            Object.assign(MESSAGE_COUNTER, 0)
            Object.assign(IS_ASKING_FOR_BIRTHDAY, false)
        } else if (
            SIMILAR_NO_MESSAGE.includes(received_message.toLowerCase())
        ) {
            callSendApi(id, 'Sure, goodbye!', false)

            Object.assign(MESSAGE_COUNTER, 0)
            Object.assign(IS_ASKING_FOR_BIRTHDAY, false)
        } else {
            callSendApi(id, 'I dont know what you say?', false)
        }
    }
}