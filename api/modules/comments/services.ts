import db from '../../db';

const getCommentsByGroupId = async (group_id: number) => {
  const comments = await db('comments').where({ group_id });
  return comments;
};

const createComment = async (user_id: number, text: string, date: string, group_id: number) => {
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
};
