const github = require('@actions/github');

module.exports = () => {
  const context = github.context;
  const commitMessage = context.payload.head_commit ? context.payload.head_commit.message : '';

  return {
    title: `${process.env.GITHUB_REPOSITORY} Build Started`,
    text: commitMessage,
    color: 'warning',
    fields: [
      {
        title: "Ref",
        value: process.env.GITHUB_REF,
        short: true,
      },
      {
        title: "SHA",
        value: process.env.GITHUB_SHA ? process.env.GITHUB_SHA.substring(0, 7) : '',
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
      ...(context.head_commit ? [{
        title: "Commit Message",
        value: context.head_commit.message,
        short: false,
      }] : []),
    ],
  };
};