"use client";

import { useState } from "react";

import { routeCatalog } from "@/lib/navigation/app-routes";

import { Button } from "../Button";
import { Card, CardContent, CardHeader, CardTitle } from "../Card";
import { Input, Textarea } from "../Input";

export interface ContactFormProps {
  animation?: string;
}

type ContactFormMessageType = "success" | "error" | "";

export function ContactForm({ animation }: ContactFormProps) {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<ContactFormMessageType>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const subject = (formData.get("subject") as string) || "";
    const messageText = (formData.get("message") as string) || "";

    try {
      const response = await fetch(routeCatalog.apiContact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message: messageText,
        }),
      });

      const payload = (await response.json()) as {
        error?: string;
        issues?: string[];
      };

      if (!response.ok) {
        const issues =
          Array.isArray(payload.issues) && payload.issues.length > 0
            ? payload.issues.join(" ")
            : payload.error;

        throw new Error(
          issues ??
            "Não foi possível enviar sua mensagem no momento. Tente novamente.",
        );
      }

      form.reset();
      setMessage(
        "Mensagem enviada com sucesso. O contato foi processado no servidor e entregue por email.",
      );
      setMessageType("success");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar sua mensagem no momento. Tente novamente.",
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card animation={animation}>
      <CardHeader>
        <CardTitle>Contato por email</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/70 mb-6 text-sm leading-relaxed">
          Este formulário envia a mensagem no servidor por um handler dedicado
          do App Router. O fluxo é público, isolado do restante do sistema e
          não depende de EmailJS nem de cliente de email local.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="fade-in-up animate-delay-300">
            <label
              htmlFor="contact-name"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Nome *
            </label>
            <Input
              id="contact-name"
              name="name"
              type="text"
              required
              disabled={isSubmitting}
              className="bg-dark-secondary border-primary focus:border-accent transition-colors"
            />
          </div>

          <div className="fade-in-up animate-delay-400">
            <label
              htmlFor="contact-email"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Email *
            </label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              disabled={isSubmitting}
              className="bg-dark-secondary border-primary focus:border-accent transition-colors"
            />
          </div>

          <div className="fade-in-up animate-delay-500">
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Assunto *
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              disabled={isSubmitting}
              className="bg-dark-secondary border-primary focus:border-accent transition-colors"
            />
          </div>

          <div className="fade-in-up animate-delay-600">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Mensagem *
            </label>
            <Textarea
              id="message"
              name="message"
              required
              rows={4}
              disabled={isSubmitting}
              className="bg-dark-secondary border-primary focus:border-accent transition-colors"
            />
          </div>

          {message && (
            <div className="fade-in-up">
              <div
                className={`rounded-lg p-3 text-sm ${
                  messageType === "success"
                    ? "border border-green-200 bg-green-100 text-green-800"
                    : "border border-red-500/30 bg-red-500/10 text-red-100"
                }`}
              >
                {message}
              </div>
            </div>
          )}

          <div className="fade-in-up animate-delay-700">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="hover:shadow-primary/30 w-full"
            >
              {isSubmitting ? "Enviando..." : "Enviar mensagem"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ContactForm;
