const github = require('@actions/github');
const { getEnvironmentContext } = require('../context/environment');
const { getCommitFields } = require('./commit-fields');
const { getViewInGithubButton } = require('./actions');

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
  const environmentContext = getEnvironmentContext();

  return {
    title: `${environmentContext.repository} ${environmentContext.environment ? `${environmentContext.environment} ` : ''}Build Finished - ${status}`,
    color: statusColors[status.toLowerCase()],
    text: commitMessage,
    fields: [
      ...getCommitFields(environmentContext),
    ],
    actions: [
      getViewInGithubButton(environmentContext),
    ],
  };
};