import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { CommentsProps, Comment } from "./comments";

interface QuestionCommentsProps extends CommentsProps {
  questionId: UniqueEntityID;
}

export class QuestionComments extends Comment<QuestionCommentsProps> {
  get questionId() {
    return this.props.questionId;
  }

  static create(
    props: Optional<QuestionCommentsProps, "createdAt">,
    id?: UniqueEntityID,
  ) {
    const answerComment = new QuestionComments(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return answerComment;
  }
}
