'use client';

import { useState } from 'react';
import Footer from '@/components/layout/Footer';

export default function SoportePage() {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('problema_tecnico');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('a.ceballos@pucp.edu.pe');
  const [files, setFiles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (files.length + selected.length > 5) {
      alert('Solo puedes adjuntar hasta 5 imágenes.');
      return;
    }
    setFiles((prev) => [...prev, ...selected].slice(0, 5));
  };

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      alert('Por favor completa el asunto y la descripción.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const resetForm = () => {
    setSubject('');
    setDescription('');
    setFiles([]);
    setIsSubmitted(false);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden pt-8 pb-10 px-6 lg:px-10 border-b border-white/10 bg-gradient-to-b from-[#071428] via-[#051329] to-[#030d1c]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            CENTRO DE ASISTENCIA
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
            <span>🐧</span>
            <span>Waddle Support</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#94a3b8] max-w-xl mx-auto leading-relaxed">
            ¿Tienes dudas, problemas técnicos o deseas afiliar tu agrupación estudiantil a la plataforma? Envíanos tu consulta.
          </p>
        </div>
      </section>

      {/* Main Support Form & Help Cards */}
      <div className="max-w-4xl mx-auto w-full px-6 py-10 flex-1 space-y-10">
        {/* Contact Form (RF18) */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border-white/10">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white">¡Ticket enviado exitosamente!</h3>
              <p className="text-sm text-[#94a3b8] max-w-md mx-auto">
                Hemos recibido tu solicitud bajo el código <strong className="text-cyan-400">#TK-2026-904</strong>. El equipo de soporte de Informática PUCP te responderá a tu correo institucional a la brevedad.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#1d6ef5] hover:bg-[#2563eb] text-white text-xs font-semibold shadow-md transition-all"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Crear nuevo ticket de soporte</h2>
                <p className="text-xs text-[#94a3b8]">
                  Completa el formulario a continuación detallando el incidente o requerimiento.
                </p>
              </div>

              {/* Email & Category row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Correo PUCP institucional *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#0a1f3d] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Categoría del requerimiento *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0a1f3d] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="problema_tecnico">Problema técnico en la plataforma</option>
                    <option value="registro_agrupacion">Registrar o afiliar nueva agrupación</option>
                    <option value="evento_incorrecto">Reportar error en evento o fecha</option>
                    <option value="sugerencia">Sugerencia de nueva funcionalidad</option>
                    <option value="otro">Otro motivo</option>
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Asunto *
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ej: Error al intentar guardar un evento en la biblioteca"
                  required
                  className="w-full bg-[#0a1f3d] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Descripción detallada *
                </label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Por favor describe los pasos para reproducir el problema o los detalles de tu consulta..."
                  required
                  className="w-full bg-[#0a1f3d] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 leading-relaxed resize-y"
                />
              </div>

              {/* Photos upload (Up to 5 photos - RF18) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Capturas o fotografías adjuntas (opcional)
                  </label>
                  <span className="text-[11px] text-cyan-400 font-medium">
                    {files.length} / 5 imágenes
                  </span>
                </div>

                {/* Upload box */}
                <div className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center hover:border-cyan-400/50 transition-colors bg-white/[0.02]">
                  <input
                    type="file"
                    id="photo-upload"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={files.length >= 5}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer flex flex-col items-center justify-center gap-1.5"
                  >
                    <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className="text-xs text-white font-medium">
                      Haz clic para subir capturas (PNG, JPG o WebP)
                    </span>
                    <span className="text-[10px] text-[#94a3b8]">
                      Hasta 5 archivos, máximo 5MB cada uno
                    </span>
                  </label>
                </div>

                {/* Previews list */}
                {files.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                      >
                        <span className="truncate max-w-[150px]">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-red-400 hover:text-red-300 font-bold"
                          title="Eliminar archivo"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-xl bg-[#1d6ef5] hover:bg-[#2563eb] disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Enviando ticket...</span>
                ) : (
                  <>
                    <span>Enviar ticket de soporte</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Preguntas frecuentes (FAQ)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-xl">
              <h4 className="text-xs font-bold text-cyan-300 mb-1">
                ¿Cómo registro una nueva agrupación estudiantil?
              </h4>
              <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                Envía un ticket seleccionando la categoría &quot;Registrar o afiliar nueva agrupación&quot; adjuntando el acta de conformación o aval docente.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl">
              <h4 className="text-xs font-bold text-cyan-300 mb-1">
                ¿Puedo exportar eventos a mi calendario personal?
              </h4>
              <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                Sí, en la sección &quot;Tus eventos guardados&quot; puedes sincronizar eventos individuales o todos juntos con Google Calendar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
