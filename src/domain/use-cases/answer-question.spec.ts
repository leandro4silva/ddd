import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRespository } from "../repositories/answers-repository";
import { Answer } from "../entities/answer";

const fakeAnswersRepository: AnswersRespository = {
  create: async (answer: Answer) => {
    // eslint-disable-next-line no-useless-return
    return; //
  },
};

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    questionId: "1",
    instructorId: "1",
    content: "Nova Resposta",
  });

  expect(answer.content).toEqual("Nova Resposta");
});
