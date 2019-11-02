const github = require('@actions/github');

const statusColors = {
  success: 'good',
  failed: 'danger',
  cancelled: '#23AED9',
  unknown: '#999',
};

module.exports = () => {
  const context = github.context;
  const { status = 'unknown' } = JSON.parse(process.env.JOB_CONTEXT || {});
  const commitMessage = context.payload.head_commit ? context.payload.head_commit.message : '';

  return {
    title: `${process.env.GITHUB_REPOSITORY} Build Finished - ${status}`,
    color: statusColors[status.toLowerCase()],
    text: commitMessage,
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
      ...(context.payload.head_commit ? [{
        title: "Commit Message",
        value: context.payload.head_commit.message,
        short: false,
      }] : []),
    ],
  };
};