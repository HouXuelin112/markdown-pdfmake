export function addToParent(stack, content) {
  if (!content || (Array.isArray(content) && content.length === 0)) {
    return;
  }

  const parent = stack[stack.length - 1];

  if (parent.type === 'root') {
    // 如果是数组，可能需要展开
    if (Array.isArray(content)) {
      if (content.length === 1 && typeof content[0] !== 'string' && !content[0].text) {
        parent.content.push(content[0]);
      } else {
        // 将数组内容作为单独的元素添加
        content.forEach(item => {
          if (item) {
            if (typeof item === 'string') {
              parent.content.push({ text: item });
            } else {
              parent.content.push(item);
            }
          }
        });
      }
    } else {
      parent.content.push(content);
    }
  } else if (
    parent.type === 'paragraph' ||
    parent.type === 'heading' ||
    parent.type === 'listItem' ||
    parent.type === 'blockquote'
  ) {
    if (Array.isArray(content)) {
      // 确保content是数组且合并到父级
      parent.content.push(...content);
    } else {
      parent.content.push(content);
    }
  } else if (parent.type === 'list') {
    if (Array.isArray(content)) {
      parent.content.push(...content);
    } else {
      parent.content.push(content);
    }
  } else if (parent.type === 'table' && parent.currentCell) {
    if (Array.isArray(content)) {
      parent.currentCell.content.push(...content);
    } else {
      parent.currentCell.content.push(content);
    }
  }
}
