const fieldMappers = [
  { field: 'ref', context: 'commit' },
  { field: 'sha', context: 'commit', title: 'SHA', valueMapper: (context, field) => context[field] ? context[field].substring(0, 7) : '' },
  { field: 'triggeredBy', context: 'commit', title: 'Triggered By' },
  { field: 'workflow', context: 'job' },
];

const defaultValueMapper = (context, field) => context[field];

module.exports = {
  getCommitFields: (commit, job) => {
    const contexts = {
      commit,
      job
    };

    return fieldMappers.map(({
      context,
      field,
      title = `${field[0].toUpperCase()}${field.substring(1)}`,
      valueMapper = defaultValueMapper,
      short = true,
    }) => ({
      title,
      value: valueMapper(contexts[context], field),
      short,
    }));
  }
};
