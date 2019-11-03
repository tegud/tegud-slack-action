const fieldMappers = [
  { field: 'ref' },
  { field: 'sha', title: 'SHA', valueMapper: (context, field) => context[field] ? context[field].substring(0, 7) : '' },
  { field: 'triggeredBy', title: 'Triggered By' },
  { field: 'workflow' },
];

const defaultValueMapper = (context, field) => context[field];

module.exports = {
  getCommitFields: (environmentContext) => fieldMappers.map(({
    field,
    title = `${field[0].toUpperCase()}${field.substring(1)}`,
    valueMapper = defaultValueMapper,
    short = true,
  }) => ({
    title,
    value: valueMapper(environmentContext, field),
    short,
  })),
};
