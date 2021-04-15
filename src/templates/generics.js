const GENERIC_BUTTON_TEMPLATE = {
    attachment: {
        type: 'template',
        payload: {
            template_type: 'generic',
            elements: [
                {
                    title:
                        'Do you want to see how many days ahead to your next birthday?',
                    buttons: [
                        {
                            type: 'postback',
                            title: 'YES',
                            payload: 'DATE_AHEAD_NO',
                        },
                        {
                            type: 'postback',
                            title: 'NO',
                            payload: 'DATE_AHEAD_NO',
                        },
                    ],
                },
            ],
        },
    },
}

module.exports = GENERIC_BUTTON_TEMPLATE