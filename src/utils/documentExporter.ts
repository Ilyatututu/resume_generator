import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

interface ResumeData {
  firstName: string;
  lastName: string;
  middleName: string;
  city: string;
  photo: string;
  contacts: string;
  education: string;
  experience: string;
  template: string;
  format: string;
}

export const generateDocument = async (data: ResumeData) => {
  if (data.format === 'pdf') {
    const html = generateHTML(data);
    const container = document.createElement('div');
    container.innerHTML = html;
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    document.body.appendChild(container);

    const canvas = await html2canvas(container);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save(`${data.lastName}_resume.pdf`);
    document.body.removeChild(container);
  }

  if (data.format === 'docx') {
    const doc = new Document({
      sections: [{
        properties: {},
        children: generateDocxContent(data),
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${data.lastName}_resume.docx`);
  }
};

const generateDocxContent = (data: ResumeData) => {
  const fullName = `${data.lastName} ${data.firstName} ${data.middleName}`;

  if (data.template === 'templateOne') {
    return [
      new Paragraph({
        children: [new TextRun({ text: fullName, bold: true, size: 32 })],
        spacing: { after: 200 }
      }),
      new Paragraph({ text: `Город: ${data.city}`, spacing: { after: 200 } }),
      new Paragraph({
        children: [new TextRun({ text: 'Контакты:', bold: true })],
      }),
      new Paragraph({ text: data.contacts }),
      new Paragraph({
        children: [new TextRun({ text: 'Образование:', bold: true })],
        spacing: { before: 200 }
      }),
      new Paragraph({ text: data.education }),
      new Paragraph({
        children: [new TextRun({ text: 'Опыт работы:', bold: true })],
        spacing: { before: 200 }
      }),
      new Paragraph({ text: data.experience }),
    ];
  }

  if (data.template === 'templateTwo') {
    return [
      new Paragraph({
        children: [new TextRun({ text: fullName, bold: true, size: 36, color: '000080' })],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [new TextRun({ text: data.city, italics: true, size: 24 })],
        spacing: { after: 300 }
      }),
      new Paragraph({
        children: [new TextRun({ text: 'Контактная информация', bold: true, size: 26 })],
      }),
      new Paragraph({ text: data.contacts, spacing: { after: 200 } }),
      new Paragraph({
        children: [new TextRun({ text: 'Образование', bold: true, size: 26 })],
      }),
      new Paragraph({ text: data.education, spacing: { after: 200 } }),
      new Paragraph({
        children: [new TextRun({ text: 'Опыт работы', bold: true, size: 26 })],
      }),
      new Paragraph({ text: data.experience }),
    ];
  }

  // Шаблон не найден
  return [
    new Paragraph({
      children: [new TextRun({ text: 'Шаблон не выбран или недоступен.', bold: true, color: 'FF0000' })],
    }),
  ];
};

const generateHTML = (data: ResumeData) => {
  const fullName = `${data.lastName} ${data.firstName} ${data.middleName}`;

  if (data.template === 'templateOne') {
    return `
      <div style="font-family: Arial, sans-serif; padding: 40px; width: 595px; background: white; color: #000;">
        <h1 style="margin-bottom: 10px;">${fullName}</h1>
        <p><b>Город:</b> ${data.city}</p>
        <hr />
        <p><b>Контакты:</b><br>${data.contacts.replace(/\n/g, '<br>')}</p>
        <p><b>Образование:</b><br>${data.education.replace(/\n/g, '<br>')}</p>
        <p><b>Опыт работы:</b><br>${data.experience.replace(/\n/g, '<br>')}</p>
      </div>
    `;
  }

  if (data.template === 'templateTwo') {
    return `
      <div style="font-family: 'Georgia', serif; background: #f9f9f9; padding: 40px; width: 595px; color: #333;">
        <div style="border-bottom: 2px solid #ccc; margin-bottom: 20px;">
          <h2 style="margin: 0; color: navy;">${fullName}</h2>
          <p style="margin: 0 0 10px;"><i>${data.city}</i></p>
        </div>
        <section style="margin-bottom: 20px;">
          <h3>Контакты</h3>
          <p>${data.contacts.replace(/\n/g, '<br>')}</p>
        </section>
        <section style="margin-bottom: 20px;">
          <h3>Образование</h3>
          <p>${data.education.replace(/\n/g, '<br>')}</p>
        </section>
        <section>
          <h3>Опыт работы</h3>
          <p>${data.experience.replace(/\n/g, '<br>')}</p>
        </section>
      </div>
    `;
  }

  return `<div style="color: red;">Шаблон не выбран или недоступен.</div>`;
};