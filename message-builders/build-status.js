const { getCommitContext } = require('../context/commit');
const { getJobContext } = require('../context/job');
const { getCommitFields } = require('./commit-fields');
const { getViewInGithubButton } = require('./actions');

const statusColors = {
  success: 'good',
  failure: 'danger',
  cancelled: '#23AED9',
  'in progress': 'warning',
  unknown: '#999',
};

module.exports = () => {
  const commitContext = getCommitContext();
  const jobContext = getJobContext();

  const { status } = jobContext;
  const statusText = status === 'In Progress' ? 'Started' : `Finished - ${status}`;

  return {
    title: `${commitContext.repository} ${jobContext.environment ? jobContext.environment : jobContext.workflow} Build ${statusText}`,
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