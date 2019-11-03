const { getCommitContext } = require('../context/commit');
const { getJobContext } = require('../context/job');
const { getCommitFields } = require('./commit-fields');
const { getViewInGithubButton } = require('./actions');

module.exports = () => {
  const commitContext = getCommitContext();
  const jobContext = getJobContext();

  return {
    title: `${environmentContext.repository} ${environmentContext.environment ? `${environmentContext.environment} ` : ''}Build Started`,
    text: commitContext.message,
    color: 'warning',
    fields: [
      ...getCommitFields(commitContext, jobContext),
    ],
    actions: [
      getViewInGithubButton(commitContext, jobContext),
    ],
  };
};
