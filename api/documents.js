// API endpoint for document handling
// Serves available documents securely

const fs = require('fs');
const path = require('path');

// List of available documents (relative to the Documentos folder)
const DOCUMENTS = [
  '24_precontrato_venta_parcelas.pdf',
  '21_informe_inspeccion_sanitaria.pdf',
  '20_informe_agronomico_2004.pdf',
  '19_transacciones_sofia.pdf',
  '18_extracto_bancario_bruno.pdf',
  '17_contrato_distribucion_lerma.pdf',
  '16_poder_notarial.pdf',
  '14_registro_bodega_2004.pdf',
  '09_testamento_borrador_v3.pdf'
];

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { action, name } = req.query;

    if (action === 'list') {
      // List all available documents
      res.status(200).json({
        documents: DOCUMENTS.map(doc => ({
          name: doc,
          url: `/api/documents?action=get&name=${encodeURIComponent(doc)}`
        }))
      });
      return;
    }

    if (action === 'get' && name) {
      // Validate document name against whitelist
      if (!DOCUMENTS.includes(name)) {
        res.status(404).json({ error: 'Document not found' });
        return;
      }

      // For serverless deployment, documents would be served from a public folder
      // For now, return the document metadata
      res.status(200).json({
        name: name,
        url: `/Documentos/${encodeURIComponent(name)}`
      });
      return;
    }

    res.status(400).json({ error: 'Invalid request' });
  } catch (error) {
    console.error('Documents API error:', error);
    res.status(500).json({ error: error.message });
  }
};
