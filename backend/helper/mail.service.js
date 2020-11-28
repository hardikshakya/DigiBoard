const axios = require('axios');

const EmailService = {};

EmailService.sendMail = (
    sendGridToken,
    sendGridConformation,
    email,
    name,
    reqObj
) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'post',
                url: 'https://api.sendgrid.com/v3/mail/send',
                headers: {
                    'content-type': 'application/json',
                    authorization: sendGridToken,
                },
                data: {
                    from: {
                        email: 'noreply@digiboard.com',
                        name: 'DigiBoard APP',
                    },
                    personalizations: [
                        {
                            to: [
                                {
                                    email,
                                    name,
                                },
                            ],
                            dynamic_template_data: reqObj,
                        },
                    ],
                    template_id: sendGridConformation,
                },
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = EmailService;
