import { AnswerComments } from "../../enterprise/entities/answer-comments";

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComments): Promise<void>;
  findById(id: string): Promise<AnswerComments | null>;
  delete(answerComments: AnswerComments): Promise<void>;
}
