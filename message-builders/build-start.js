const github = require('@actions/github');
const { getEnvironmentContext } = require('../context/environment');
const { getCommitFields } = require('./commit-fields');
const { getViewInGithubButton } = require('./actions');

module.exports = () => {
  const context = github.context;
  const commitMessage = context.payload.head_commit ? context.payload.head_commit.message : '';
  const environmentContext = getEnvironmentContext();

  return {
    title: `${environmentContext.repository} ${environmentContext.environment ? `${environmentContext.environment} ` : ''}Build Started`,
    text: commitMessage,
    color: 'warning',
    fields: [
      ...getCommitFields(environmentContext),
    ],
    actions: [
      getViewInGithubButton(environmentContext),
    ],
  };
};
