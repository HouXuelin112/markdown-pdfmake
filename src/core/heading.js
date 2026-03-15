import { addToParent } from './addToParent';

// 处理标题
export function handleHeadingOpen(stack, token) {
  const level = parseInt(token.tag.substring(1));
  stack.push({
    type: 'heading',
    level,
    content: [],
  });
}

export function handleHeadingClose(stack) {
  const heading = stack.pop();
  const headingContent = {
    text: heading.content,
    style: `h${heading.level}`,
  };
  addToParent(stack, headingContent);
}
