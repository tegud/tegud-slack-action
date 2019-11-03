const core = require("@actions/core");

module.exports = {
  getJobContext: () => {
    const event = core.getInput('event', { required: true });
    const environment = core.getInput('environment', { required: false });
    const { status = 'Unknown' } = JSON.parse(process.env.JOB_CONTEXT || {});

    return {
      event,
      environment,
      status,
      workflow: process.env.GITHUB_WORKFLOW,
    }
  },
};