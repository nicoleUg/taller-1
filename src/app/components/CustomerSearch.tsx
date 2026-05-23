import React, { useState } from "react";
import { Search, CheckCircle, UserX, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { motion, AnimatePresence } from "motion/react";

const EXTENSIONS = [
  { value: "LP", label: "La Paz" },
  { value: "SC", label: "Santa Cruz" },
  { value: "CB", label: "Cochabamba" },
  { value: "OR", label: "Oruro" },
  { value: "PT", label: "Potosí" },
  { value: "TJ", label: "Tarija" },
  { value: "CH", label: "Chuquisaca" },
  { value: "BE", label: "Beni" },
  { value: "PA", label: "Pando" },
];

export function CustomerSearch() {
  const [ci, setCi] = useState("");
  const [extension, setExtension] = useState("LP");
  const [status, setStatus] = useState<"idle" | "searching" | "found" | "not-found">("idle");
  const [customerData, setCustomerData] = useState<{ name: string; score: string } | null>(null);

  const handleSearch = () => {
    if (!ci) return;
    setStatus("searching");
    // Mock API 
    setTimeout(() => {
      
      const isFound = Math.random() > 0.3;
      if (isFound) {
        setCustomerData({
          name: "Juan Pérez Tórrez",
          score: "A (Excelente)",
        });
        setStatus("found");
      } else {
        setCustomerData(null);
        setStatus("not-found");
      }
    }, 1500);
  };

  return (
    <Card className="w-full mb-6 relative overflow-visible">
      <CardHeader className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white rounded-t-2xl">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-200" />
          <CardTitle className="text-white">Búsqueda de Cliente</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-500 mb-1">
              Cédula de Identidad (C.I.)
            </label>
            <input
              type="text"
              value={ci}
              onChange={(e) => setCi(e.target.value)}
              placeholder="Ej: 1234567"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 font-medium placeholder:text-slate-300"
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-slate-500 mb-1">
              Extensión
            </label>
            <select
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-800 bg-white"
            >
              {EXTENSIONS.map((ext) => (
                <option key={ext.value} value={ext.value}>
                  {ext.label} ({ext.value})
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSearch}
            disabled={status === "searching" || !ci}
            className="w-full md:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 min-w-[120px]"
          >
            {status === "searching" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Verificar"
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {status === "found" && customerData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-start gap-3"
            >
              <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-emerald-800 text-lg">
                  Cliente Encontrado
                </h4>
                <p className="text-emerald-700">
                  <span className="font-medium">Nombre:</span> {customerData.name}
                </p>
                <p className="text-emerald-600 text-sm mt-1">
                  Historial Crediticio: {customerData.score}
                </p>
              </div>
            </motion.div>
          )}

          {status === "not-found" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3"
            >
              <UserX className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 text-lg">
                  Cliente Nuevo
                </h4>
                <p className="text-amber-700">
                  Este C.I. no está registrado en el sistema. Proceder con el registro de nuevo cliente.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
