import { Answer } from "../entities/answer";
import { AnswersRespository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRespository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({ content, authorId: instructorId, questionId });

    await this.answersRepository.create(answer);

    return answer;
  }
}
