import { beforeEach } from "vitest";
import { InMemoryAnswersCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { makeAnswerComment } from "test/factories/make-answer-comments";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete Answer Comments", () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswersCommentsRepository); // system under test
  });

  it("should be able to delete a answer comment", async () => {
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1"),
    );

    await inMemoryAnswersCommentsRepository.create(newAnswerComment);

    await sut.execute({
      answerCommentId: newAnswerComment.id.toString(),
      authorId: "author-1",
    });

    expect(inMemoryAnswersCommentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer comment", async () => {
    const newAnswerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1"),
    );

    await inMemoryAnswersCommentsRepository.create(newAnswerComment);

    expect(() => {
      return sut.execute({
        answerCommentId: newAnswerComment.id.toString(),
        authorId: "author-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
