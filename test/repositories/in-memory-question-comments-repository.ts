import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComments } from "@/domain/forum/enterprise/entities/question-comments";

export class InMemoryQuestionsCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComments[] = [];

  async create(questionComment: QuestionComments) {
    this.items.push(questionComment);
  }
}
