import { Either, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRespository } from "../repositories/answers-repository";

interface FetchQuestionAnswerUseCaseRequest {
  page: number;
  questionId: string;
}

type FetchQuestionAnswerUseCaseResponse = Either<
  null,
  {
    answers: Answer[];
  }
>;

export class FetchQuestionAnswerUseCase {
  constructor(private answerRepository: AnswersRespository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionAnswerUseCaseRequest): Promise<FetchQuestionAnswerUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page },
    );

    return right({
      answers,
    });
  }
}
