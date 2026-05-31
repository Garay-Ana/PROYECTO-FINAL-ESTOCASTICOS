import React, { useEffect } from 'react';
import { X, CheckCircle2, Shield, Users, TrendingUp } from 'lucide-react';

const LEVEL_DATA = {
  basico: {
    title: 'Nivel Básico',
    steps: 18,
    color: '#3b82f6',
    gradient: 'from-blue-400 to-blue-600',
    icon: Shield,
    description: 'Obligatorio para flotas entre 10 y 50 vehículos. Enfocado en gestión fundamental.',
    items: [
      'Líder del diseño e implementación del PESV',
      'Política de Seguridad Vial',
      'Liderazgo y compromiso directivo',
      'Diagnóstico',
      'Caracterización, evaluación y control de riesgos',
      'Objetivos y metas',
      'Programas de gestión de riesgos críticos',
      'Plan anual de trabajo',
      'Competencia y plan anual de formación',
      'Plan de preparación y respuesta ante emergencias',
      'Vías seguras administradas',
      'Planificación de desplazamientos laborales',
      'Inspección de vehículos y equipos',
      'Mantenimiento y control de vehículos',
      'Indicadores y reporte de autogestión',
      'Auditoría anual',
      'Mejora continua',
      'Mecanismos de comunicación y participación'
    ]
  },
  estandar: {
    title: 'Nivel Estándar',
    steps: 22,
    color: '#06b6d4',
    gradient: 'from-cyan-400 to-blue-500',
    icon: Users,
    description: 'Para organizaciones de mayor complejidad o riesgo medio-alto.',
    items: [
      'Líder del diseño e implementación del PESV',
      'Política de Seguridad Vial',
      'Liderazgo y compromiso directivo',
      'Diagnóstico',
      'Caracterización, evaluación y control de riesgos',
      'Objetivos y metas',
      'Programas de gestión de riesgos críticos',
      'Plan anual de trabajo',
      'Competencia y plan anual de formación',
      'Plan de preparación y respuesta ante emergencias',
      'Vías seguras administradas',
      'Planificación de desplazamientos laborales',
      'Inspección de vehículos y equipos',
      'Mantenimiento y control de vehículos',
      'Indicadores y reporte de autogestión',
      'Auditoría anual',
      'Mejora continua',
      'Mecanismos de comunicación y participación',
      'Comité de seguridad vial',
      'Investigación interna de siniestros viales',
      'Gestión del cambio y gestión de contratistas',
      'Archivo y retención documental'
    ],
    newStepsStart: 18
  },
  avanzado: {
    title: 'Nivel Avanzado',
    steps: 24,
    color: '#8b5cf6',
    gradient: 'from-indigo-400 to-indigo-600',
    icon: TrendingUp,
    description: 'Para organizaciones de alto riesgo o gran tamaño.',
    items: [
      'Líder del diseño e implementación del PESV',
      'Política de Seguridad Vial',
      'Liderazgo y compromiso directivo',
      'Diagnóstico',
      'Caracterización, evaluación y control de riesgos',
      'Objetivos y metas',
      'Programas de gestión de riesgos críticos',
      'Plan anual de trabajo',
      'Competencia y plan anual de formación',
      'Plan de preparación y respuesta ante emergencias',
      'Vías seguras administradas',
      'Planificación de desplazamientos laborales',
      'Inspección de vehículos y equipos',
      'Mantenimiento y control de vehículos',
      'Indicadores y reporte de autogestión',
      'Auditoría anual',
      'Mejora continua',
      'Mecanismos de comunicación y participación',
      'Comité de seguridad vial',
      'Investigación interna de siniestros viales',
      'Gestión del cambio y gestión de contratistas',
      'Archivo y retención documental',
      'Responsabilidad y comportamiento seguro',
      'Registro y análisis estadístico de siniestros viales'
    ],
    newStepsStart: 22
  }
};

export default function PESVLevelModal({ isOpen, onClose, level }) {
  const data = LEVEL_DATA[level];
  const IconComponent = data?.icon;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !data) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl flex flex-col max-h-[90vh] w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-slate-50 to-white rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${data.gradient} flex items-center justify-center shadow-lg`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: data.color }}
                >
                  {data.steps} Pasos
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* Descripción */}
            <p className="text-gray-700 leading-relaxed text-base">
              {data.description}
            </p>

            {/* Pasos */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Pasos a implementar:</h3>
              <div className="space-y-3">
                {data.items.map((item, index) => {
                  const isNew = data.newStepsStart && index >= data.newStepsStart;
                  return (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle2 
                          className="w-5 h-5 mt-0.5" 
                          style={{ color: data.color }} 
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          <span className="font-semibold text-gray-900">{index + 1}.</span> {item}
                        </p>
                        {isNew && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Nuevo
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Información importante */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span className="text-lg">💡</span>
                <span>Información importante</span>
              </h4>
              <ul className="space-y-2 text-blue-800 text-sm">
                {level === 'basico' && (
                  <>
                    <li>✓ Obligatorio para organizaciones con flotas entre 10 y 50 vehículos</li>
                    <li>✓ Se enfoca en la gestión fundamental de seguridad vial</li>
                    <li>✓ Incluye políticas, capacitación, inspección de vehículos y auditoría anual</li>
                  </>
                )}
                {level === 'estandar' && (
                  <>
                    <li>✓ Para organizaciones de mayor complejidad o riesgo medio-alto</li>
                    <li>✓ Incluye los 18 pasos del Nivel Básico más 4 adicionales</li>
                    <li>✓ Agrega estructura organizacional y gestión de terceros</li>
                    <li>✓ Total: 22 pasos</li>
                  </>
                )}
                {level === 'avanzado' && (
                  <>
                    <li>✓ Para organizaciones de alto riesgo o gran tamaño</li>
                    <li>✓ Incluye los 22 pasos del Nivel Estándar más 2 adicionales</li>
                    <li>✓ Enfocado en cultura profunda y análisis estadístico</li>
                    <li>✓ Total: 24 pasos</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 flex-shrink-0 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
