import { useState, useEffect, useRef } from 'react';

interface InfoItem {
  label: string;
  value: string;
  highlight?: boolean;
  isStatus?: boolean;
}

interface TextLine {
  text: string;
  highlight?: boolean;
  primary?: boolean;
}

interface CommandItem {
  command: string;
  type: 'key-value' | 'lines';
  items?: InfoItem[];
  lines?: TextLine[];
}

const PROFILE_COMMANDS: CommandItem[] = [
  {
    command: 'whoami',
    type: 'key-value',
    items: [
      { label: 'name', value: 'Hoang Mai' },
      { label: 'role', value: 'Backend Developer', highlight: true },
      { label: 'born', value: '01 Jul 2006' },
      { label: 'location', value: 'Ho Chi Minh City, Vietnam' },
    ],
  },
  {
    command: 'stack',
    type: 'lines',
    lines: [
      { text: 'Java · Spring Boot · Microservices', primary: true },
      { text: 'PostgreSQL · Redis · Apache Kafka' },
      { text: 'Docker · Kubernetes · GCP · Git' },
    ],
  },
  {
    command: 'current',
    type: 'key-value',
    items: [
      { label: 'work', value: 'FPT Software' },
      { label: 'position', value: 'Software Engineer Intern' },
      { label: 'school', value: 'FPT University' },
      { label: 'degree', value: 'Software Engineering' },
      { label: 'status', value: 'online', isStatus: true },
    ],
  },
  {
    command: 'focus',
    type: 'lines',
    lines: [
      { text: 'backend engineering', highlight: true },
      { text: 'high-concurrency systems' },
    ],
  },
];

export function ProfileTerminal() {
  const [stepIndex, setStepIndex] = useState(0);
  const [typedCharCount, setTypedCharCount] = useState(0);
  const [isTypingCommand, setIsTypingCommand] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Check reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setStepIndex(PROFILE_COMMANDS.length);
      setIsFinished(true);
      return;
    }
  }, []);

  // Typing animation driver
  useEffect(() => {
    if (isFinished) return;

    if (stepIndex >= PROFILE_COMMANDS.length) {
      setIsFinished(true);
      return;
    }

    const currentCmd = PROFILE_COMMANDS[stepIndex].command;

    if (isTypingCommand) {
      if (typedCharCount < currentCmd.length) {
        // Randomize character delay slightly for realistic feel (45-80ms)
        const delay = 45 + Math.random() * 35;
        const timer = setTimeout(() => {
          setTypedCharCount(prev => prev + 1);
        }, delay);
        return () => clearTimeout(timer);
      } else {
        // Command typing finished, short pause before showing output
        const timer = setTimeout(() => {
          setIsTypingCommand(false);
        }, 220);
        return () => clearTimeout(timer);
      }
    } else {
      // Pause after output before typing next command (450ms)
      const timer = setTimeout(() => {
        setStepIndex(prev => prev + 1);
        setTypedCharCount(0);
        setIsTypingCommand(true);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [stepIndex, typedCharCount, isTypingCommand, isFinished]);

  // Auto-scroll terminal body to bottom as text appears
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [stepIndex, typedCharCount, isTypingCommand]);

  return (
    <div className="w-full max-w-[500px] mx-auto rounded-xl overflow-hidden border border-[#6DB33F]/30 glass-card shadow-[0_0_35px_rgba(109,179,63,0.12)] flex flex-col bg-[#0d1117]/95 backdrop-blur-md transition-all">
      {/* Header / Chrome */}
      <div className="flex items-center px-4 py-2.5 bg-[#161b22] border-b border-white/10 relative">
        {/* macOS Traffic Lights */}
        <div className="flex gap-2 absolute left-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>

        {/* Window Title */}
        <div className="flex-1 flex justify-center text-xs text-text-secondary font-mono select-none">
          hoang@dev:~
        </div>
      </div>

      {/* Terminal Content Body - Increased height & padding to prevent bottom text overflow */}
      <div
        ref={terminalBodyRef}
        className="h-[360px] p-4 sm:p-5 pb-8 overflow-y-auto scrollbar-hide font-mono text-xs sm:text-[13px] leading-[22px] text-[#c9d1d9] bg-[#0d1117] space-y-3.5"
      >
        {PROFILE_COMMANDS.map((cmdItem, idx) => {
          const isCurrentStep = idx === stepIndex;
          const isPastStep = idx < stepIndex;

          if (!isPastStep && !isCurrentStep && !isFinished) return null;

          const typedText = isPastStep || isFinished
            ? cmdItem.command
            : cmdItem.command.slice(0, typedCharCount);

          const showOutput = isPastStep || isFinished || (!isTypingCommand && isCurrentStep);

          return (
            <div key={cmdItem.command} className="space-y-1">
              {/* Prompt & Command */}
              <div className="flex items-center gap-2 text-white">
                <span className="text-[#6DB33F] font-bold">$</span>
                <span className="font-semibold">{typedText}</span>
                {isCurrentStep && isTypingCommand && !isFinished && (
                  <span className="inline-block w-2 h-4 bg-[#6DB33F] animate-pulse" />
                )}
              </div>

              {/* Command Output */}
              {showOutput && (
                <div className="pl-3.5 border-l-2 border-[#6DB33F]/40 space-y-1 my-1 text-text-secondary">
                  {cmdItem.type === 'key-value' && cmdItem.items && (
                    <div className="space-y-0.5">
                      {cmdItem.items.map(item => (
                        <div key={item.label} className="flex gap-2">
                          <span className="w-20 shrink-0 text-text-secondary/70 font-mono">
                            {item.label}
                          </span>
                          <span className="text-text-secondary/40">:</span>
                          <span
                            className={
                              item.highlight
                                ? 'text-[#6DB33F] font-bold'
                                : item.isStatus
                                  ? 'text-[#6DB33F] font-medium flex items-center gap-1.5'
                                  : 'text-white/90 font-medium'
                            }
                          >
                            {item.isStatus && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#6DB33F] animate-pulse" />
                            )}
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {cmdItem.type === 'lines' && cmdItem.lines && (
                    <div className="space-y-0.5">
                      {cmdItem.lines.map((line, lIdx) => (
                        <div
                          key={lIdx}
                          className={
                            line.highlight
                              ? 'text-[#6DB33F] font-bold'
                              : line.primary
                                ? 'text-white font-medium'
                                : 'text-text-secondary'
                          }
                        >
                          {line.primary ? (
                            <span>
                              <span className="text-[#6DB33F] font-bold">Java</span> ·{' '}
                              <span className="text-[#6DB33F] font-bold">Spring Boot</span> · Microservices
                            </span>
                          ) : (
                            line.text
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Final blinking active prompt when sequence finishes */}
        {(isFinished || stepIndex >= PROFILE_COMMANDS.length) && (
          <div className="flex items-center gap-2 text-white pt-1">
            <span className="text-[#6DB33F] font-bold">$</span>
            <span className="inline-block w-2 h-4 bg-[#6DB33F] animate-pulse" />
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#161b22] border-t border-white/10 text-[10px] text-text-secondary font-mono uppercase tracking-wider select-none">
        <div className="flex items-center gap-3">
          <span className="text-[#6DB33F] font-semibold">LINUX</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6DB33F] animate-pulse" />
          <span className="text-[#6DB33F] font-semibold">ONLINE</span>
        </div>
      </div>
    </div>
  );
}

export { ProfileTerminal as IDEPlayground };
