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

  console.log(context);

  return {
    text: `${process.env.GITHUB_REPOSITORY} Build Finished - ${status}`,
    color: statusColors[status],
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
      ...(context.head_commit ? [{
        title: "Commit Message",
        value: context.head_commit.message,
        short: false,
      }] : []),
    ],
  };
};