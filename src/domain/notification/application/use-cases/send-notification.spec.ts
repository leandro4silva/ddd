import { InMemoryNotificationRepository } from "test/repositories/in-memory-notifications-repository";
import { SendNotification } from "./send-notification";

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: SendNotification;

describe("Send Notificaiton", () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    sut = new SendNotification(inMemoryNotificationRepository);
  });

  it("should be able to send notification", async () => {
    const result = await sut.execute({
      recipientId: "1",
      title: "Nova notification",
      content: "Conteudo da notification",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationRepository.items[0]).toEqual(
      result.value?.notification,
    );
  });
});
