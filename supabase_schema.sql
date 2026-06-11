
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.clientes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ci VARCHAR(20) NOT NULL,
    extension VARCHAR(5) NOT NULL, 
    nombre_completo VARCHAR(150) NOT NULL,
    historial_crediticio VARCHAR(50) DEFAULT 'Sin Historial',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    CONSTRAINT uq_cliente_ci UNIQUE(ci, extension)
);

CREATE TABLE IF NOT EXISTS public.solicitudes_credito (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cliente_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,
    
    ingreso_total_ganado DECIMAL(12, 2) NOT NULL,
    descuento_afp DECIMAL(12, 2) NOT NULL,
    liquido_pagable DECIMAL(12, 2) NOT NULL,
    cuota_solicitada DECIMAL(12, 2) NOT NULL,
    ratio_endeudamiento DECIMAL(5, 2) NOT NULL, 
    nivel_riesgo VARCHAR(20) NOT NULL, 
    
    monto_desembolso DECIMAL(12, 2) NOT NULL,
    estado_aprobacion VARCHAR(30) DEFAULT 'Pendiente', 
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);



CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clientes_updated_at
    BEFORE UPDATE ON public.clientes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_solicitudes_updated_at
    BEFORE UPDATE ON public.solicitudes_credito
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solicitudes_credito ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura a usuarios autenticados" 
ON public.clientes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Permitir inserción a usuarios autenticados" 
ON public.clientes FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Permitir lectura a usuarios autenticados" 
ON public.solicitudes_credito FOR SELECT TO authenticated USING (true);

CREATE POLICY "Permitir inserción a usuarios autenticados" 
ON public.solicitudes_credito FOR INSERT TO authenticated WITH CHECK (true);

INSERT INTO public.clientes (ci, extension, nombre_completo, historial_crediticio)
VALUES 
('1234567', 'LP', 'Juan Pérez Tórrez', 'A (Excelente)'),
('9876543', 'SC', 'Maria Quispe Flores', 'B (Bueno)'),
('4561237', 'CB', 'Carlos Mendoza', 'C (Regular)')
ON CONFLICT DO NOTHING;
