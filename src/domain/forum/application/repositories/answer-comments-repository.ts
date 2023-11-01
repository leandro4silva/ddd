import { AnswerComments } from "../../enterprise/entities/answer-comments";

export interface AnswerCommentsRepository {
  create(questionComment: AnswerComments): Promise<void>;
}
