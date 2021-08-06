import { Request, Response } from 'express';
import groupsServices from './services';

async function getDueDateByGroupId(req: Request, res: Response) {
  const { group_id } = req.params;
  try {
    const dueDate = await groupsServices.getDueDateByGroupId(Number(group_id))
    res.status(200).send(dueDate);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function createGroup(req: Request, res: Response) {
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