const prisma = require("../../config/db");
const iaService = require("./ia.service");

const NOMBRES_DOCUMENTOS = {
  POLITICA_SEGURIDAD_VIAL: "Politica_Seguridad_Vial",
  PROCEDIMIENTO_RIESGOS: "Procedimiento_Gestion_Riesgos",
  ACTA_COMITE: "Acta_Comite_Seguridad_Vial",
  PROGRAMA_RIESGOS_CRITICOS: "Programa_Riesgos_Criticos",
  INDICADORES_PASO20: "Indicadores_PESV_Paso20",
  INFORME_EJECUTIVO: "Informe_Ejecutivo_Mensual",
  POLITICA_SGSST: "Politica_Integrada_SGSST_PESV",
};

const CATEGORIAS_DOCUMENTOS = {
  POLITICA_SEGURIDAD_VIAL: "Políticas",
  PROCEDIMIENTO_RIESGOS: "Procedimientos",
  ACTA_COMITE: "Actas",
  PROGRAMA_RIESGOS_CRITICOS: "Programas",
  INDICADORES_PASO20: "Indicadores",
  INFORME_EJECUTIVO: "Indicadores",
  POLITICA_SGSST: "Políticas",
};

const PASOS_RESOLUCION = {
  POLITICA_SEGURIDAD_VIAL: 3,
  PROCEDIMIENTO_RIESGOS: 5,
  ACTA_COMITE: 2,
  PROGRAMA_RIESGOS_CRITICOS: 8,
  INDICADORES_PASO20: 20,
  INFORME_EJECUTIVO: 20,
  POLITICA_SGSST: 3,
};

const generarDocumento = async (req, res, next) => {
  try {
    const { tipo, contexto } = req.body;
    console.log("Generando documento:", tipo);
    if (!tipo) return res.status(400).json({ error: "El tipo de documento es requerido" });
    
    console.log("Generando contenido con IA...");
    const contenidoTexto = await iaService.generarDocumento(tipo, contexto || "");
    console.log("Contenido generado, creando PDF...");
    
    const nombreArchivo = NOMBRES_DOCUMENTOS[tipo] || "Documento_PESV";
    const pdfBuffer = await iaService.generarPDF(contenidoTexto, nombreArchivo);
    
    const nombreArchivoConFecha = `${nombreArchivo}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Guardar documento en base de datos
    console.log("Guardando documento en base de datos...");
    const categoria = CATEGORIAS_DOCUMENTOS[tipo] || "GENERAL";
    const pasoResolucion = PASOS_RESOLUCION[tipo];
    
    await prisma.documento.create({
      data: {
        titulo: nombreArchivo,
        categoria: categoria,
        contenido: contenidoTexto,
        estado: "BORRADOR",
        generadoIA: true,
        pasoResolucion: pasoResolucion,
        creadoPor: req.user.id,
      },
    });
    console.log("Documento guardado en base de datos");
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${nombreArchivoConFecha}"`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error("Error en generarDocumento:", err);
    next(err);
  }
};

const consultaNormativa = async (req, res, next) => {
  try {
    const { historial } = req.body;
    if (!historial || !Array.isArray(historial)) {
      return res.status(400).json({ error: "Historial de conversación requerido" });
    }
    const respuesta = await iaService.consultaNormativa(historial);
    res.json({ respuesta });
  } catch (err) {
    next(err);
  }
};

const investigarIncidente = async (req, res, next) => {
  try {
    const incidente = await prisma.incidente.findUnique({
      where: { id: req.params.incidenteId },
      include: {
        conductor: { include: { usuario: { select: { nombre: true } } } },
        vehiculo: { select: { placa: true, marca: true, modelo: true } },
      },
    });
    if (!incidente) return res.status(404).json({ error: "Incidente no encontrado" });

    const investigacion = await iaService.investigarIncidente(incidente);

    await prisma.incidente.update({
      where: { id: incidente.id },
      data: { investigacion, estado: "EN_INVESTIGACION" },
    });

    res.json({ investigacion });
  } catch (err) {
    next(err);
  }
};

const generarInformeEjecutivo = async (req, res, next) => {
  try {
    const { contexto } = req.body;
    const [kpisData, incidentesMes] = await Promise.all([
      prisma.incidente.count({ where: { fecha: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } }),
      prisma.documento.count({ where: { estado: "APROBADO" } }),
    ]);
    const ctx = `Datos actuales del sistema: ${incidentesMes} incidentes este mes, ${kpisData} documentos aprobados. ${contexto || ""}`;
    const contenidoTexto = await iaService.generarInformeEjecutivo(ctx);
    const nombreArchivo = "Informe_Ejecutivo_Mensual";
    const pdfBuffer = await iaService.generarPDF(contenidoTexto, nombreArchivo);
    
    const nombreArchivoConFecha = `${nombreArchivo}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${nombreArchivoConFecha}"`);
    res.send(pdfBuffer);
  } catch (err) {
    next(err);
  }
};

module.exports = { generarDocumento, consultaNormativa, investigarIncidente, generarInformeEjecutivo };
