import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComments } from "@/domain/forum/enterprise/entities/answer-comments";

export class InMemoryAnswersCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComments[] = [];

  async create(answerComment: AnswerComments) {
    this.items.push(answerComment);
  }
}
