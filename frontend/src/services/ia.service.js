import api from "./api";

export const generarDocumento = async (tipo, contexto) => {
  const response = await api.post("/ia/generar-documento", { tipo, contexto }, {
    responseType: 'blob'
  });
  
  // Crear URL para descargar el PDF
  const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
  const link = document.createElement('a');
  link.href = url;
  
  // Obtener el nombre del archivo de los headers
  const contentDisposition = response.headers['content-disposition'];
  let filename = 'documento.pdf';
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename="(.+)"/);
    if (filenameMatch) {
      filename = filenameMatch[1];
    }
  }
  
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
  
  return { success: true, filename };
};

export const consultaNormativa = (historial) => api.post("/ia/consulta-normativa", { historial });
export const investigarIncidente = (incidenteId) => api.post(`/ia/investigar-incidente/${incidenteId}`);

export const generarInformeEjecutivo = async (contexto) => {
  const response = await api.post("/ia/generar-informe-ejecutivo", { contexto }, {
    responseType: 'blob'
  });
  
  // Crear URL para descargar el PDF
  const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
  const link = document.createElement('a');
  link.href = url;
  
  // Obtener el nombre del archivo de los headers
  const contentDisposition = response.headers['content-disposition'];
  let filename = 'informe_ejecutivo.pdf';
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename="(.+)"/);
    if (filenameMatch) {
      filename = filenameMatch[1];
    }
  }
  
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
  
  return { success: true, filename };
};
