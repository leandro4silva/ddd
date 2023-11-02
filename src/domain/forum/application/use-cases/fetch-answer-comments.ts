import { AnswerComments } from "../../enterprise/entities/answer-comments";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface FetchAnswerCommentsUseCaseRequest {
  page: number;
  answerId: string;
}

interface FetchAnswerCommentsUseCaseResponse {
  answersComments: AnswerComments[];
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answersComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    return {
      answersComments,
    };
  }
}
