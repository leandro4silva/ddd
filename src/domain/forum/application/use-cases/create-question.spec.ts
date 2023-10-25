import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {
  beforeAll(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository); // system under test
  });

  it("should be able to create a question", async () => {
    const { question } = await sut.execute({
      authorId: "1",
      title: "Nova Pergunta",
      content: "Conteudo da pergunta",
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id);
  });
});
