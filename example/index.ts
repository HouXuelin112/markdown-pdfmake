import { exportToPdf } from './pdfExport';

const inputEl = document.querySelector('textarea') as HTMLTextAreaElement;
const exportBtn = document.getElementById('exportBtn') as HTMLButtonElement;

exportBtn.addEventListener('click', async () => {
  const content = inputEl.value;
  await exportToPdf({ content, fileName: 'example.pdf' });
});
