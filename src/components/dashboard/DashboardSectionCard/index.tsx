import { ArrowRight } from "lucide-react";

import Button from "@/components/Button";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/Card";

type DashboardSectionCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  bullets: string[];
};

export default function DashboardSectionCard({
  eyebrow,
  title,
  description,
  href,
  cta,
  bullets,
}: DashboardSectionCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="space-y-3">
        <p className="text-primary text-xs tracking-[0.18em] uppercase">
          {eyebrow}
        </p>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex h-full flex-col">
        <p className="text-sm leading-relaxed text-foreground/72">
          {description}
        </p>

        <ul className="mt-5 space-y-3 text-sm text-foreground/68">
          {bullets.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="bg-primary mt-1.5 h-2 w-2 rounded-full" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Button
            href={href}
            variant="secondary"
            size="sm"
            className="inline-flex items-center gap-2"
          >
            {cta}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
