import { PaginatinParams } from "@/core/repositories/pagination-params";
import { Answer } from "../../enterprise/entities/answer";

export interface AnswersRespository {
  findById(id: string): Promise<Answer | null>;
  findManyByQuestionId(
    questionId: string,
    params: PaginatinParams,
  ): Promise<Answer[]>;
  create(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
}
