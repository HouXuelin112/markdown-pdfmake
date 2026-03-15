import { addToParent } from './addToParent';

// 处理段落
export function handleParagraphOpen(stack) {
  stack.push({
    type: 'paragraph',
    content: [],
  });
}

export function handleParagraphClose(stack) {
  const paragraph = stack.pop();
  if (paragraph.content.length > 0) {
    addToParent(stack, paragraph.content.length === 1 ? paragraph.content[0] : paragraph.content);
  }
}
