const { getCommitContext } = require('../context/commit');
const { getJobContext } = require('../context/job');
const { getCommitFields } = require('./commit-fields');
const { getViewInGithubButton } = require('./actions');

const statusColors = {
  success: 'good',
  failed: 'danger',
  cancelled: '#23AED9',
  unknown: '#999',
};

module.exports = () => {
  const commitContext = getCommitContext();
  const jobContext = getJobContext();

  const { status } = jobContext;
  
  return {
    title: `${commitContext.repository} ${jobContext.environment ? `${jobContext.environment} ` : ''}Build Finished - ${status}`,
    color: statusColors[status.toLowerCase()],
    text: commitContext.message,
    fields: [
      ...getCommitFields(commitContext, jobContext),
    ],
    actions: [
      getViewInGithubButton(commitContext, jobContext),
    ],
  };
};