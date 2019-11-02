const https = require("https");

const post = ({ webhookUrl, data }) => {
  console.info('HTTP Begin');
  
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    const url = new URL(webhookUrl);

    const options = {
      hostname: url.host,
      port: 443,
      path: url.pathname,
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
        const result = Buffer.concat(chunks).toString();
        console.info(`HTTP END (${res.statusCode})`);
        if (res.statusCode === 302) {
          console.info(res.headers);
        }
        console.log(result);

        resolve({
          statusCode: res.statusCode,
          result,
        });
      });
    });

    req.on("error", error => {
      console.info('HTTP Error');

      reject(error);
    });

    req.write(`payload=${jsonData}`);
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
  try {
    console.log(`Sending build status to slacCk`);
    await sendMessage();
  } catch (e) {
    console.error(e.message);
  }
})();
