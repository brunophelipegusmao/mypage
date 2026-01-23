"use client";

import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

import { EMAILJS_CONFIG } from "@/lib/emailjs-config";

import { Button } from "../Button";
import { Card, CardContent, CardHeader, CardTitle } from "../Card";
import { Input, Textarea } from "../Input";

export interface ContactFormProps {
  animation?: string;
}

export function ContactForm({ animation }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    // Usar tanto a referência do evento quanto a ref para máxima segurança
    const form = formRef.current || e.currentTarget;

    if (!form) {
      setMessage("Erro: Formulário não encontrado");
      setMessageType("error");
      setIsSubmitting(false);
      return;
    }

    try {
      // Enviar email via EmailJS usando configuração centralizada
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        form,
        EMAILJS_CONFIG.PUBLIC_KEY,
      );

      if (result.status === 200) {
        setMessage("✅ Mensagem enviada automaticamente! Retornarei em breve.");
        setMessageType("success");

        // Resetar formulário de forma segura
        form.reset();

        // Limpar mensagem após 5 segundos
        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 5000);
      } else {
        throw new Error("Falha no envio EmailJS");
      }
    } catch (error) {
      console.error("Erro EmailJS:", error);

      // Fallback: método mailto caso EmailJS falhe
      const formData = new FormData(form);
      const name =
        (formData.get("user_name") as string) ||
        (formData.get("from_name") as string) ||
        (formData.get("name") as string);
      const email =
        (formData.get("user_email") as string) ||
        (formData.get("from_email") as string) ||
        (formData.get("email") as string);
      const subject = formData.get("subject") as string;
      const messageText = formData.get("message") as string;

      const mailtoLink = `mailto:bruno.mulim.prog@gmail.com?subject=${encodeURIComponent(
        `[PORTFÓLIO] ${subject}`,
      )}&body=${encodeURIComponent(
        `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${messageText}\n\n---\nEnviado via formulário do portfólio`,
      )}`;

      window.location.href = mailtoLink;

      setMessage(
        "⚠️ Usando método alternativo. Complete o envio no seu aplicativo de email.",
      );
      setMessageType("success");

      // Limpar formulário também no fallback - verificar se existe
      if (form) {
        form.reset();
      }

      // Limpar mensagem após 5 segundos
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card animation={animation}>
      <CardHeader>
        <CardTitle>Envie uma Mensagem</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
          <div className="fade-in-up animate-delay-300">
            <label
              htmlFor="user_name"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Nome *
            </label>
            <Input
              id="user_name"
              name="user_name"
              type="text"
              required
              disabled={isSubmitting}
              className="bg-dark-secondary border-primary focus:border-accent transition-colors"
            />
          </div>

          <div className="fade-in-up animate-delay-400">
            <label
              htmlFor="user_email"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Email *
            </label>
            <Input
              id="user_email"
              name="user_email"
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
                    : "border border-red-200 bg-red-100 text-red-800"
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
              className="hover:shadow-primary/30 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ContactForm;
