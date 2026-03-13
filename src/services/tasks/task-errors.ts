export class TaskValidationError extends Error {
  readonly issues: string[];

  constructor(message: string, issues: string[] = []) {
    super(message);
    this.name = "TaskValidationError";
    this.issues = issues;
  }
}

export class TaskNotFoundError extends Error {
  constructor(message = "Tarefa não encontrada para o proprietário autenticado.") {
    super(message);
    this.name = "TaskNotFoundError";
  }
}
