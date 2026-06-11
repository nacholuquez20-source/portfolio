import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Phone, Video, Send, Search, CheckCheck, Smile, Paperclip, Clock, Play, Sparkles } from 'lucide-react';
import { Operator, ChatMessage } from './types';
import { PRESET_SCENARIOS, Scenario } from './mockData';

interface PhoneMockupProps {
  operators: Operator[];
  selectedOperatorId: string;
  onSelectOperator: (id: string) => void;
  onSendMessage: (operatorId: string, text: string) => void;
  isProcessing: boolean;
}

export default function PhoneMockup({
  operators,
  selectedOperatorId,
  onSelectOperator,
  onSendMessage,
  isProcessing
}: PhoneMockupProps) {
  const [inputText, setInputText] = useState('');
  const activeOperator = operators.find(op => op.id === selectedOperatorId) || operators[0];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeOperator.initialChat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;
    onSendMessage(selectedOperatorId, inputText);
    setInputText('');
  };

  const handleTriggerScenario = (scenario: Scenario) => {
    if (isProcessing) return;
    onSelectOperator(scenario.operatorId);
    onSendMessage(scenario.operatorId, scenario.messageText);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl flex flex-col h-full" id="phone-mockup-wrapper">
      {/* Phone notches and decorative bezel */}
      <div className="w-full flex justify-between items-center px-6 pb-2.5 pt-0.5 text-xs text-slate-400 font-mono select-none">
        <span>12:40</span>
        <div className="w-20 h-4 bg-slate-950 rounded-b-xl border-x border-b border-slate-805 absolute left-1/2 transform -translate-x-1/2 top-4 hidden md:block" />
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]">5G</span>
          <div className="w-5 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
            <div className="h-full w-[85%] bg-slate-400 rounded-2xs" />
          </div>
        </div>
      </div>

      {/* Internal Phone Workspace splitting: contacts tab vs chat */}
      <div className="flex flex-col flex-1 bg-zinc-950 rounded-2xl overflow-hidden border border-slate-800 relative shadow-inner">
        
        {/* Contact Selection Ribbon */}
        <div className="border-b border-zinc-900 bg-zinc-950 px-2 py-3">
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-2 mb-1.5 flex items-center gap-1">
            <MessageSquare className="w-3 h-3" /> Canales de Operadores (WhatsApp)
          </p>
          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
            {operators.map(op => {
              const isSelected = op.id === selectedOperatorId;
              const lastMessage = op.initialChat[op.initialChat.length - 1];
              return (
                <button
                  key={op.id}
                  onClick={() => onSelectOperator(op.id)}
                  id={`operator-tab-${op.id}`}
                  className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border text-left transition-all duration-300 ${
                    isSelected 
                      ? 'bg-emerald-600/10 border-emerald-500 text-slate-100 shadow-[0_0_8px_rgba(16,185,129,0.15)]' 
                      : 'bg-zinc-900 border-zinc-800 text-slate-400 hover:border-zinc-700 hover:text-slate-350'
                  }`}
                >
                  <div className="relative">
                    <img 
                      src={op.avatar} 
                      alt={op.name} 
                      className="w-6 h-6 rounded-full object-cover border border-slate-800"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-zinc-950" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold leading-tight">{op.name.split(' ')[0]}</span>
                    <span className="text-[9px] font-mono text-slate-500">{op.vehicleId}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* WhatsApp Mobile Chat Header */}
        <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={activeOperator.avatar} 
                alt={activeOperator.name} 
                className="w-10 h-10 rounded-full object-cover border border-zinc-800"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-zinc-900" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-100 text-sm leading-tight">{activeOperator.name}</h4>
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                <span>En línea ({activeOperator.role})</span>
              </p>
            </div>
          </div>
          {/* Action icons */}
          <div className="flex items-center gap-3 text-slate-450 text-emerald-500">
            <Video className="w-4.5 h-4.5 cursor-pointer hover:text-emerald-400" />
            <Phone className="w-4.5 h-4.5 cursor-pointer hover:text-emerald-400" />
          </div>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-5 relative flex flex-col space-y-3 scrollbar-thin">
          {/* Ambient overlay background to mute the WhatsApp pattern */}
          <div className="absolute inset-0 bg-neutral-950 bg-opacity-[0.88] z-0 pointer-events-none" />

          {/* System Date Badge */}
          <div className="z-10 mx-auto bg-zinc-900 border border-zinc-800/80 px-3 py-1 rounded-full text-[10px] text-zinc-400 tracking-wide flex items-center gap-1 shadow-sm font-sans font-medium">
            <Clock className="w-3 h-3 text-slate-500" /> Hoy, 12:38 PM
          </div>

          {/* Messages list */}
          {activeOperator.initialChat.map((msg) => {
            const isOperator = msg.sender === 'operator';
            const isAI = msg.sender === 'ai_system';
            const isSimulated = msg.isSimulated;

            return (
              <div 
                key={msg.id} 
                className={`z-10 max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-md leading-relaxed ${
                  isOperator 
                    ? 'self-end bg-emerald-900/90 text-emerald-50 border border-emerald-800/65 rounded-br-none' 
                    : isAI
                      ? 'self-start bg-slate-900/95 text-slate-100 border border-blue-900/40 rounded-bl-none shadow-[0_0_8px_rgba(59,130,246,0.12)]'
                      : 'self-start bg-zinc-900/90 text-slate-300 border border-zinc-800 rounded-bl-none'
                }`}
              >
                {/* AI Tag indicator */}
                {isAI && (
                  <div className="flex items-center gap-1 text-[9px] font-mono font-bold tracking-widest text-blue-400 uppercase mb-1">
                    <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                    <span>Kernium AI Dispatcher</span>
                  </div>
                )}
                
                <p className="font-sans whitespace-pre-line">{msg.text}</p>
                
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400 font-mono">
                  <span>{msg.timestamp}</span>
                  {isOperator && <CheckCheck className="w-3.5 h-3.5 text-blue-400" />}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* WhatsApp typing input loader */}
        {isProcessing && (
          <div className="absolute bottom-16 left-4 z-20 bg-zinc-900 border border-zinc-800 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 shadow-lg text-[11px] text-slate-400">
            <span className="font-medium">{activeOperator.name.split(' ')[0]} está escribiendo</span>
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* WhatsApp Mobile Typing Bar */}
        <form onSubmit={handleSubmit} className="bg-zinc-900 border-t border-zinc-950 p-2.5 flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Smile className="w-5 h-5 cursor-pointer hover:text-slate-350" />
            <Paperclip className="w-5 h-5 cursor-pointer hover:text-slate-350" />
          </div>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isProcessing}
            placeholder={isProcessing ? 'Procesando pipeline...' : 'Escribe reporte al centro...'}
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-full px-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isProcessing}
            className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-slate-100 hover:bg-emerald-500 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 translate-x-0.25 -translate-y-0.25" />
          </button>
        </form>
      </div>

      {/* Preset interactive scenarios selector for portfolios */}
      <div className="mt-4 pt-3.5 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Escenarios Listos (Hacer Clic)
          </span>
          <span className="text-[10px] text-slate-400 italic">Dispara el pipeline</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {PRESET_SCENARIOS.map((scen) => (
            <button
              key={scen.id}
              onClick={() => handleTriggerScenario(scen)}
              disabled={isProcessing}
              id={`preset-button-${scen.id}`}
              className="flex items-center justify-between text-left p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500 hover:bg-slate-900 transition-all duration-300 disabled:opacity-40"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-200 truncate">{scen.name}</p>
                <p className="text-[10px] text-slate-400 line-clamp-1">{scen.description}</p>
              </div>
              <Play className="w-3 h-3 text-emerald-450 ml-2 group-hover:text-emerald-450 flex-shrink-0 animate-pulse" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
