import db from '../../db';

const getCommentsByGroupId = async (group_id) => {
  const comments = await db('comments').where({ group_id });
  return comments;
};

const createComment = async (user_id, text, date, group_id) => {
  const insertedId = await db('comments').insert(
    {
      user_id,
      text,
      date,
      group_id,
    },
    'id'
  );
  return insertedId;
};

export default {
  getCommentsByGroupId,
  createComment,
}