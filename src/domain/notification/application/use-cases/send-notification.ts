import { Either, right } from "@/core/either";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationRepository } from "../repositories/notifications-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface SendNotificationRequest {
  recipientId: string;
  title: string;
  content: string;
}

type SendNotificationResponse = Either<
  null,
  {
    notification: Notification;
  }
>;

export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    });

    await this.notificationRepository.create(notification);

    return right({
      notification,
    });
  }
}
