import { QuestionComments } from "../../enterprise/entities/question-comments";

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComments): Promise<void>;
}
