const github = require('@actions/github');

module.exports = () => {
  const context = github.context;

  return {
    text: `${process.env.GITHUB_REPOSITORY} Build Started`,
    color: 'warning',
    fields: [
      {
        title: "Ref",
        value: process.env.GITHUB_REF,
        short: true,
      },
      {
        title: "SHA",
        value: process.env.GITHUB_SHA,
        short: true,
      },
      {
        title: "Triggered By",
        value: process.env.GITHUB_ACTOR,
        short: true,
      },
      {
        title: "Workflow",
        value: process.env.GITHUB_WORKFLOW,
        short: true,
      },
      {
        title: "Commit Message",
        value: context.head_commit.message,
        short: false,
      }
    ],
  };
};