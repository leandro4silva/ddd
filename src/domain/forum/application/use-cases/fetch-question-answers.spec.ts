import { beforeEach, expect } from "vitest";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { FetchQuestionAnswerUseCase } from "./fetch-question-answers";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswerUseCase;

describe("Fetch Question Answers", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionAnswerUseCase(inMemoryAnswersRepository); // system under test
  });

  it("should be able to fetch question answers", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1"),
      }),
    );

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1"),
      }),
    );

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1"),
      }),
    );

    const { answers } = await sut.execute({
      page: 1,
      questionId: "question-1",
    });

    expect(answers).toEqual([
      expect.objectContaining({
        questionId: new UniqueEntityID("question-1"),
      }),
      expect.objectContaining({
        questionId: new UniqueEntityID("question-1"),
      }),
      expect.objectContaining({
        questionId: new UniqueEntityID("question-1"),
      }),
    ]);
  });

  it("should be able to fetch paginated questions answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID("question-1"),
        }),
      );
    }

    const { answers } = await sut.execute({
      page: 2,
      questionId: "question-1",
    });

    expect(answers).toHaveLength(2);
  });
});
