type RouteScaffoldProps = {
  eyebrow: string;
  title: string;
  description: string;
  tags?: string[];
  checklist?: string[];
  note?: string;
};

export default function RouteScaffold({
  eyebrow,
  title,
  description,
  tags = [],
  checklist = [],
  note,
}: RouteScaffoldProps) {
  return (
    <section className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-card/45 p-6 shadow-[0_24px_64px_rgba(0,0,0,0.24)] md:p-8">
      <p className="text-primary text-xs tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-bold text-balance md:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/75 md:text-lg">
        {description}
      </p>

      {tags.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="tech-chip">
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {checklist.length > 0 ? (
        <div className="mt-8 rounded-2xl border border-white/10 bg-background/50 p-5">
          <h2 className="text-lg font-semibold">Estrutura reservada nesta rota</h2>
          <ul className="mt-4 space-y-3 text-sm text-foreground/75">
            {checklist.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {note ? (
        <p className="mt-6 text-sm leading-relaxed text-foreground/60">{note}</p>
      ) : null}
    </section>
  );
}
