import React, { useState, useEffect } from "react";
import { Calculator, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { motion } from "motion/react";
import { clsx } from "clsx";

const AFP_RATE = 0.1271; // 12.71% Gestora discount

export function CapacityCalculator() {
  const [totalGanado, setTotalGanado] = useState<number | "">("");
  const [cuota, setCuota] = useState<number | "">("");
  const [liquidoPagable, setLiquidoPagable] = useState<number>(0);
  const [ratio, setRatio] = useState<number>(0);
  const [status, setStatus] = useState<"safe" | "warning" | "danger" | "idle">("idle");

  useEffect(() => {
    if (typeof totalGanado !== "number" || totalGanado <= 0) {
      setLiquidoPagable(0);
      setRatio(0);
      setStatus("idle");
      return;
    }

    const discount = totalGanado * AFP_RATE;
    const net = totalGanado - discount;
    setLiquidoPagable(net);

    if (typeof cuota !== "number" || cuota <= 0) {
      setRatio(0);
      setStatus("idle");
      return;
    }

    const calculatedRatio = (cuota / net) * 100;
    setRatio(Math.min(calculatedRatio, 100)); 

    if (calculatedRatio < 30) {
      setStatus("safe");
    } else if (calculatedRatio < 40) {
      setStatus("warning");
    } else {
      setStatus("danger");
    }
  }, [totalGanado, cuota]);

  const getTextColorClass = () => {
    switch (status) {
      case "safe": return "text-emerald-600";
      case "warning": return "text-amber-600";
      case "danger": return "text-rose-600";
      default: return "text-slate-400";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "safe": return "bg-emerald-500";
      case "warning": return "bg-amber-400";
      case "danger": return "bg-rose-500";
      default: return "bg-slate-200";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "safe": return "Capacidad de Pago Aprobada";
      case "warning": return "Capacidad Limitada - Requiere Revisión";
      case "danger": return "Alto Riesgo - Rechazado Automáticamente";
      default: return "Ingrese datos para calcular";
    }
  };

  return (
    <Card className="w-full mb-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />
      <CardHeader className="pl-8 bg-slate-50">
        <div className="flex items-center gap-2 text-indigo-900">
          <Calculator className="w-5 h-5" />
          <CardTitle>Calculadora de Capacidad de Pago</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="pl-8 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Inputs Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Total Ganado (Bs)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  value={totalGanado}
                  onChange={(e) => setTotalGanado(e.target.value === "" ? "" : parseFloat(e.target.value))}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-mono text-lg"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1 ml-1">
                Ingreso bruto mensual antes de descuentos
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Cuota Solicitada (Bs)
              </label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  value={cuota}
                  onChange={(e) => setCuota(e.target.value === "" ? "" : parseFloat(e.target.value))}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-mono text-lg"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-center space-y-4">
             <div className="flex justify-between items-center border-b border-slate-200 pb-3">
               <span className="text-slate-600 font-medium">Descuento AFP (12.71%)</span>
               <span className="font-mono text-rose-500 font-bold">
                 - {(typeof totalGanado === 'number' ? (totalGanado * AFP_RATE).toFixed(2) : "0.00")} Bs
               </span>
             </div>
             
             <div className="flex justify-between items-center pt-1">
               <span className="text-slate-800 font-bold text-lg">Líquido Pagable</span>
               <span className="font-mono text-emerald-600 font-bold text-2xl">
                 {liquidoPagable.toFixed(2)} Bs
               </span>
             </div>

             {/* Traffic Light Bar */}
             <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className={getTextColorClass()}>
                    {getStatusText()}
                  </span>
                  <span className="text-slate-500">{ratio.toFixed(1)}% Endeudamiento</span>
                </div>
                
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden relative">
                   {/* Background Zones */}
                   <div className="absolute top-0 left-0 w-[30%] h-full bg-emerald-100/50 border-r border-white/50" />
                   <div className="absolute top-0 left-[30%] w-[10%] h-full bg-amber-100/50 border-r border-white/50" />
                   <div className="absolute top-0 left-[40%] w-[60%] h-full bg-rose-100/50" />

                   {/* Indicator Bar */}
                   <motion.div 
                     className={clsx("h-full rounded-full shadow-lg transition-colors duration-500", getStatusColor())}
                     initial={{ width: 0 }}
                     animate={{ width: `${ratio}%` }}
                     transition={{ type: "spring", stiffness: 60, damping: 15 }}
                   />
                </div>
                
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">
                  <span>Seguro (0-30%)</span>
                  <span className="translate-x-2">Riesgo (30-40%)</span>
                  <span>Crítico (40%+)</span>
                </div>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
