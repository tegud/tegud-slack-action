module.exports = {
  getViewInGithubButton: (environmentContext) => ({
    type: 'button',
    text: 'View in GitHub',
    url: `https://github.com/${environmentContext.repository}/commit/${environmentContext.sha}/checks`,
  }),
};