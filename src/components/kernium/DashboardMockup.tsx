import React, { useState } from 'react';
import { 
  Building2, MapPin, Wrench, BarChart4, Bell, CircleDot, 
  ArrowUpRight, Fuel, Thermometer, ShieldAlert, CheckCircle, Info, Flame, Settings, UserPlus
} from 'lucide-react';
import { Vehicle, MaintenanceTicket, VehicleId } from './types';

interface DashboardMockupProps {
  vehicles: Vehicle[];
  tickets: MaintenanceTicket[];
  onConfirmTicket: (ticketId: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onDispatchMechanic: (vehicleId: VehicleId, ticketId: string) => void;
}

export default function DashboardMockup({
  vehicles,
  tickets,
  onConfirmTicket,
  activeTab,
  setActiveTab,
  onDispatchMechanic
}: DashboardMockupProps) {
  const [selectedVehicleId, setSelectedVehicleId] = useState<VehicleId | null>(null);

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];

  // Helper for status classes
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Operating':
        return 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 font-semibold';
      case 'Maintenance':
        return 'bg-amber-500/15 text-amber-500 border border-amber-500/30 font-semibold';
      case 'Alert':
        return 'bg-rose-500/20 text-rose-500 border border-rose-500/35 font-semibold animate-pulse';
      default:
        return 'bg-neutral-500/10 text-neutral-400';
    }
  };

  const getSeverityStyle = (sev: string) => {
    switch (sev) {
      case 'high': return 'bg-rose-950/40 text-rose-400 border border-rose-800/40 text-[10px] font-mono uppercase px-1.5 py-0.5 rounded';
      case 'medium': return 'bg-amber-950/30 text-amber-400 border border-amber-700/40 text-[10px] font-mono uppercase px-1.5 py-0.5 rounded';
      default: return 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/30 text-[10px] font-mono uppercase px-1.5 py-0.5 rounded';
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-3 shadow-2xl flex flex-col h-full text-neutral-100 overflow-hidden" id="dashboard-mockup-wrapper">
      
      {/* Browser Bar Mockup */}
      <div className="flex items-center justify-between px-3 pb-2.5 pt-0.5 border-b border-neutral-800 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex-1 max-w-lg mx-6 bg-neutral-950 border border-neutral-800/80 text-neutral-400 text-xs px-4 py-1 rounded-lg flex items-center justify-between font-mono">
          <span className="truncate">https://console.kernium.ai/fleet-overview</span>
          <span className="text-neutral-600 text-[10px]">Secure Link</span>
        </div>
        <div className="w-5" />
      </div>

      {/* Internal Web Application Workspace splitting */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        
        {/* Web Navigation Sidebar */}
        <div className="w-14 lg:w-40 bg-neutral-950 border-r border-neutral-800 p-2 lg:p-3 flex flex-col justify-between flex-shrink-0">
          <div className="space-y-5">
            {/* Logo */}
            <div className="flex items-center gap-2 px-1.5 py-1 justify-center lg:justify-start">
              <div className="w-7 h-7 bg-emerald-700 rounded-lg flex items-center justify-center font-bold text-white text-sm shrink-0">
                K
              </div>
              <div className="hidden lg:block">
                <span className="font-bold tracking-tight text-neutral-100 text-sm">Kernium</span>
                <span className="text-[9px] text-neutral-400 block font-mono">FLOW INTEGRATOR</span>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Consola Flota', icon: CircleDot, badge: vehicles.filter(v => v.status === 'Alert').length },
                { id: 'map', label: 'Mapa Satelital', icon: MapPin },
                { id: 'maintenance', label: 'Triage de Taller', icon: Wrench, badge: tickets.filter(t => t.status === 'Pending').length },
                { id: 'reports', label: 'Reporte de AI', icon: BarChart4 }
              ].map(item => {
                const isSelected = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    id={`sidebar-link-${item.id}`}
                    title={item.label}
                    className={`w-full flex items-center justify-center lg:justify-between px-2 lg:px-3 py-2 rounded-xl text-left transition-all duration-200 text-xs ${
                      isSelected
                        ? 'bg-[#F8F8F5] text-neutral-900 font-semibold'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-neutral-900' : 'text-neutral-500'}`} />
                      <span className="hidden lg:inline">{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 ? (
                      <span className={`hidden lg:inline text-[10px] px-1.5 py-0.2 rounded-full font-bold font-mono ${
                        isSelected ? 'bg-neutral-900 text-white' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20 animate-pulse'
                      }`}>
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User profile section at base */}
          <div className="pt-4 border-t border-neutral-900 hidden lg:flex items-center gap-2.5 px-1.5">
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs font-bold text-neutral-300 font-mono">
              OP
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-neutral-200 truncate">Operador Jefe</p>
              <p className="text-[10px] text-neutral-500 truncate">Soporte Despacho</p>
            </div>
          </div>
        </div>

        {/* Dashboard Content Container */}
        <div className="flex-1 bg-neutral-950 p-4 overflow-y-auto flex flex-col min-h-0 relative scrollbar-thin">
          
          {/* Header area with dynamic alerts popup banner */}
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <div>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">SaaS Centro de Control</p>
              <h1 className="font-bold text-neutral-100 text-lg">
                {activeTab === 'overview' && 'Monitoreo de Flota Activa'}
                {activeTab === 'map' && 'Ubicación Satelital de Unidades'}
                {activeTab === 'maintenance' && 'Órdenes de Trabajo Automatizadas'}
                {activeTab === 'reports' && 'Eficiencia de Flota & AI Insights'}
              </h1>
            </div>

            {/* Notification triggers */}
            <div className="flex items-center gap-2">
              <div className="bg-neutral-900 border border-neutral-800 p-2 rounded-xl flex items-center gap-2.5 text-xs text-neutral-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span>Enlace WhatsApp: <strong className="text-emerald-400">ONLINE</strong></span>
              </div>
            </div>
          </div>

          {/* DYNAMIC ALERT POPUPS FROM WHATSAPP */}
          {tickets.some(t => t.status === 'Pending') && (
            <div className="mb-4 bg-rose-950/20 border border-rose-900/60 p-3.5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-bounce">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-rose-500/10 rounded-xl text-rose-500 border border-rose-500/20">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-200">Requerimiento de AI Recibido</h4>
                  <p className="text-[11px] text-neutral-400">
                    Se detectó reporte crítico de operador vía WhatsApp para <strong className="text-rose-400">{tickets.find(t => t.status === 'Pending')?.vehicleId}</strong>.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  id="confirm-auto-dispatch"
                  onClick={() => {
                    const pend = tickets.find(t => t.status === 'Pending');
                    if (pend) onDispatchMechanic(pend.vehicleId, pend.id);
                  }}
                  className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] px-4 py-1.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_12px_rgba(220,38,38,0.3)] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Wrench className="w-3 h-3" />
                  <span>Despachar Mecánico de Turno</span>
                </button>
              </div>
            </div>
          )}

          {/* CONTENT ACCORDING TO TABS */}

          {/* TAB 1: FLEET OVERVIEW (SIDE-BY-SIDE GRID OF MAP & TABLE) */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-4 min-h-0 flex-1">

              {/* Fleet List Table Panel */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                    <CircleDot className="w-3.5 h-3.5 text-emerald-500" /> Estado de Vehículos Industriales
                  </h3>
                  
                  {/* Table view */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-800 text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                          <th className="py-2.5 px-2">ID/Equipo</th>
                          <th className="py-2.5 px-2">Estado</th>
                          <th className="py-2.5 px-2">Operador</th>
                          <th className="py-2.5 px-2">Ubicación</th>
                          <th className="py-1.5 px-2 text-right">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60">
                        {vehicles.map((vh) => (
                          <tr 
                            key={vh.id}
                            className={`hover:bg-neutral-950/55 transition-colors cursor-pointer ${
                              selectedVehicleId === vh.id ? 'bg-neutral-900' : ''
                            }`}
                            onClick={() => setSelectedVehicleId(vh.id)}
                            id={`vehicle-row-${vh.id}`}
                          >
                            <td className="py-2.5 px-2">
                              <span className="font-mono font-bold text-neutral-200">{vh.id}</span>
                              <span className="text-[10px] text-neutral-400 block">{vh.type}</span>
                            </td>
                            <td className="py-2.5 px-2">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-wide ${getStatusStyle(vh.status)}`}>
                                {vh.status === 'Operating' ? 'Operativo' : vh.status === 'Maintenance' ? 'Taller' : 'Alerta'}
                              </span>
                            </td>
                            <td className="py-2.5 px-2">
                              <span className="font-medium text-neutral-300 block">{vh.operator}</span>
                            </td>
                            <td className="py-2.5 px-2 text-neutral-400 max-w-[120px] truncate" title={vh.location.name}>
                              {vh.location.name}
                            </td>
                            <td className="py-2.5 px-2 text-right">
                              <span className="text-emerald-400 text-[10px] font-semibold hover:underline">Telemetría</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Selected vehicle diagnostic telemetry box */}
                <div className="mt-4 pt-4 border-t border-neutral-800/65 bg-neutral-950/40 p-3 rounded-xl border border-neutral-800/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-neutral-200 flex items-center gap-1">
                      Diagnóstico: <strong className="text-emerald-400 font-mono">{selectedVehicle.name}</strong>
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">ID: {selectedVehicle.id}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-neutral-900/60 p-2 rounded-lg border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 flex items-center gap-1 mb-0.5"><BatteryIcon pct={selectedVehicle.metrics.battery} /> Carga Batería</span>
                      <strong className="text-xs font-mono text-neutral-200">{selectedVehicle.metrics.battery}%</strong>
                    </div>
                    <div className="bg-neutral-900/60 p-2 rounded-lg border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 flex items-center gap-1 mb-0.5"><Thermometer className="w-3   h-3 text-red-400" /> Temp Motor</span>
                      <strong className="text-xs font-mono text-neutral-200">{selectedVehicle.metrics.temperature}</strong>
                    </div>
                    <div className="bg-neutral-900/60 p-2 rounded-lg border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 flex items-center gap-1 mb-0.5"><Fuel className="w-3 h-3 text-emerald-400" /> Consumo</span>
                      <strong className="text-xs font-mono text-neutral-200">{selectedVehicle.metrics.fuelEfficiency}</strong>
                    </div>
                  </div>
                  {selectedVehicle.metrics.warningMsg && (
                    <p className="mt-2 text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-1 rounded flex items-center gap-1 font-sans">
                      <Info className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Reporte: {selectedVehicle.metrics.warningMsg}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Simplified Satelital GPS Tracking Map */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between h-full min-h-[220px]">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5 justify-between">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-500" /> Monitoreo Geográfico y Rutas</span>
                    <span className="text-[9px] font-mono font-normal text-neutral-500">GPS ACTIVO</span>
                  </h3>

                  {/* Visual SVG Map representation */}
                  <div className="w-full h-40 bg-neutral-950 rounded-xl relative border border-neutral-800 overflow-hidden shadow-inner flex items-center justify-center">
                    {/* SVG Map grid */}
                    <svg className="absolute inset-0 w-full h-full text-neutral-900" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                      {/* Industrial lanes / tracks */}
                      <path d="M 20,40 L 150,40 L 150,120 L 280,120 M 150,40 L 150,140 M 10,130 L 280,130" fill="none" stroke="#27272a" strokeWidth="6" strokeLinecap="round" />
                      <path d="M 20,40 L 150,40 L 150,120 L 280,120 M 150,40 L 150,140 M 10,130 L 280,130" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="5,5" strokeLinecap="round" className="opacity-45" />
                    </svg>

                    {/* Sector names overlay */}
                    <span className="absolute top-2 left-3 text-[8px] font-mono text-neutral-500 uppercase">Cantera Norte v3</span>
                    <span className="absolute bottom-2 left-3 text-[8px] font-mono text-neutral-500 uppercase">Taller Central</span>
                    <span className="absolute top-2 right-3 text-[8px] font-mono text-neutral-500 uppercase">Zona de Carga B</span>
                    <span className="absolute bottom-16 right-3 text-[8px] font-mono text-neutral-500 uppercase">Estructuras</span>

                    {/* Pulsing radar effect on alerts */}
                    {vehicles.map(v => {
                      const isAlert = v.status === 'Alert';
                      return isAlert ? (
                        <div 
                          key={`radar-${v.id}`}
                          className="absolute w-10 h-10 bg-rose-500/20 border border-rose-500/30 rounded-full animate-ping pointer-events-none"
                          style={{ left: `${v.location.x}%`, top: `${v.location.y}%`, transform: 'translate(-38%, -38%)' }}
                        />
                      ) : null;
                    })}

                    {/* Interactive points matching coordinates */}
                    {vehicles.map((v) => {
                      let colorClass = 'bg-emerald-500';
                      if (v.status === 'Alert') colorClass = 'bg-rose-500';
                      else if (v.status === 'Maintenance') colorClass = 'bg-amber-500';

                      const isSelected = selectedVehicleId === v.id;

                      return (
                        <button
                          key={v.id}
                          className={`absolute w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${colorClass} ${
                            isSelected ? 'ring-4 ring-white/60 scale-125 z-20' : 'hover:scale-110 z-10'
                          }`}
                          style={{ left: `${v.location.x}%`, top: `${v.location.y}%` }}
                          onClick={() => setSelectedVehicleId(v.id)}
                          title={`${v.name}: ${v.location.name}`}
                        >
                          <span className="text-[7.5px] font-bold text-neutral-950 font-mono tracking-tighter uppercase">
                            {v.id.split('-')[1]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3.5">
                    <p className="text-[10px] text-neutral-400 leading-normal flex items-start gap-1 pb-2">
                      <Info className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>El mapa satelital asigna dinámicamente un área basado en el webhook del operador. Hacer clic en los pines para ver el diagnóstico mecánico del vehículo.</span>
                    </p>
                  </div>
                </div>

                {/* KPI mini row details */}
                <div className="bg-neutral-950 px-3 py-2 rounded-xl flex items-center justify-between border border-neutral-800">
                  <div className="text-left">
                    <span className="text-[9px] text-neutral-500 block">Vehículo Seleccionado:</span>
                    <span className="text-[11px] font-bold text-neutral-300">{selectedVehicle.id} ({selectedVehicle.name.split(' ')[0]})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-neutral-500 block">Área Operativa:</span>
                    <span className="text-[11.2px] font-medium text-emerald-400 font-mono flex items-center gap-0.5 justify-end">
                      <MapPin className="w-3 h-3" /> {selectedVehicle.location.name.split(' - ')[0]}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: FULL MAP VIEW */}
          {activeTab === 'map' && (
            <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between min-h-0">
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-500" /> Ruta Optimizada por AI y Geocercas Activas
                  </h3>
                  <span className="text-xs text-neutral-400 flex items-center gap-1 bg-neutral-950 border border-neutral-800 px-3 py-1 rounded-lg">
                    <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    Telemetrías GPS sincronizadas por WhatsApp en tiempo real
                  </span>
                </div>

                <div className="flex-1 min-h-[300px] bg-neutral-950 border border-neutral-800 rounded-xl relative overflow-hidden flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full text-neutral-900/60" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    {/* Full layout lanes */}
                    <path d="M 50,50 L 250,50 L 250,220 L 580,220 M 250,50 L 250,280 M 50,250 L 580,250 M 150,50 L 150,250" fill="none" stroke="#27272a" strokeWidth="8" strokeLinecap="round" />
                    {/* Animated path for Truck 01 */}
                    <path d="M 50,50 L 250,50 L 250,220" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="8,8" strokeLinecap="round">
                      <animate attributeName="stroke-dashoffset" values="100;0" dur="15s" repeatCount="indefinite" />
                    </path>
                  </svg>
                  
                  {/* Satelital Landmarks */}
                  <div className="absolute top-10 left-16 text-xs bg-neutral-900/80 border border-neutral-800 px-2.5 py-1 rounded-md text-neutral-300 font-mono">
                    🏔️ Cantera Norte - Ruta 3
                  </div>
                  <div className="absolute top-10 right-16 text-xs bg-neutral-900/80 border border-neutral-800 px-2.5 py-1 rounded-md text-neutral-300 font-mono">
                    🏭 Zona de Carga B
                  </div>
                  <div className="absolute bottom-12 left-16 text-xs bg-neutral-900/80 border border-neutral-800 px-2.5 py-1 rounded-md text-neutral-300 font-mono">
                    ⚙️ Taller de Parque Central
                  </div>
                  <div className="absolute bottom-24 right-20 text-xs bg-neutral-900/80 border border-neutral-800 px-2.5 py-1 rounded-md text-neutral-300 font-mono">
                    🏗️ Obras de Infraestructura
                  </div>

                  {/* Pulsing rings on any Alert status */}
                  {vehicles.map(v => {
                    const isAlert = v.status === 'Alert';
                    return isAlert ? (
                      <div 
                        key={`mapl-radar-${v.id}`}
                        className="absolute w-14 h-14 bg-rose-500/20 border border-rose-500/20 rounded-full animate-ping pointer-events-none"
                        style={{ left: `${v.location.x}%`, top: `${v.location.y}%`, transform: 'translate(-38%, -38%)' }}
                      />
                    ) : null;
                  })}

                  {/* Large map markers */}
                  {vehicles.map(v => {
                    let colorClass = 'bg-emerald-500 text-neutral-950 border-emerald-400';
                    if (v.status === 'Alert') colorClass = 'bg-rose-500 text-neutral-950 border-rose-400';
                    else if (v.status === 'Maintenance') colorClass = 'bg-amber-500 text-neutral-950 border-amber-400';

                    return (
                      <div 
                        key={`mapview-${v.id}`}
                        className="absolute flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110"
                        style={{ left: `${v.location.x}%`, top: `${v.location.y}%`, transform: 'translate(-50%, -50%)' }}
                      >
                        {/* Vehicle status and ID tag indicator */}
                        <div className="mb-1 bg-neutral-900/95 border border-neutral-800 rounded px-1.5 py-0.5 text-[9px] font-bold text-neutral-200 shadow-xl pointer-events-none opacity-90">
                          {v.id}: {v.operator.split(' ')[0]}
                        </div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border font-mono font-bold text-xs shadow-lg ${colorClass}`}>
                          {v.type === 'Crane' ? '🏗️' : v.type === 'Truck' ? '🚛' : '🚐'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MAINTENANCE TICKETS BOARD */}
          {activeTab === 'maintenance' && (
            <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col min-h-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-emerald-500" /> Órdenes de Mantenimiento y Trabajo por AI
                </h3>
                <span className="text-xs text-neutral-400">Total: {tickets.length} registradas</span>
              </div>

              {tickets.length === 0 ? (
                <div className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl p-8 text-center flex flex-col items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mb-2 animate-pulse" />
                  <h4 className="text-neutral-200 font-semibold text-sm">Flota con Cero Alarmas Críticas</h4>
                  <p className="text-neutral-400 text-xs max-w-sm mt-1">
                    No hay solicitudes pendientes. Cuando un operador envíe una alerta crítica por WhatsApp, aparecerá una orden de triage de taller aquí automáticamente.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 overflow-y-auto max-h-[350px]">
                  {tickets.map((ticket) => (
                    <div 
                      key={ticket.id} 
                      className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-350 ${
                        ticket.status === 'Pending' 
                          ? 'bg-rose-950/15 border-rose-900 shadow-[0_0_12px_rgba(239,68,68,0.08)]' 
                          : ticket.status === 'In Progress'
                            ? 'bg-amber-950/10 border-amber-800'
                            : 'bg-neutral-950/40 border-neutral-800 opacity-60'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`p-2.5 rounded-xl border flex flex-col justify-center items-center h-12 w-12 text-[10px] uppercase font-bold tracking-tight font-mono ${
                          ticket.status === 'Pending' 
                            ? 'bg-rose-950/50 text-rose-400 border-rose-800/40' 
                            : 'bg-amber-950/40 text-amber-500 border-amber-800'
                        }`}>
                          <span>ID</span>
                          <span className="text-xs font-bold leading-tight">{ticket.id.split('-')[1]}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-neutral-200">{ticket.issue}</h4>
                            <span className={getSeverityStyle(ticket.severity)}>{ticket.severity}</span>
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                            Vehículo: <strong className="text-emerald-400">{ticket.vehicleId}</strong> • Reportado por operador <strong className="text-neutral-300">{ticket.reportedBy}</strong> el {ticket.date}
                          </p>
                          {ticket.status === 'In Progress' && (
                            <p className="text-[10px] text-amber-400 font-mono mt-1 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                              Mecánico despachado. Reparación en progreso.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 border-t border-neutral-800 pt-2.5 md:pt-0 md:border-t-0 w-full md:w-auto justify-end">
                        {ticket.status === 'Pending' ? (
                          <button
                            id={`dispatch-btn-${ticket.id}`}
                            onClick={() => onDispatchMechanic(ticket.vehicleId, ticket.id)}
                            className="bg-[#F8F8F5] hover:bg-white text-neutral-900 font-bold text-[10px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            Autorizar Mecánico
                          </button>
                        ) : ticket.status === 'In Progress' ? (
                          <button
                            id={`resolve-btn-${ticket.id}`}
                            onClick={() => onConfirmTicket(ticket.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-neutral-100 font-bold text-[10px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            Completar Reparación
                          </button>
                        ) : (
                          <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 py-1.5 px-3 bg-emerald-500/10 rounded-lg">
                            <CheckCircle className="w-3.5 h-3.5" /> Solucionado
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: AI REPORTS & PERFORMANCE */}
          {activeTab === 'reports' && (
            <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col space-y-4">
              <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-1.5">
                <BarChart4 className="w-4 h-4 text-emerald-500" /> Rendimiento de Gestión Industrial (datos ilustrativos de la demo)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wide">Tiempo de Respuesta</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold font-mono text-neutral-100">1.2m</span>
                    <span className="text-xs text-emerald-400 font-mono font-medium">-87% vs manual</span>
                  </div>
                  <p className="text-[10.5px] text-neutral-400 mt-2 leading-relaxed">
                    Triage y notificación automática por WhatsApp reducen el demorado flujo de llamadas de emergencia de 30 minutos a poco más de un minuto.
                  </p>
                </div>

                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wide">Ahorro en Combustible</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold font-mono text-neutral-100">+15.2%</span>
                    <span className="text-xs text-emerald-400 font-mono font-medium">Sustentable</span>
                  </div>
                  <p className="text-[10.5px] text-neutral-400 mt-2 leading-relaxed">
                    Las ruteadas automatizadas dictan el destino de carga óptimo, minimizando desgastes e innecesarios ralentís en canteras.
                  </p>
                </div>

                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wide">Downtime de Equipos</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold font-mono text-neutral-100">-34%</span>
                    <span className="text-xs text-emerald-400 font-mono font-medium">-18hs año</span>
                  </div>
                  <p className="text-[10.5px] text-neutral-400 mt-2 leading-relaxed">
                    Detección temprana y reportes instantáneos evitan fallas catastróficas del motor y reducen el remolque costoso con grúas de remolque.
                  </p>
                </div>
              </div>

              {/* Graphic metrics panel */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex-1">
                <span className="text-xs text-neutral-300 font-bold block mb-3">Métricas de Alarma Mensuales Analizadas por AI</span>
                <div className="h-28 flex items-end justify-between gap-2.5 pb-2 border-b border-neutral-800">
                  {[24, 45, 12, 56, 32, 65, 85, 34, 48, 55, 78, 62].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div 
                        className={`w-full rounded-t transition-all duration-500 hover:bg-emerald-400 ${
                          idx === 11 ? 'bg-emerald-500' : 'bg-neutral-800'
                        }`} 
                        style={{ height: `${val}%` }} 
                      />
                      <span className="text-[8px] font-mono text-neutral-500 mt-1 uppercase">M{idx+1}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-3 text-[10px] text-neutral-400 justify-center">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-neutral-800 rounded-sm" /> Meses Previos</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" /> Inteligencia WhatsApp Integrada (Mes Actual)</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Sparklines battery helper
function BatteryIcon({ pct }: { pct: number }) {
  let color = 'text-emerald-500';
  if (pct < 30) color = 'text-rose-500 animate-pulse';
  else if (pct < 60) color = 'text-amber-500';

  return (
    <div className={`w-3.5 h-2 border border-neutral-500 rounded-[2px] p-0.5 flex items-center ${color}`}>
      <div className="h-full bg-current rounded-[2px]" style={{ width: `${pct}%` }} />
    </div>
  );
}
