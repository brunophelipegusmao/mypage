export class PostValidationError extends Error {
  readonly issues: string[];

  constructor(message: string, issues: string[] = []) {
    super(message);
    this.name = "PostValidationError";
    this.issues = issues;
  }
}

export class PostNotFoundError extends Error {
  constructor(message = "Post não encontrado para o proprietário autenticado.") {
    super(message);
    this.name = "PostNotFoundError";
  }
}

export class PostSlugConflictError extends Error {
  constructor(message = "Já existe um post usando esse slug.") {
    super(message);
    this.name = "PostSlugConflictError";
  }
}
