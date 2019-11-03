const github = require('@actions/github');

module.exports = {
  getCommitContext: () => {
    const context = github.context;
    const message = context.payload.head_commit ? context.payload.head_commit.message : '';
    
    return {
      ref: process.env.GITHUB_REF,
      sha: process.env.GITHUB_SHA,
      triggeredBy: process.env.GITHUB_ACTOR,
      repository: process.env.GITHUB_REPOSITORY,
      message,
    };
  },
};