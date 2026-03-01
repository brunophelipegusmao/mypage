import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../Card";

export interface ContactInfoProps {
  icon: ReactNode;
  label: string;
  href?: string;
  target?: "_blank" | "_self";
}

export interface AvailabilityProps {
  day: string;
  time: string;
  available?: boolean;
}

export interface SocialLinkProps {
  name: string;
  href: string;
}

export function ContactInfoCard({
  contacts,
  animation,
}: {
  contacts: ContactInfoProps[];
  animation?: string;
}) {
  return (
    <Card animation={animation}>
      <CardHeader>
        <CardTitle>Informações de Contato</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {contacts.map((contact, index) => {
            const content = (
              <>
                <span className="text-primary mr-3">{contact.icon}</span>
                <span>{contact.label}</span>
              </>
            );

            if (contact.href) {
              return (
                <a
                  key={index}
                  href={contact.href}
                  target={contact.target ?? "_blank"}
                  rel="noopener noreferrer"
                  className="hover:text-primary flex items-center transition-colors duration-300"
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={index}
                className="hover:text-primary flex items-center transition-colors duration-300"
              >
                {content}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function AvailabilityCard({
  availability,
  description,
  animation,
}: {
  availability: AvailabilityProps[];
  description: string;
  animation?: string;
}) {
  return (
    <Card animation={animation}>
      <CardHeader>
        <CardTitle>Disponibilidade</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-card-foreground/80 mb-4">{description}</p>
        <div className="space-y-2">
          {availability.map((item, index) => (
            <div
              key={index}
              className="hover:text-primary flex justify-between transition-colors duration-300"
            >
              <span>{item.day}</span>
              <span
                className={
                  item.available !== false
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              >
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function SocialLinksCard({
  links,
  animation,
}: {
  links: SocialLinkProps[];
  animation?: string;
}) {
  return (
    <Card animation={animation}>
      <CardHeader>
        <CardTitle>Redes Sociais</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="bg-accent text-accent-foreground hover:shadow-primary/20 rounded-lg p-3 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
              target="_blank"
            >
              {link.name}
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const ContactCards = { ContactInfoCard, AvailabilityCard, SocialLinksCard };

export default ContactCards;
