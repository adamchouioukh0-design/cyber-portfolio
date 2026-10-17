import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Lock,
  ExternalLink
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../UI/Icons';
import { personalInfo } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formState, setFormState] = useState<'idle' | 'transmitting' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    soundFx.playKey();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormState('error');
      setErrorMessage('All transmission fields must be populated.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormState('error');
      setErrorMessage('Please provide a syntactically valid email address.');
      return;
    }

    setFormState('transmitting');
    setErrorMessage('');

    // Simulated transmission pipeline
    setTimeout(() => {
      setFormState('sent');
      // If user wants to send real mail, we can also trigger a mailto fallback:
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        formData.subject || 'Cybersecurity Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 1200);
  };

  const handleCopyPgp = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(personalInfo.pgpKeyId || 'NO_KEY_SPECIFIED');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-cyan-500/15 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-neon-green uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span>07 // TRANSMISSION UPLINK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
              Initiate Contact
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 md:mt-0 max-w-md">
            Open to security research discussions, collaborative lab challenges, internships, and full-time cybersecurity engineering roles.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Transmission Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="cyber-card p-6 sm:p-8 rounded-xl space-y-6 border-cyan-500/25">
              <div className="space-y-2">
                <h3 className="text-xl font-display font-bold text-white">
                  Establish Direct Link
                </h3>
                <p className="text-xs sm:text-sm font-sans text-slate-400 leading-relaxed">
                  Reach out directly for vulnerability disclosures, project inquiries, or professional security opportunities.
                </p>
              </div>

              {/* Direct Channels */}
              <div className="space-y-3">
                {/* Email Direct */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  onClick={() => soundFx.playClick()}
                  onMouseEnter={() => soundFx.playHover()}
                  className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-neon-cyan/50 hover:bg-slate-900 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded bg-neon-cyan/10 text-neon-cyan">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500">EMAIL</div>
                      <div className="text-xs font-mono font-bold text-white group-hover:text-neon-cyan transition-colors">
                        {personalInfo.email}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-neon-cyan" />
                </a>

                {/* LinkedIn Link */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  onMouseEnter={() => soundFx.playHover()}
                  className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-neon-cyan/50 hover:bg-slate-900 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded bg-blue-500/10 text-blue-400">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500">LINKEDIN</div>
                      <div className="text-xs font-mono font-bold text-white group-hover:text-neon-cyan transition-colors">
                        Adam Chouioukh | LinkedIn
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-neon-cyan" />
                </a>

                {/* GitHub Link */}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  onMouseEnter={() => soundFx.playHover()}
                  className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-neon-cyan/50 hover:bg-slate-900 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded bg-neon-green/10 text-neon-green">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500">GITHUB</div>
                      <div className="text-xs font-mono font-bold text-white group-hover:text-neon-cyan transition-colors">
                        adamchouioukh0-design
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-neon-cyan" />
                </a>
              </div>

              {/* PGP Encryption Fingerprint Box */}
              {personalInfo.pgpKeyId && (
                <div className="p-4 rounded-lg bg-black/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5 text-neon-cyan" />
                      <span>PGP PUBLIC FINGERPRINT:</span>
                    </span>
                    <button
                      onClick={handleCopyPgp}
                      className="text-neon-cyan hover:underline flex items-center space-x-1 text-[11px]"
                    >
                      {copiedKey ? (
                        <>
                          <Check className="w-3 h-3 text-neon-green" />
                          <span className="text-neon-green">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-2 rounded bg-slate-950 font-mono text-[11px] text-slate-300 tracking-wider">
                    {personalInfo.pgpKeyId}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Secure Transmission Form */}
          <div className="lg:col-span-7">
            <div className="cyber-card p-6 sm:p-8 rounded-xl border-cyan-500/25 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  <span className="text-xs font-mono text-slate-300 uppercase">
                    ENCRYPTED TRANSMISSION FORM
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  STANDARD DISPATCH
                </span>
              </div>

              {formState === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-lg bg-green-950/20 border border-neon-green/40 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-neon-green/10 text-neon-green mx-auto flex items-center justify-center border border-neon-green/40">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-bold text-white">
                      Transmission Dispatched
                    </h4>
                    <p className="text-xs font-mono text-slate-300 mt-2 max-w-md mx-auto">
                      Your default mail client has been launched with the encrypted parameters. I will review and respond promptly.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setFormState('idle');
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2 rounded text-xs font-mono text-neon-cyan border border-cyan-500/30 hover:bg-cyan-950/30 transition-all"
                  >
                    Send Another Transmission
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                  {formState === 'error' && (
                    <div className="p-3 rounded bg-rose-950/40 border border-rose-500/50 text-rose-300 flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 uppercase text-[11px]">
                        YOUR IDENTIFIER / NAME *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Alex Rivera"
                        required
                        className="w-full p-3 rounded-lg bg-slate-900/80 border border-slate-800 focus:border-neon-cyan focus:outline-none text-slate-200"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-400 uppercase text-[11px]">
                        RETURN COMM / EMAIL *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. alex@example.com"
                        required
                        className="w-full p-3 rounded-lg bg-slate-900/80 border border-slate-800 focus:border-neon-cyan focus:outline-none text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 uppercase text-[11px]">
                      TRANSMISSION SUBJECT
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Security Project Collaboration"
                      className="w-full p-3 rounded-lg bg-slate-900/80 border border-slate-800 focus:border-neon-cyan focus:outline-none text-slate-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 uppercase text-[11px]">
                      ENCRYPTED PAYLOAD / MESSAGE *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your transmission or project inquiry here..."
                      required
                      className="w-full p-3 rounded-lg bg-slate-900/80 border border-slate-800 focus:border-neon-cyan focus:outline-none text-slate-200 resize-none font-sans text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'transmitting'}
                    onMouseEnter={() => soundFx.playHover()}
                    className="w-full py-3.5 rounded-lg font-mono text-xs uppercase tracking-wider font-bold text-black bg-neon-cyan hover:bg-neon-green transition-all shadow-neon-cyan hover:shadow-neon-green flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {formState === 'transmitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>DISPATCHING PAYLOAD...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>DISPATCH TRANSMISSION</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-500 text-center font-mono pt-1">
                    Direct validation enabled. Launches your default email client with your compiled message.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
