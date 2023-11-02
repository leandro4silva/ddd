import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string;
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComments) {
      throw new Error("Answer Comment not found.");
    }

    await this.answerCommentsRepository.delete(answerComments);

    return {};
  }
}
