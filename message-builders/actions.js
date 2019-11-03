module.exports = {
  getViewInGithubButton: (commitContext) => ({
    type: 'button',
    text: 'View in GitHub',
    url: `https://github.com/${commitContext.repository}/commit/${commitContext.sha}/checks`,
  }),
};