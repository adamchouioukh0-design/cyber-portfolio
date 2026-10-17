import React, { useState, useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { personalInfo, skillsData, projectsData, certificatesData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

interface CommandOutput {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string | React.ReactNode;
}

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'AEGIS SEC-SHELL v2.4.0 (x86_64-secops-linux)',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Encrypted tunnel established with 127.0.0.1. Zero-Trust perimeter verified.',
    },
    {
      id: 'init-3',
      type: 'output',
      text: 'Type "help" to view supported portfolio commands or click the shortcut buttons below.',
    },
  ]);

  const outputContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [outputs]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    soundFx.playClick();

    // Add to input history
    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const userEntry: CommandOutput = {
      id: `in-${Date.now()}`,
      type: 'input',
      text: `sec-operator@portfolio:~$ ${rawCmd}`,
    };

    if (cmd === 'clear') {
      setOutputs([]);
      setInputVal('');
      return;
    }

    let response: CommandOutput;

    switch (cmd) {
      case 'help':
        response = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1.5 text-slate-300">
              <div className="text-neon-cyan font-bold">AVAILABLE PORTFOLIO COMMANDS:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div><span className="text-neon-green font-bold">about</span> - Summary biography and mission dossier</div>
                <div><span className="text-neon-green font-bold">skills</span> - List categorized cybersecurity capabilities</div>
                <div><span className="text-neon-green font-bold">projects</span> - View active security lab operations</div>
                <div><span className="text-neon-green font-bold">certifications</span> - Inspect credential vault records</div>
                <div><span className="text-neon-green font-bold">contact</span> - Display email and social transmission channels</div>
                <div><span className="text-neon-green font-bold">scan</span> - Run simulated local network port sweep</div>
                <div><span className="text-neon-green font-bold">whoami</span> - Display current authenticated security persona</div>
                <div><span className="text-neon-green font-bold">status</span> - System DEFCON status and telemetry</div>
                <div><span className="text-neon-green font-bold">clear</span> - Clear terminal session output</div>
              </div>
            </div>
          ),
        };
        break;

      case 'about':
        response = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-2 text-slate-300">
              <div className="text-neon-cyan font-bold">[OPERATOR DOSSIER]</div>
              <div>{personalInfo.bio.whoIAm}</div>
              <div className="text-xs text-slate-400">
                <span className="text-neon-green">Interests:</span> {personalInfo.bio.cyberInterests.join(', ')}
              </div>
            </div>
          ),
        };
        break;

      case 'skills':
        response = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-2 text-slate-300">
              <div className="text-neon-cyan font-bold">[ASSESSED CAPABILITY MATRIX]</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {skillsData.slice(0, 10).map((s) => (
                  <div key={s.name} className="flex justify-between border-b border-slate-900 pb-1">
                    <span className="text-white">{s.name}</span>
                    <span className="text-neon-cyan/70 font-mono text-[10px] uppercase">[{s.category}]</span>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-slate-400">
                Type or click "skills" section in navigation to inspect all {skillsData.length} skills with command examples.
              </div>
            </div>
          ),
        };
        break;

      case 'projects':
        response = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-2 text-slate-300">
              <div className="text-neon-cyan font-bold">[DOCUMENTED LAB OPERATIONS]</div>
              <div className="space-y-1.5 text-xs">
                {projectsData.map((p, i) => (
                  <div key={p.id} className="p-2 rounded bg-slate-900/50 border border-slate-800">
                    <span className="text-neon-green font-bold">0{i + 1}. {p.title}</span> ({p.category})
                    <div className="text-[11px] text-slate-400">{p.shortDescription}</div>
                  </div>
                ))}
              </div>
            </div>
          ),
        };
        break;

      case 'certifications':
      case 'certs':
        response = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-2 text-slate-300">
              <div className="text-neon-cyan font-bold">[CREDENTIAL VAULT RECORDS]</div>
              <div className="space-y-1 text-xs">
                {certificatesData.map((c) => (
                  <div key={c.id} className="flex justify-between items-center py-1 border-b border-slate-900">
                    <span className="text-white">{c.title} ({c.issuer})</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${c.status === 'VERIFIED' ? 'text-neon-green' : 'text-amber-400'}`}>
                      [{c.status}]
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ),
        };
        break;

      case 'contact':
        response = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1 text-xs text-slate-300">
              <div className="text-neon-cyan font-bold">[SECURE TRANSMISSION CHANNELS]</div>
              <div>Email: <a href={`mailto:${personalInfo.email}`} className="text-neon-green underline">{personalInfo.email}</a></div>
              <div>GitHub: <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-neon-cyan underline">adamchouioukh0-design</a></div>
              <div>LinkedIn: <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-neon-cyan underline">Adam Chouioukh | LinkedIn</a></div>
              <div>PGP Fingerprint: <span className="font-mono text-slate-400">{personalInfo.pgpKeyId}</span></div>
            </div>
          ),
        };
        break;

      case 'whoami':
        response = {
          id: `out-${Date.now()}`,
          type: 'success',
          text: `Current Session: ${personalInfo.name} (${personalInfo.codename}) // Role: ${personalInfo.subtitle}`,
        };
        break;

      case 'status':
        response = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="text-xs space-y-1 text-slate-300">
              <div>DEFCON LEVEL: <span className="text-neon-green font-bold">{personalInfo.defconLevel} (SYSTEM SECURE)</span></div>
              <div>HOST NODE: 127.0.0.1 (Loopback Protected)</div>
              <div>ENCRYPTION: AES-256-GCM / TLS 1.3 Active</div>
              <div>STATUS: {personalInfo.status}</div>
            </div>
          ),
        };
        break;

      case 'scan':
        soundFx.playScan();
        response = {
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="text-xs font-mono space-y-1 text-slate-300">
              <div className="text-neon-cyan">Starting Nmap 7.94 scan on localhost (127.0.0.1)...</div>
              <div className="text-slate-400">Host is up (0.00012s latency).</div>
              <div className="text-neon-green">PORT 22/tcp   OPEN  OpenSSH 9.2p1 Debian</div>
              <div className="text-neon-green">PORT 80/tcp   OPEN  http-nginx (Reverse Proxy)</div>
              <div className="text-neon-green">PORT 443/tcp  OPEN  ssl/https TLSv1.3</div>
              <div className="text-neon-cyan">PORT 8080/tcp OPEN  http-api-internal</div>
              <div className="text-slate-400">Scan done: 1 IP address (1 host up) scanned in 0.42 seconds.</div>
            </div>
          ),
        };
        break;

      default:
        response = {
          id: `err-${Date.now()}`,
          type: 'error',
          text: (
            <div>
              <span className="text-rose-400">Command not recognized: "{rawCmd}".</span> Type <span className="text-neon-cyan underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> to view supported commands.
            </div>
          ),
        };
        break;
    }

    setOutputs((prev) => [...prev, userEntry, response]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundFx.playKey();
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInputVal(history[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <section id="terminal" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-cyan-500/15 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-neon-green uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span>05 // INTERACTIVE TERMINAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
              Aegis Interactive Shell
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 md:mt-0 max-w-md">
            Simulated portfolio command console. Query bio, capabilities, project details, and network scans in real-time.
          </p>
        </div>

        {/* Terminal Window Frame */}
        <div className="cyber-card rounded-xl border border-cyan-500/30 overflow-hidden shadow-2xl bg-[#050912]/95">
          {/* Top Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-cyan-500/20 select-none">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                sec-operator@aegis-node:~ (bash)
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono text-neon-green bg-green-950/60 border border-neon-green/30 px-2 py-0.5 rounded">
                SEC_MODE: SANDBOX
              </span>
              <button
                onClick={() => executeCommand('clear')}
                title="Clear screen"
                className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick-Click Command Shortcuts */}
          <div className="flex flex-wrap items-center gap-1.5 px-4 py-2 bg-black/40 border-b border-slate-900 text-xs font-mono text-slate-400">
            <span className="text-[11px] text-slate-500 mr-1">QUICK:</span>
            {['help', 'about', 'skills', 'projects', 'certs', 'scan', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                onMouseEnter={() => soundFx.playHover()}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-neon-cyan hover:text-white border border-slate-800 transition-colors text-[11px]"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Output Stream */}
          <div
            ref={outputContainerRef}
            onClick={() => inputRef.current?.focus()}
            className="p-5 h-80 sm:h-96 overflow-y-auto font-mono text-xs sm:text-sm space-y-3 cursor-text selection:bg-neon-cyan/30"
          >
            {outputs.map((out) => {
              if (out.type === 'input') {
                return (
                  <div key={out.id} className="text-neon-cyan font-semibold">
                    {out.text}
                  </div>
                );
              }
              if (out.type === 'system') {
                return (
                  <div key={out.id} className="text-slate-500 italic text-xs">
                    [SYS] {out.text}
                  </div>
                );
              }
              if (out.type === 'error') {
                return (
                  <div key={out.id} className="text-rose-400">
                    {out.text}
                  </div>
                );
              }
              if (out.type === 'success') {
                return (
                  <div key={out.id} className="text-neon-green">
                    {out.text}
                  </div>
                );
              }
              return (
                <div key={out.id} className="text-slate-300">
                  {out.text}
                </div>
              );
            })}

            {/* Input Prompt Line */}
            <div className="flex items-center space-x-2 pt-1">
              <span className="text-neon-green font-bold select-none whitespace-nowrap">
                sec-operator@portfolio:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-neon-green focus:outline-none font-mono text-xs sm:text-sm caret-neon-green"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Bottom Terminal Telemetry Footer */}
          <div className="flex items-center justify-between px-4 py-2 bg-black/60 border-t border-slate-900 text-[10px] font-mono text-slate-500">
            <span>UP/DOWN ARROWS FOR COMMAND HISTORY</span>
            <span>PRESS ENTER TO EXECUTE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
