import { beforeEach } from "vitest";
import { InMemoryAnswersCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { makeAnswerComment } from "test/factories/make-answer-comments";

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete Answer Comments", () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswersCommentsRepository); // system under test
  });

  it("should be able to delete a answer comment", async () => {
    const newAnswerComment = makeAnswerComment();

    await inMemoryAnswersCommentsRepository.create(newAnswerComment);

    await sut.execute({
      answerCommentId: newAnswerComment.id.toString(),
    });

    expect(inMemoryAnswersCommentsRepository.items).toHaveLength(0);
  });
});
