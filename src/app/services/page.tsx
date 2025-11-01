export default function ServicesPage() {
  return (
    <main className="bg-background text-foreground min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-primary mb-8 text-4xl font-bold">Serviços</h1>
        <div className="space-y-8">
          <section className="bg-card text-card-foreground border-border rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">Desenvolvimento Web</h2>
            <p className="mb-4">
              Criação de sites e aplicações web modernas, responsivas e
              otimizadas para performance.
            </p>
            <ul className="text-card-foreground/80 list-inside list-disc space-y-2">
              <li>Sites institucionais</li>
              <li>E-commerce</li>
              <li>Aplicações web complexas</li>
              <li>PWAs (Progressive Web Apps)</li>
            </ul>
          </section>

          <section className="bg-card text-card-foreground border-border rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              Desenvolvimento Mobile
            </h2>
            <p className="mb-4">
              Aplicativos nativos e híbridos para iOS e Android.
            </p>
            <ul className="text-card-foreground/80 list-inside list-disc space-y-2">
              <li>Apps nativos (Swift/Kotlin)</li>
              <li>React Native</li>
              <li>Flutter</li>
              <li>Ionic</li>
            </ul>
          </section>

          <section className="bg-card text-card-foreground border-border rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">Consultoria Técnica</h2>
            <p className="mb-4">
              Assessoria especializada em tecnologia e arquitetura de sistemas.
            </p>
            <ul className="text-card-foreground/80 list-inside list-disc space-y-2">
              <li>Arquitetura de sistemas</li>
              <li>Code review</li>
              <li>Otimização de performance</li>
              <li>Migração de tecnologias</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
