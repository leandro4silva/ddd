import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer", () => {
  beforeAll(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository); // system under test
  });

  it("should be able to create an answer", async () => {
    const { answer } = await sut.execute({
      questionId: "1",
      instructorId: "1",
      content: "Nova Resposta",
    });

    expect(answer.id).toBeTruthy();
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
  });
});
