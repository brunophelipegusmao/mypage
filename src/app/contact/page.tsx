export default function ContactPage() {
  return (
    <main className="bg-background text-foreground min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-primary mb-8 text-center text-4xl font-bold">
          Entre em Contato
        </h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Formulário de Contato */}
          <div className="bg-card text-card-foreground border-border rounded-lg border p-6">
            <h2 className="mb-6 text-2xl font-semibold">Envie uma Mensagem</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  className="border-border bg-input text-foreground focus:ring-primary w-full rounded-lg border p-3 focus:border-transparent focus:ring-2"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="border-border bg-input text-foreground focus:ring-primary w-full rounded-lg border p-3 focus:border-transparent focus:ring-2"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  className="border-border bg-input text-foreground focus:ring-primary w-full rounded-lg border p-3 focus:border-transparent focus:ring-2"
                  placeholder="Assunto da mensagem"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="border-border bg-input text-foreground focus:ring-primary w-full resize-none rounded-lg border p-3 focus:border-transparent focus:ring-2"
                  placeholder="Descreva seu projeto ou dúvida..."
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-primary-foreground w-full rounded-lg px-6 py-3 font-semibold transition-opacity hover:opacity-90"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-6">
            <div className="bg-card text-card-foreground border-border rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Informações de Contato
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-primary mr-3">📧</span>
                  <span>bruno@exemplo.com</span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary mr-3">📱</span>
                  <span>(11) 99999-9999</span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary mr-3">📍</span>
                  <span>São Paulo, SP - Brasil</span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary mr-3">💼</span>
                  <span>LinkedIn: /in/brunogusmao</span>
                </div>
              </div>
            </div>

            <div className="bg-card text-card-foreground border-border rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">Disponibilidade</h3>
              <p className="text-card-foreground/80 mb-4">
                Estou disponível para novos projetos e consultorias. Respondo
                todas as mensagens em até 24 horas.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Segunda - Sexta:</span>
                  <span className="text-primary">9h às 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span className="text-primary">9h às 14h</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span className="text-muted-foreground">Indisponível</span>
                </div>
              </div>
            </div>

            <div className="bg-card text-card-foreground border-border rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">Redes Sociais</h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#"
                  className="bg-accent text-accent-foreground rounded-lg p-3 text-center transition-opacity hover:opacity-90"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="bg-accent text-accent-foreground rounded-lg p-3 text-center transition-opacity hover:opacity-90"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="bg-accent text-accent-foreground rounded-lg p-3 text-center transition-opacity hover:opacity-90"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="bg-accent text-accent-foreground rounded-lg p-3 text-center transition-opacity hover:opacity-90"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
