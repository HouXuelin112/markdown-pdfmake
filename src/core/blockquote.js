import { addToParent } from './addToParent';

// 处理引用块
export function handleBlockquoteOpen(stack) {
  stack.push({
    type: 'blockquote',
    content: [],
  });
}

export function handleBlockquoteClose(stack) {
  const blockquote = stack.pop();
  addToParent(stack, {
    text: blockquote.content,
    margin: [20, 5, 0, 5],
    italics: true,
    color: '#666666',
  });
}
