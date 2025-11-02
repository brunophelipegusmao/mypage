import { Metadata } from "next";

import Container from "@/components/Container";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Demonstração - BGM Tecnologia Web | Preview do Tema",
  description:
    "Demonstração do tema personalizado e componentes desenvolvidos para o portfólio BGM Tecnologia Web.",
  robots: {
    index: false, // Não indexar página de demonstração
    follow: false,
  },
};

export default function HomePage() {
  return (
    <>
      <Container>
        <Header />

        {/* Demonstração do tema */}
        <div className="space-y-6 p-8">
          <h2 className="text-foreground mb-6 text-3xl font-bold">
            Demonstração do Tema Personalizado
          </h2>

          {/* Cards com diferentes cores */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card text-card-foreground border-border rounded-lg border p-6">
              <h3 className="mb-2 text-lg font-semibold">Card Padrão</h3>
              <p>Este card usa as cores card/card-foreground</p>
            </div>

            <div className="bg-primary text-primary-foreground rounded-lg p-6">
              <h3 className="mb-2 text-lg font-semibold">Primary Card</h3>
              <p>Card com cores primary (#049DD9)</p>
            </div>

            <div className="bg-secondary text-secondary-foreground rounded-lg p-6">
              <h3 className="mb-2 text-lg font-semibold">Secondary Card</h3>
              <p>Card com cores secondary (#140126)</p>
            </div>

            <div className="bg-accent text-accent-foreground rounded-lg p-6">
              <h3 className="mb-2 text-lg font-semibold">Accent Card</h3>
              <p>Card com cores accent (#049DD9)</p>
            </div>

            <div className="bg-muted text-muted-foreground rounded-lg p-6">
              <h3 className="mb-2 text-lg font-semibold">Muted Card</h3>
              <p>Card com cores muted</p>
            </div>
          </div>

          {/* Botões de demonstração */}
          <div className="space-x-4">
            <button className="bg-primary text-primary-foreground rounded px-4 py-2 transition-opacity hover:opacity-90">
              Botão Primary
            </button>
            <button className="bg-secondary text-secondary-foreground rounded px-4 py-2 transition-opacity hover:opacity-90">
              Botão Secondary
            </button>
            <button className="bg-accent text-accent-foreground rounded px-4 py-2 transition-opacity hover:opacity-90">
              Botão Accent
            </button>
          </div>

          {/* Demonstração de cores individuais */}
          <div className="mt-8">
            <h3 className="text-foreground mb-4 text-xl font-semibold">
              Paleta de Cores:
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <div className="text-center">
                <div
                  className="mb-2 h-20 w-full rounded"
                  style={{ backgroundColor: "#140126" }}
                ></div>
                <p className="text-foreground text-sm">#140126</p>
              </div>
              <div className="text-center">
                <div
                  className="mb-2 h-20 w-full rounded"
                  style={{ backgroundColor: "#4A1FA6" }}
                ></div>
                <p className="text-foreground text-sm">#4A1FA6</p>
              </div>
              <div className="text-center">
                <div
                  className="mb-2 h-20 w-full rounded"
                  style={{ backgroundColor: "#3658BF" }}
                ></div>
                <p className="text-foreground text-sm">#3658BF</p>
              </div>
              <div className="text-center">
                <div
                  className="mb-2 h-20 w-full rounded"
                  style={{ backgroundColor: "#049DD9" }}
                ></div>
                <p className="text-foreground text-sm">#049DD9</p>
              </div>
              <div className="text-center">
                <div
                  className="mb-2 h-20 w-full rounded"
                  style={{ backgroundColor: "#0D0000" }}
                ></div>
                <p className="text-foreground text-sm">#0D0000</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
