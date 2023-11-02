import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComments } from "@/domain/forum/enterprise/entities/question-comments";

export class InMemoryQuestionsCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComments[] = [];

  async findById(id: string): Promise<QuestionComments | null> {
    const questionComment = this.items.find(
      (item) => item.id.toString() === id,
    );

    if (!questionComment) {
      return null;
    }

    return questionComment;
  }

  async delete(questionComments: QuestionComments): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComments.id,
    );

    this.items.splice(itemIndex, 1);
  }

  async create(questionComment: QuestionComments) {
    this.items.push(questionComment);
  }
}
