export type ContactSubmission = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export class ContactValidationError extends Error {
  constructor(public readonly issues: string[]) {
    super("Os dados do formulário de contato são inválidos.");
    this.name = "ContactValidationError";
  }
}

const contactEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeContactField = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

export const parseContactSubmission = (input: unknown): ContactSubmission => {
  if (!input || typeof input !== "object") {
    throw new ContactValidationError(["Payload JSON inválido."]);
  }

  const record = input as Record<string, unknown>;

  const submission: ContactSubmission = {
    name: sanitizeContactField(record.name),
    email: sanitizeContactField(record.email).toLowerCase(),
    subject: sanitizeContactField(record.subject),
    message: sanitizeContactField(record.message),
  };

  const issues: string[] = [];

  if (submission.name.length < 2 || submission.name.length > 80) {
    issues.push("Nome deve ter entre 2 e 80 caracteres.");
  }

  if (!contactEmailPattern.test(submission.email)) {
    issues.push("Email inválido.");
  }

  if (submission.subject.length < 3 || submission.subject.length > 120) {
    issues.push("Assunto deve ter entre 3 e 120 caracteres.");
  }

  if (submission.message.length < 10 || submission.message.length > 5000) {
    issues.push("Mensagem deve ter entre 10 e 5000 caracteres.");
  }

  if (issues.length > 0) {
    throw new ContactValidationError(issues);
  }

  return submission;
};
