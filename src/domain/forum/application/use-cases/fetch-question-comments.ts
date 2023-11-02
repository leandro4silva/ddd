import { QuestionComments } from "../../enterprise/entities/question-comments";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface FetchQuestionCommentsUseCaseRequest {
  page: number;
  questionId: string;
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComments[];
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });

    return {
      questionComments,
    };
  }
}
