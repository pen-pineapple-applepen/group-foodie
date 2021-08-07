import { Comment } from './types';
import { CommentDTO } from './dto';

export default class CommentsMapper {
  static toCommentDTO(comment: Comment): CommentDTO {
    return {
      id: comment.id,
      user_id: comment.user_id,
      text: comment.text,
      date: comment.date,
      group_id: comment.group_id,
    };
  }

  static toCommentsDTO(comments: Comment[]): CommentDTO[] {
    return comments.map((comment) => {
      return this.toCommentDTO(comment);
    });
  }
}
