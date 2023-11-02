import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComments) {
      throw new Error("Question Comment not found.");
    }

    await this.questionCommentsRepository.delete(questionComments);

    return {};
  }
}
