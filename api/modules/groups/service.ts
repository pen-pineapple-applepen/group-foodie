import { Service } from 'typedi';
import db from '../../db';
import { DueDateDTO } from './dto';
import GroupsMapper from './mapper';

export interface GroupsService {
  getDueDateByGroupId(group_id: number): Promise<DueDateDTO>;
  createGroup(due_date: string): Promise<DueDateDTO>;
}

@Service()
export class GroupsServiceImpl implements GroupsService {
  getDueDateByGroupId = async (group_id: number): Promise<DueDateDTO> => {
    const [dueDate] = await db('groups').where({
      id: group_id,
    });
    const dueDateDTO = GroupsMapper.toDueDateDTO(dueDate);
    return dueDateDTO;
  };

  createGroup = async (due_date: string): Promise<DueDateDTO> => {
    const [dueDate] = await db('groups').insert(
      {
        due_date,
      },
      ['id', 'due_date']
    );
    const dueDateDTO = GroupsMapper.toDueDateDTO(dueDate);
    return dueDateDTO;
  };
}
