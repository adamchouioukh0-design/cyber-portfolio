import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ExternalLink, 
  Eye, 
  Clock, 
  CheckCircle2, 
  PlusCircle, 
  Copy, 
  Check, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { certificatesData } from '../../data/portfolioData';
import type { Certificate } from '../../types/portfolio';
import { Modal } from '../UI/Modal';
import { soundFx } from '../../utils/audio';

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'VERIFIED' | 'IN_PROGRESS'>('ALL');

  const filteredCerts = certificatesData.filter((c) => {
    if (statusFilter === 'ALL') return true;
    return c.status === statusFilter;
  });

  const handleCopyId = (id: string) => {
    soundFx.playClick();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="certifications" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-cyan-500/15 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-neon-cyan uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <span>03 // CREDENTIAL VAULT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
              Certifications &amp; Credentials
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 md:mt-0 max-w-md">
            Cryptographically verifiable credentials, industry accreditations, and active cybersecurity learning paths.
          </p>
        </div>

        {/* Filter Pills and Info Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-2 p-1 rounded-lg bg-slate-900/80 border border-cyan-500/20">
            <button
              onClick={() => {
                soundFx.playClick();
                setStatusFilter('ALL');
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                statusFilter === 'ALL'
                  ? 'bg-neon-cyan text-black font-bold shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Records ({certificatesData.length})
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setStatusFilter('VERIFIED');
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                statusFilter === 'VERIFIED'
                  ? 'bg-neon-cyan text-black font-bold shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Verified
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setStatusFilter('IN_PROGRESS');
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                statusFilter === 'IN_PROGRESS'
                  ? 'bg-neon-cyan text-black font-bold shadow-neon-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              In Progress
            </button>
          </div>

          <div className="text-xs font-mono text-slate-500 flex items-center space-x-1.5">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Clearly labeled sample placeholders ready to be customized</span>
          </div>
        </div>

        {/* Certificate Vault Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => {
                soundFx.playClick();
                setSelectedCert(cert);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="cyber-card rounded-xl overflow-hidden border border-cyan-500/20 hover:border-neon-cyan/50 cursor-pointer flex flex-col justify-between group transition-all"
            >
              {/* Certificate Preview Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950 p-2">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover rounded-lg filter brightness-90 group-hover:brightness-100 group-hover:scale-102 transition-all duration-500"
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  {cert.status === 'VERIFIED' ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-green-950/80 text-neon-green border border-neon-green/40 shadow-neon-green backdrop-blur-md">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>VERIFIED</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-amber-950/80 text-amber-400 border border-amber-500/40 backdrop-blur-md">
                      <Clock className="w-3 h-3" />
                      <span>IN PROGRESS</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-400 bg-black/70 px-2 py-0.5 rounded border border-slate-800">
                  ISSUER: {cert.issuer}
                </div>
              </div>

              {/* Certificate Details Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-neon-cyan transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-2 line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="space-y-3 pt-2 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-neon-cyan pt-1">
                    <span className="flex items-center space-x-1 group-hover:underline">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Credential</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {cert.issueDate}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Clean "Add New Certificate" Placeholder Slot */}
          <div className="cyber-card rounded-xl border border-dashed border-slate-800 p-6 flex flex-col items-center justify-center text-center space-y-3 hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 border border-slate-800">
              <PlusCircle className="w-6 h-6 text-neon-cyan/70" />
            </div>
            <div>
              <div className="text-sm font-display font-bold text-slate-300">
                Future Credential Slot
              </div>
              <p className="text-xs text-slate-500 font-mono mt-1 max-w-xs">
                Ready for Security+, CySA+, OSCP, or CCNA. Add to <code className="text-neon-cyan">certificatesData</code> in <code className="text-slate-400">portfolioData.ts</code>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Certificate Inspector Modal */}
      <Modal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        title={selectedCert?.title || ''}
        subtitle={`ISSUER: ${selectedCert?.issuer} // DATE: ${selectedCert?.issueDate}`}
        badge="CREDENTIAL_RECORD"
      >
        {selectedCert && (
          <div className="space-y-6">
            {/* High-Resolution Certificate Document Preview */}
            <div className="relative rounded-lg overflow-hidden border border-cyan-500/30 bg-black">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full h-auto object-contain max-h-[380px]"
              />
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-mono text-neon-green uppercase mb-1">
                CREDENTIAL ASSESSMENT SUMMARY:
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {selectedCert.description}
              </p>
            </div>

            {/* Credential ID and Verification Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedCert.credentialId && (
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">
                    CREDENTIAL ID
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white">
                      {selectedCert.credentialId}
                    </span>
                    <button
                      onClick={() => handleCopyId(selectedCert.credentialId!)}
                      className="text-slate-400 hover:text-neon-cyan p-1"
                      title="Copy Credential ID"
                    >
                      {copiedId === selectedCert.credentialId ? (
                        <Check className="w-3.5 h-3.5 text-neon-green" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-slate-500 uppercase">
                  STATUS
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedCert.status === 'VERIFIED' ? 'bg-neon-green' : 'bg-amber-400'
                    }`}
                  />
                  <span className="font-mono text-xs font-bold text-slate-200">
                    {selectedCert.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Validated Skills */}
            <div>
              <div className="text-xs font-mono text-slate-400 mb-2">
                ASSESSED COMPETENCIES:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-cyan-950/40 text-neon-cyan border border-cyan-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
              {selectedCert.pdfUrl && (
                <a
                  href={selectedCert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="px-5 py-2.5 rounded font-mono text-xs font-bold text-black bg-neon-green hover:bg-neon-cyan transition-all shadow-neon-green flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Open Official Certificate (PDF)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {selectedCert.verificationUrl && (
                <a
                  href={selectedCert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="px-5 py-2.5 rounded font-mono text-xs font-bold text-black bg-neon-cyan hover:bg-neon-green transition-all shadow-neon-cyan flex items-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Credential on Issuer Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <a
                href={selectedCert.image}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-4 py-2.5 rounded font-mono text-xs text-slate-300 border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800 transition-colors flex items-center space-x-1.5"
              >
                <Eye className="w-4 h-4" />
                <span>View Full Size Image</span>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
