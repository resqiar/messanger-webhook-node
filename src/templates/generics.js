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
                            type: 'message',
                            title: 'YES',
                            payload: 'YES',
                        },
                        {
                            type: 'message',
                            title: 'NO',
                            payload: 'NO',
                        },
                    ],
                },
            ],
        },
    },
}

module.exports = GENERIC_BUTTON_TEMPLATE