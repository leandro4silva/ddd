import { QuestionComments } from "../../enterprise/entities/question-comments";

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComments): Promise<void>;
  findById(id: string): Promise<QuestionComments | null>;
  delete(questionComments: QuestionComments): Promise<void>;
}
