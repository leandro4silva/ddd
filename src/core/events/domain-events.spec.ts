import { AggregateRoot } from "../entities/aggregate-root";
import { UniqueEntityID } from "../entities/unique-entity-id";
import { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";
import { vi } from "vitest";

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  public aggregate: CustomAggregate; //eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<any> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe("Domain Events", () => {
  it("should be able to dispatch and listem to events", () => {
    const callbackSpy = vi.fn();

    // Subscriber cadastrado (ouvindo o evento de "resposta criada")
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    // Estou criando uma resposta porem SEM salvar no banco
    const aggregate = CustomAggregate.create();

    // Estou assegutando que o evento foi criado porem NÃO foi disparado
    expect(aggregate.domainEvents).toHaveLength(1);

    // Estou salvando a resposta no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // O subscriber ouve o evneto e faz o que precisa ser feito com o dado
    expect(callbackSpy).toBeCalled();
    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
