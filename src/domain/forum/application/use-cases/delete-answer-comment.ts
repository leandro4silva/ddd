import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string;
  authorId: string;
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComments) {
      throw new Error("Answer Comment not found.");
    }

    if (answerComments.authorId.toString() !== authorId) {
      throw new Error("Not allowed");
    }

    await this.answerCommentsRepository.delete(answerComments);

    return {};
  }
}
