import { UniqueEntityID } from "@/core/entities/unique-entity-id";
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
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });

    console.log(answer);

    await this.answersRepository.create(answer);

    return answer;
  }
}
