import { Header } from './components/Header';
import { CustomerSearch } from './components/CustomerSearch';
import { CapacityCalculator } from './components/CapacityCalculator';
import { LoanApproval } from './components/LoanApproval';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        
        <div className="mb-10 text-center sm:text-left relative overflow-hidden rounded-3xl bg-indigo-900 text-white p-8 sm:p-12 shadow-xl shadow-indigo-900/20 isolate">
          <img 
            src="https://images.unsplash.com/photo-1592698765727-387c9464cd7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYW5rJTIwZmluYW5jZSUyMGFic3RyYWN0fGVufDF8fHx8MTc3MTAxODY1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Bank Background"
            className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay -z-10"
          />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800/50 border border-indigo-700 text-indigo-200 text-xs font-medium mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sistema de Evaluación Crediticia
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
              Evaluación de Nuevos Créditos
            </h1>
            <p className="text-indigo-200 text-lg mb-8 max-w-lg">
              Complete los pasos secuenciales para validar, analizar y aprobar solicitudes de crédito de consumo.
            </p>
          </div>
        </div>


        <div className="space-y-8 relative">
          
        
          <div className="flex items-center gap-4 mb-2 ml-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-50">1</div>
            <h2 className="text-xl font-bold text-slate-800">Identificación del Cliente</h2>
          </div>
          <CustomerSearch />

          <div className="hidden md:block absolute left-[1.15rem] top-[14rem] bottom-[10rem] w-0.5 bg-gradient-to-b from-indigo-200 via-slate-200 to-transparent -z-10 opacity-50 border-l border-dashed border-indigo-300 h-[calc(100%-24rem)]"></div>

          <div className="flex items-center gap-4 mb-2 ml-2 pt-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-50">2</div>
            <h2 className="text-xl font-bold text-slate-800">Análisis Financiero</h2>
          </div>
          <CapacityCalculator />

          <div className="flex items-center gap-4 mb-2 ml-2 pt-4">
             <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-50">3</div>
             <h2 className="text-xl font-bold text-slate-800">Resolución Final</h2>
          </div>
          <LoanApproval />

        </div>
      </main>
      
    
      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2026 Sistema Bancario - Todos los derechos reservados.</p>
          <p className="mt-2">Sistema Interno Confidencial - Uso Exclusivo de Personal Autorizado</p>
        </div>
      </footer>
    </div>
  );
}
