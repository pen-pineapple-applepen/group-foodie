import groupsServices from './services.ts';

async function getDueDateByGroupId(req, res) {
  const { group_id } = req.params;
  try {
    const dueDate = await groupsServices.getDueDateByGroupId(group_id)
    res.status(200).send(dueDate);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function createGroup(req, res) {
  const { due_date } = req.body;
  try {
    const idAndDate = await groupsServices.createGroup(due_date)
    res.status(200).send(idAndDate);
  } catch (err) {
    res.status(404).send(err);
  }
}

export default {
  getDueDateByGroupId,
  createGroup,
}