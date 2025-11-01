import Container from "@/components/Container";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <>
      <Container>
        <Header />
        
        {/* Demonstração do tema */}
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-foreground mb-6">Demonstração do Tema Personalizado</h2>
          
          {/* Cards com diferentes cores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card text-card-foreground p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-2">Card Padrão</h3>
              <p>Este card usa as cores card/card-foreground</p>
            </div>
            
            <div className="bg-primary text-primary-foreground p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Primary Card</h3>
              <p>Card com cores primary (#049DD9)</p>
            </div>
            
            <div className="bg-secondary text-secondary-foreground p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Secondary Card</h3>
              <p>Card com cores secondary (#140126)</p>
            </div>
            
            <div className="bg-accent text-accent-foreground p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Accent Card</h3>
              <p>Card com cores accent (#049DD9)</p>
            </div>
            
            <div className="bg-muted text-muted-foreground p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Muted Card</h3>
              <p>Card com cores muted</p>
            </div>
          </div>
          
          {/* Botões de demonstração */}
          <div className="space-x-4">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 transition-opacity">
              Botão Primary
            </button>
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:opacity-90 transition-opacity">
              Botão Secondary
            </button>
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded hover:opacity-90 transition-opacity">
              Botão Accent
            </button>
          </div>
          
          {/* Demonstração de cores individuais */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Paleta de Cores:</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-full h-20 rounded mb-2" style={{backgroundColor: '#140126'}}></div>
                <p className="text-sm text-foreground">#140126</p>
              </div>
              <div className="text-center">
                <div className="w-full h-20 rounded mb-2" style={{backgroundColor: '#4A1FA6'}}></div>
                <p className="text-sm text-foreground">#4A1FA6</p>
              </div>
              <div className="text-center">
                <div className="w-full h-20 rounded mb-2" style={{backgroundColor: '#3658BF'}}></div>
                <p className="text-sm text-foreground">#3658BF</p>
              </div>
              <div className="text-center">
                <div className="w-full h-20 rounded mb-2" style={{backgroundColor: '#049DD9'}}></div>
                <p className="text-sm text-foreground">#049DD9</p>
              </div>
              <div className="text-center">
                <div className="w-full h-20 rounded mb-2" style={{backgroundColor: '#0D0000'}}></div>
                <p className="text-sm text-foreground">#0D0000</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
