import { QuestionRespository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionRespository {
  public items: Question[] = [];

  async create(question: Question) {
    this.items.push(question);
  }
}
