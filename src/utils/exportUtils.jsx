// src/utils/exportUtils.js

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Export to Excel
export const exportToExcel = (data = [], fileName = 'tenants') => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, `${fileName}.xlsx`);
};

// Export to PDF
export const exportToPDF = (columns = [], data = [], title = 'Tenant Report') => {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text(title, 14, 20);

  autoTable(doc, {
    head: [columns],
    body: data.map((row) => columns.map((key) => row[key] || '-')),
    startY: 30,
  });

  doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
};
