import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { CommentDTO } from './dto';
import CommentsMapper from './mapper';

export interface CommentsService {
  getCommentsByGroupId(group_id: number): Promise<CommentDTO[]>;
  createComment(user_id: number, text: string, date: Date, group_id: number): Promise<number[]>;
}

@Service()
export class CommentsServiceImpl implements CommentsService {
  constructor(
    @Inject('DATABASE_ACCESS')
    private readonly db: Knex
  ) {}

  getCommentsByGroupId = async (group_id: number): Promise<CommentDTO[]> => {
    const comments = await this.db('comments').where({ group_id });
    const commentsDTO = CommentsMapper.toCommentsDTO(comments);
    return commentsDTO;
  };

  createComment = async (
    user_id: number,
    text: string,
    date: Date,
    group_id: number
  ): Promise<number[]> => {
    const insertedId = await this.db('comments').insert(
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
}
