import markdownpdfmake from '../src/index';
import pdfMake from 'pdfmake/build/pdfmake';

export async function exportToPdf(config: { content: string; fileName?: string }) {
  const { content, fileName = 'document.pdf' } = config;

  const defData = await markdownpdfmake(content);

  // 构建文档定义
  const docDefinition: any = {
    content: defData.content,
    defaultStyle: {
      font: 'SourceHanSansCN',
      fontSize: 12,
      lineHeight: 1.5,
      color: '#000000',
    },
    styles: {
      h1: { fontSize: 20, bold: true, margin: [0, 0, 0, 4] },
      h2: { fontSize: 18, bold: true, margin: [0, 0, 0, 4] },
      h3: { fontSize: 16, bold: true, margin: [0, 0, 0, 4] },
      h4: { fontSize: 14, bold: true, margin: [0, 0, 0, 3] },
      h5: { fontSize: 12, bold: true, margin: [0, 0, 0, 3] },
      h6: { fontSize: 11, bold: true, margin: [0, 0, 0, 2] },
    },
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 40],
    header,
    footer,
    pageBreakBefore: function (currentNode: any) {
      // 避免表格和图片被截断
      if (currentNode.tables || currentNode.images) {
        return true;
      }
      return false;
    },
  };

  // 生成 PDF
  try {
    const vfs = await import('../src/font/index').then(module => module.SourceHanSansCN_vfs);
    pdfMake.addFontContainer({
      fonts: {
        SourceHanSansCN: {
          normal: 'SourceHanSansCN-Normal.otf',
          bold: 'SourceHanSansCN-Bold.otf',
        },
      },
      vfs,
    });
    return pdfMake.createPdf(docDefinition).download(fileName);
  } catch (error) {
    console.error('PDF export: generation failed', error);
    throw error;
  }
}

const header = () => {
  return {
    stack: [
      {
        columns: [
          {
            text: '测试导出PDF - 页眉',
            margin: [40, 20, 0, 0],
            style: 'h4',
            lineHeight: 1.2,
            alignment: 'left',
          },
          {
            text: '测试导出PDF - Header',
            margin: [0, 20, 40, 0],
            style: 'h4',
            lineHeight: 1.2,
            alignment: 'right',
          },
        ],
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 40,
            y1: 0,
            x2: 555,
            y2: 0,
            lineWidth: 1,
            lineColor: '#000000',
          },
        ],
      },
    ],
  };
};

const footer = (currentPage: number, pageCount: number) => {
  return {
    stack: [
      {
        canvas: [
          {
            type: 'line',
            x1: 40,
            y1: 0,
            x2: 555,
            y2: 0,
            lineWidth: 1,
            lineColor: '#000000',
          },
        ],
      },
      {
        columns: [
          {
            text: '测试导出PDF - 页脚',
            color: '#87879c',
            fontSize: 9,
            margin: [40, 4, 0, 0],
            lineHeight: 1.2,
            alignment: 'left',
          },
          {
            text: `第 ${currentPage} 页，共 ${pageCount} 页`,
            height: 16,
            fontSize: 9,
            margin: [0, 4, 40, 0],
            alignment: 'right',
          },
        ],
      },
    ],
  };
};
