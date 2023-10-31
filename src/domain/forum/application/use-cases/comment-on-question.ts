import { QuestionsRespository } from "../repositories/question-repository";
import { QuestionComments } from "../../enterprise/entities/question-comments";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComments;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRespository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const quesion = await this.questionRepository.findById(questionId);

    if (!quesion) {
      throw new Error("Question not found.");
    }

    const questionComment = QuestionComments.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment);

    return {
      questionComment,
    };
  }
}
