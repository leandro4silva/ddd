import { Answer } from "../entities/answer";

export interface AnswersRespository {
  create(answer: Answer): Promise<void>;
}
