import { DueDateDTO } from './dto';
import { DueDate } from './types';

export default class GroupsMapper {
  static toDueDateDTO(dueDate: DueDate): DueDateDTO {
    return [dueDate];
  }
}
