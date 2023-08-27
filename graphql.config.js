const { getPaths } = import('@redwoodjs/internal')

module.exports = {
  schema: getPaths().generated.schema,
}
