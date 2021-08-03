import db from '../../db';

const getDueDateByGroupId = async (group_id) => {
  const dueDate = await db('groups').where({
    id: group_id,
  });
  return dueDate;
};

// `insert into times (time) values (to_timestamp(${Date.now()} / 1000.0))`

const createGroup = async (due_date) => {
  const idDate = await db('groups').insert(
    {
      due_date,
    },
    ['id', 'due_date']
  );
  return idDate;
};

export default {
  getDueDateByGroupId,
  createGroup,
};
