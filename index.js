const https = require("https");

const post = ({ webhookUrl, data }) => {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    const url = new URL(webhookUrl);
    const options = {
      hostname: url.host,
      port: 443,
      path: url.path,
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    };

    const req = https.request(options, res => {
      const chunks = [];

      res.on("data", chunk => {
        chunks.push(chunk);
      });

      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          result: Buffer.concat(chunks).toString()
        });
      });
    });

    req.on("error", error => {
      reject(error);
    });

    req.write(jsonData);
    req.end();
  });
};

const sendMessage = () => post({
  webhookUrl: process.env.SLACK_WEBHOOK_URL,
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
