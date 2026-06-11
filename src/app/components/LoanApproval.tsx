import React, { useState } from "react";
import { Check, ShieldCheck, DollarSign, Send, FileCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";

const COMMITTEE_LIMIT = 20000;
const APPROVAL_DELAY_MS = 3000;

const getButtonClasses = (isDisabled: boolean, isCommittee: boolean) => {
  if (isDisabled) return "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none";
  if (isCommittee) return "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 ring-4 ring-blue-500/20";
  return "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30 ring-4 ring-emerald-500/20";
};

export function LoanApproval() {
  const [amount, setAmount] = useState<number | "">("");
  const [isApproved, setIsApproved] = useState(false);

  const isCommittee = typeof amount === "number" && amount > COMMITTEE_LIMIT;
  const isDisabled = !amount || amount <= 0;

  const handleAction = () => {
    setIsApproved(true);
    setTimeout(() => {
      setIsApproved(false);
      setAmount("");
    }, APPROVAL_DELAY_MS);
  };

  return (
    <Card className="w-full relative overflow-hidden bg-white shadow-xl shadow-slate-200/50 border border-slate-100/80">
      <CardHeader className="bg-slate-50 border-b border-slate-200/60 pb-6 pt-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className={clsx("w-6 h-6 transition-colors duration-500", isCommittee ? "text-blue-600" : "text-emerald-600")} />
          <CardTitle className="text-xl text-slate-800">Aprobación Final del Crédito</CardTitle>
        </div>
        <p className="text-slate-500 text-sm mt-1 ml-9">
          Defina el monto final para determinar el nivel de autonomía requerido.
        </p>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-semibold text-slate-600 mb-2 uppercase tracking-wide">
              Monto a Desembolsar
            </label>
            <div className="relative group">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : parseFloat(e.target.value))}
                placeholder="0.00"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-2xl font-bold text-slate-800 placeholder:text-slate-300 shadow-inner"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 pointer-events-none">
                USD
              </div>
            </div>
            
            <AnimatePresence>
               {isCommittee && (
                 <motion.div
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: "auto" }}
                   exit={{ opacity: 0, height: 0 }}
                   className="mt-3 text-blue-600 text-sm font-medium flex items-center gap-2"
                 >
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                   Monto excede el límite de autonomía ({COMMITTEE_LIMIT.toLocaleString()} USD)
                 </motion.div>
               )}
            </AnimatePresence>
          </div>

          <div className="w-full md:w-1/2 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAction}
              disabled={isDisabled}
              className={clsx(
                "w-full md:w-auto min-w-[280px] px-8 py-5 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group",
                getButtonClasses(isDisabled, isCommittee)
              )}
            >
              <span className="relative z-10 flex items-center gap-3">
                {isApproved ? (
                  <>
                    <Check className="w-6 h-6" />
                    {isCommittee ? "Derivado con Éxito" : "Aprobado con Éxito"}
                  </>
                ) : (
                  <>
                    {isCommittee ? <Send className="w-5 h-5" /> : <FileCheck className="w-5 h-5" />}
                    {isCommittee ? "Derivar a Comité" : "Aprobar Crédito"}
                  </>
                )}
              </span>
              
              {/* Shine effect */}
              {!isDisabled && (
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
              )}
            </motion.button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
