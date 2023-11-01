import { beforeEach } from "vitest";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryAnswersCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { makeAnswer } from "test/factories/make-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository;

let sut: CommentOnAnswerUseCase;

describe("Create Comment On Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository();

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswersCommentsRepository,
    ); // system under test
  });

  it("should be able to comment on answer", async () => {
    const newAnswer = makeAnswer();

    await inMemoryAnswersRepository.create(newAnswer);

    const { answerComment } = await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
      content: "Conteudo do comentario",
    });

    expect(inMemoryAnswersCommentsRepository.items[0].id).toEqual(
      answerComment.id,
    );
  });

  it("should be not able to comment on answer", async () => {
    const newAnswer = makeAnswer();

    await inMemoryAnswersRepository.create(newAnswer);

    expect(() => {
      return sut.execute({
        authorId: newAnswer.authorId.toString(),
        answerId: "answer-2",
        content: "Conteudo do comentario",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
