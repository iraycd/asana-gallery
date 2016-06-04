function resolveUser (_, args, context) {
  const {id} = args;
  const {db} = context;

  return db
    .table('users')
    .first(['id', 'username'])
    .where({id})
}

export default {
  resolveUser,
};
