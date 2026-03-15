import { addToParent } from './addToParent';

// 处理列表
export function handleListOpen(stack, token) {
  const ordered = token.type === 'ordered_list_open';
  stack.push({
    type: 'list',
    ordered,
    content: [],
  });
}

export function handleListClose(stack) {
  const list = stack.pop();

  // 转换列表项为pdfmake列表格式
  const listItems = list.content.map(item => {
    if (Array.isArray(item)) {
      // 处理嵌套列表
      return item;
    }
    return item;
  });

  const listContent = list.ordered ? { ol: listItems } : { ul: listItems };

  listContent.margin = [0, 5, 0, 5];

  addToParent(stack, listContent);
}

// 处理列表项
export function handleListItemOpen(stack) {
  stack.push({
    type: 'listItem',
    content: [],
  });
}

export function handleListItemClose(stack) {
  const item = stack.pop();
  const list = stack[stack.length - 1];

  if (list.type === 'list') {
    if (item.content.length === 1) {
      list.content.push(item.content[0]);
    } else {
      // 处理嵌套内容
      list.content.push(item.content);
    }
  }
}
