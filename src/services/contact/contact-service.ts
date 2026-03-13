import "server-only";

import { Resend } from "resend";

import type { ContactSubmission } from "@/services/contact/contact-validation";

export class ContactConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactConfigurationError";
  }
}

export class ContactDeliveryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactDeliveryError";
  }
}

const getRequiredEnv = (name: "RESEND_API_KEY" | "CONTACT_FROM_EMAIL" | "CONTACT_TO_EMAIL") => {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new ContactConfigurationError(`${name} is required for the contact flow.`);
  }

  return value;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const buildContactText = (submission: ContactSubmission) =>
  [
    "Nova mensagem enviada pelo formulário público do site.",
    "",
    `Nome: ${submission.name}`,
    `Email: ${submission.email}`,
    `Assunto: ${submission.subject}`,
    "",
    "Mensagem:",
    submission.message,
  ].join("\n");

const buildContactHtml = (submission: ContactSubmission) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
    <h2 style="margin-bottom: 16px;">Nova mensagem do site</h2>
    <p><strong>Nome:</strong> ${escapeHtml(submission.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
    <p><strong>Assunto:</strong> ${escapeHtml(submission.subject)}</p>
    <p><strong>Mensagem:</strong></p>
    <pre style="white-space: pre-wrap; font-family: inherit; margin: 0;">${escapeHtml(submission.message)}</pre>
  </div>
`;

export const sendContactSubmission = async (submission: ContactSubmission) => {
  const resend = new Resend(getRequiredEnv("RESEND_API_KEY"));
  const from = getRequiredEnv("CONTACT_FROM_EMAIL");
  const to = getRequiredEnv("CONTACT_TO_EMAIL");

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: submission.email,
    subject: `[Site] ${submission.subject}`,
    text: buildContactText(submission),
    html: buildContactHtml(submission),
  });

  if (error) {
    throw new ContactDeliveryError(error.message);
  }

  return {
    id: data?.id ?? null,
  };
};
