import { AnswersRespository } from "../repositories/answers-repository";
import { QuestionsRespository } from "../repositories/question-repository";

interface ChooseQuestionBestAnswerRequest {
  answerId: string;
  authorId: string;
}

interface ChooseQuestionBestAnswerResponse {}

export class ChooseQuestionBestAnswer {
  constructor(
    private questionRepository: QuestionsRespository,
    private answerRepository: AnswersRespository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    );

    if (!question) {
      throw new Error("Question not found");
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed");
    }

    question.bestAnswerId = answer.id;

    await this.questionRepository.save(question);

    return {
      question,
    };
  }
}
