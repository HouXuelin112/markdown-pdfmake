import { addToParent } from './addToParent';

// 处理表格
export function handleTableOpen(stack) {
  stack.push({
    type: 'table',
    body: [],
    currentRow: null,
    currentCell: null,
    isHeader: false,
  });
}

export function handleTableClose(stack) {
  const table = stack.pop();

  // 计算列宽 - 所有列宽度相等
  if (table.body.length > 0 && table.body[0].length > 0) {
    const total = table.body[0].length;
    const ratio = (1 / total) * 100;
    table.body[0].forEach((_, index) => {
      if (!table.widths) {
        table.widths = [];
      }
      table.widths[index] = `${ratio}%`;
    });
  }

  const tableContent = {
    table: {
      body: table.body,
      widths: table.widths || ['auto'],
      dontBreakRows: true,
      keepWithNextRows: true,
    },
    layout: {
      hLineWidth: () => 0.5,
      vLineWidth: () => 0.5,
      hLineColor: () => '#ccc',
      vLineColor: () => '#ccc',
    },
    width: '100%',
    // margin: [0, 10, 0, 10]
  };

  addToParent(stack, tableContent);
}

export function handleTableSectionOpen(stack) {
  const table = stack[stack.length - 1];
  if (table.type === 'table') {
    // 新段落开始
  }
}

export function handleTableRowOpen(stack) {
  const table = stack[stack.length - 1];
  if (table.type === 'table') {
    table.currentRow = [];
    table.body.push(table.currentRow);
  }
}

export function handleTableRowClose(stack) {
  const table = stack[stack.length - 1];
  if (table.type === 'table') {
    table.currentRow = null;
  }
}

export function handleTableCellOpen(stack, token) {
  const table = stack[stack.length - 1];
  if (table.type === 'table') {
    const isHeader = token.type === 'th_open';
    table.currentCell = {
      content: [],
      isHeader,
    };
  }
}

export function handleTableCellClose(stack) {
  const table = stack[stack.length - 1];
  if (table.type === 'table' && table.currentCell) {
    const cellContent =
      table.currentCell.content.length === 1
        ? table.currentCell.content[0]
        : table.currentCell.content;

    const cell = table.currentCell.isHeader
      ? { text: cellContent, bold: true, alignment: 'center' }
      : { text: cellContent, alignment: 'left' };

    if (table.currentRow) {
      table.currentRow.push(cell);
    }

    table.currentCell = null;
  }
}
