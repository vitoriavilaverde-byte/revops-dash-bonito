
import React from 'react';
import { TIMELINE_EVENTS } from '../constants';
import { CheckCircle2, Calendar, Megaphone, AlertCircle, UserPlus } from 'lucide-react';

const getIcon = (type: string) => {
  switch (type) {
    case 'sale': return <CheckCircle2 size={18} />;
    case 'meeting': return <Calendar size={18} />;
    case 'campaign': return <Megaphone size={18} />;
    case 'alert': return <AlertCircle size={18} />;
    case 'lead': return <UserPlus size={18} />;
    default: return <CheckCircle2 size={18} />;
  }
};

const getColor = (color: string) => {
  switch (color) {
    case 'emerald': return 'bg-emerald-500 text-grey border-emerald-500';
    case 'blue': return 'bg-blue-500 text-grey border-blue-500';
    case 'violet': return 'bg-violet-500 text-grey border-violet-500';
    case 'orange': return 'bg-orange-500 text-grey border-orange-500';
    default: return 'bg-gray-500 text-grey border-gray-500';
  }
};

export const TimelineView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-grey">Linha do Tempo</h2>
        <p className="text-gray-400 mt-1">Atividades recentes e marcos importantes.</p>
      </div>

      <div className="relative border-l-2 border-border ml-4 space-y-8 pb-8">
        {TIMELINE_EVENTS.map((event, idx) => (
          <div key={event.id} className="relative pl-8 group">
            {/* Dot */}
            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${getColor(event.color).split(' ')[2]} bg-background group-hover:scale-125 transition-transform`}></div>
            
            {/* Content */}
            <div className="bg-surface border border-border rounded-xl p-5 hover:border-gray-600 transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md ${getColor(event.color).replace('border-', '')} bg-opacity-20 text-opacity-100`}>
                    {getIcon(event.type)}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    event.color === 'emerald' ? 'text-emerald-400' :
                    event.color === 'blue' ? 'text-blue-400' :
                    event.color === 'violet' ? 'text-violet-400' : 'text-orange-400'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-mono">{event.time}</span>
              </div>
              <h3 className="text-lg font-bold text-grey mb-1">{event.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
