import { exportToPdf } from './pdfExport';

const inputEl = document.querySelector('textarea') as HTMLTextAreaElement;
const exportBtn = document.getElementById('exportBtn') as HTMLButtonElement;

exportBtn.addEventListener('click', () => {
  const content = inputEl.value;
  exportToPdf({ content, fileName: 'example.pdf' });
});
