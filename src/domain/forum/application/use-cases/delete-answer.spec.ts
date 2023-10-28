import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { makeAnswer } from "test/factories/make-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer", () => {
  beforeAll(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository); // system under test
  });

  it("should be able to delete a answer", async () => {
    const newQuestion = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1"),
    );

    await inMemoryAnswersRepository.create(newQuestion);

    await sut.execute({
      answerId: "answer-1",
      authorId: "author-1",
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a question from another user", async () => {
    const newQuestion = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1"),
    );

    await inMemoryAnswersRepository.create(newQuestion);

    expect(() => {
      return sut.execute({
        answerId: "answer-2",
        authorId: "author-1",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
