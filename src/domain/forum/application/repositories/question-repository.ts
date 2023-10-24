import { Question } from "../../enterprise/entities/question";

export interface QuestionRespository {
  create(question: Question): Promise<void>;
}
