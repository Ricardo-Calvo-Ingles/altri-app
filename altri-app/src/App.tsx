import React, { useState, useMemo } from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  ArrowLeftRight, 
  FileText, 
  AlertTriangle,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';

// Importamos los tipos desde el archivo types.ts que ya tienes
import { InventoryItem, Brand, View } from './types';

// Estos son los datos iniciales que aparecerán en tu app
const INITIAL_INVENTORY: InventoryItem[] = [
  { 
    id: '1', 
    code: '702452', 
    material: 'ARCADYAN LIVEBOX INFINITY', 
    family: 'Router', 
    value: 0, 
    hasSerialNumber: true, 
    stock: 50, 
    lowStockThreshold: 15, 
    brand: 'ORANGE', 
    category: 'Equipos' 
  },
  { 
    id: '2', 
    code: '702424', 
    material: 'ARCADYAN LIVEBOX 6', 
    family: 'Router', 
    value: 0, 
    hasSerialNumber: true, 
    stock: 35, 
    brand: 'ORANGE', 
    category: 'Equipos' 
  },
  { 
    id: '3', 
    code: 'R075L6SB2', 
    material: 'Router ZTE LiveBox 6s Wifi6', 
    family: 'Router', 
    value: 0, 
    hasSerialNumber: true, 
    stock: 12, 
    brand: 'MASMOVIL', 
    category: 'Equipos' 
  }
];

export default function App() {
  // ESTADOS: Aquí guardamos qué marca está seleccionada y qué estamos buscando
  const [view, setView] = useState<View>('dashboard');
  const [brand, setBrand] = useState<Brand>('ORANGE');
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);

  // LÓGICA DE FILTRADO: Filtra por marca Y por lo que escribas en el buscador
  const filteredItems = useMemo(() => {
    return inventory.filter(item => 
      item.brand === brand && 
      (item.material.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.code.includes(searchTerm))
    );
  }, [brand, searchTerm, inventory]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      
      {/* CABECERA (Header) */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-xl shadow-lg shadow-orange-200">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-slate-800 uppercase italic">
              Altri <span className="text-orange-600">Logistics</span>
            </h1>
          </div>

          {/* Selector de Marca: Orange o MásMóvil */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button 
              onClick={() => setBrand('ORANGE')}
              className={`px-6 py-2 text-xs font-black rounded-xl transition-all ${
                brand === 'ORANGE' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
              }`}
            >ORANGE</button>
            <button 
              onClick={() => setBrand('MASMOVIL')}
              className={`px-6 py-2 text-xs font-black rounded-xl transition-all ${
                brand === 'MASMOVIL' ? 'bg-[#ffdb00] text-black shadow-md' : 'text-slate-400 hover:text-slate-600'
              }`}
            >MÁSMÓVIL</button>
          </div>
        </div>
      </header>

      {/* CUERPO DE LA APP */}
      <main className="max-w-7xl mx-auto w-full p-4 md:p-8 pb-24 md:pb-8">
        
        {/* BUSCADOR */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar por material o código SAP..."
              className="w-full bg-white border border-slate-200 rounded-2xl px-12 py-4 shadow-sm focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all outline-none font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => alert('Próximamente: Formulario de Entrada')}
            className="bg-slate-900 text-white font-bold rounded-2xl px-8 py-4 hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            NUEVA ENTRADA
          </button>
        </div>

        {/* LISTADO DE MATERIALES */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Código SAP</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Descripción</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Stock</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-orange-50/30 transition-colors group">
                    <td className="px-8 py-6 font-mono text-sm text-slate-400 group-hover:text-orange-600">
                      {item.code}
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-700 leading-tight">{item.material}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">{item.category} • {brand}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <span className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-black text-xs ${
                          item.stock < item.lowStockThreshold 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-emerald-100 text-emerald-600'
                        }`}>
                          {item.stock < item.lowStockThreshold