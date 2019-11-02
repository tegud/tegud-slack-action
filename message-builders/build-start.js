module.exports = () => {
  return {
    text: `${process.env.GITHUB_REPOSITORY} Build Started`,
    fields: [
      {
        "title": "Ref",
        "value": process.env.GITHUB_REF,
        "short": true
      },
      {
        "title": "SHA",
        "value": process.env.GITHUB_SHA,
        "short": true
      },
      {
        "title": "Triggered By",
        "value": process.env.GITHUB_ACTOR,
        "short": true
      },
      {
        "title": "Workflow",
        "value": process.env.GITHUB_WORKFLOW,
        "short": true
      },
    ],
  };
};