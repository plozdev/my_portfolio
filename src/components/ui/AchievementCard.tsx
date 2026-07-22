import { useState } from 'react';
import type { Achievement } from '@/data/achievements';
import { SafeImage } from './SafeImage';
import { ExternalLink, ChevronDown } from 'lucide-react';

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className={`bg-surface border border-border flex flex-col group cursor-pointer transition-all duration-300 hover:border-green-primary/50 ${expanded ? 'ring-1 ring-green-primary/50' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="font-bold text-lg text-text-primary group-hover:text-green-primary transition-colors">
            {achievement.title}
          </h3>
          <ChevronDown size={20} className={`text-text-secondary transition-transform duration-300 ${expanded ? 'rotate-180 text-green-primary' : ''}`} />
        </div>
        <p className="text-text-secondary text-sm">{achievement.description}</p>
        
        <div className={`grid transition-all duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
          <div className="overflow-hidden flex flex-col space-y-6">
            {achievement.learned && achievement.learned.length > 0 && (
              <div>
                <h5 className="text-xs font-bold text-text-primary mb-2 uppercase tracking-wider">What I Learned</h5>
                <ul className="space-y-1">
                  {achievement.learned.map((item, i) => (
                    <li key={i} className="text-sm text-text-secondary flex items-start">
                      <span className="text-green-primary mr-2">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {(achievement.image || achievement.certificate) && (
              <div className="w-full aspect-video bg-bg relative border border-border rounded-sm overflow-hidden">
                <SafeImage 
                  src={achievement.image || achievement.certificate} 
                  alt={achievement.title}
                  wrapperClassName="absolute inset-0"
                />
              </div>
            )}

            {achievement.link && (
              <a 
                href={achievement.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-sm font-mono text-green-primary hover:text-green-bright transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                View Documentation <ExternalLink size={14} className="ml-2" />
              </a>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-xs font-mono text-text-secondary">
          <span>{achievement.organization}</span>
          <span>{achievement.date}</span>
        </div>
      </div>
    </div>
  );
}
