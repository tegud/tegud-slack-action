const axios = require('axios');

const sendMessage = () => axios({
  method: 'POST',
  url: process.env.SLACK_WEBHOOK_URL,
  data: {
    attachments: [
      {
        text: "This is a test message, ignore",
        fields: [
          {
            "title": "Test",
            "value": "Test Message",
            "short": false
          },
        ],
      },
    ],
  },
});

(async () => {
  await sendMessage();
})();
