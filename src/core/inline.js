import { extractStyleFromHtml } from '../util/extractStyleFromHtml';
import { isHtmlTagEnd, isHtmlTagStart } from '../util/htmlTag';
import { addToParent } from './addToParent';
import { handleImage } from './image';

// 文本相关标签的默认原生样式
const TAG_DEFAULT_STYLES = {
  h1: { fontSize: '20px', fontWeight: 'bold' },
  h2: { fontSize: '18px', fontWeight: 'bold' },
  h3: { fontSize: '16px', fontWeight: 'bold' },
  h4: { fontSize: '14px', fontWeight: 'bold' },
  h5: { fontSize: '12px', fontWeight: 'bold' },
  h6: { fontSize: '11px', fontWeight: 'bold' },
  a: { color: '#1b63d9', textDecoration: 'underline' },
  strong: { fontWeight: 'bold' },
  b: { fontWeight: 'bold' },
  u: { textDecoration: 'underline' },
  s: { textDecoration: 'line-through' },
  del: { textDecoration: 'line-through' },
  mark: { backgroundColor: '#ffff00' },
};

const camelCaseKey = key => {
  return key.replace(/-([a-z])/g, g => g[1].toUpperCase());
};

const transferHtmlStyle = style => {
  const transferStyle = {};
  if (!style) {
    return transferStyle;
  }
  Object.keys(style).forEach(key => {
    if (key === 'fontWeight') {
      if (style[key] > 400 || `${style[key]}`.startsWith('bold')) {
        transferStyle.bold = true;
      }
    }
    if (key === 'fontStyle') {
      if (`${style[key]}`.startsWith('ital')) {
        transferStyle.italics = true;
      }
      if (`${style[key]}`.startsWith('obli')) {
        transferStyle.bold = true;
        transferStyle.italics = true;
      }
    }
    if (key === 'textDecoration') {
      transferStyle.decoration = camelCaseKey(`${style[key]}`);
    }
    if (key.startsWith('background')) {
      transferStyle.background = style[key];
    }
    if (`${style[key]}`.endsWith('px')) {
      transferStyle[key] = `${style[key]}`.replace('px', '');
    }
    if (key === 'color' && /^#?[0-9a-z]{6}$/i.test(style[key])) {
      transferStyle[key] = `${style[key]}`.toLocaleLowerCase();
    }
  });
  return transferStyle;
};

// 处理内联样式
export function handleInline(stack, token, context) {
  const inlineContent = [];
  const children = token.children || [];
  let currentStyle = {};
  let htmlStyle = {};

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (child.type === 'text') {
      const mergeStyle = Object.assign({}, currentStyle, transferHtmlStyle(htmlStyle));
      if (Object.keys(mergeStyle).length > 0) {
        inlineContent.push({
          text: child.content,
          ...mergeStyle,
        });
      } else {
        inlineContent.push(child.content);
      }
    } else if (['softbreak', 'hardbreak'].includes(child.type)) {
      inlineContent.push('\n');
    } else if (child.type === 'strong_open') {
      currentStyle.bold = true;
    } else if (child.type === 'strong_close') {
      delete currentStyle.bold;
    } else if (child.type === 'em_open') {
      currentStyle.italics = true;
    } else if (child.type === 'em_close') {
      delete currentStyle.italics;
    } else if (child.type === 'link_open') {
      const href = child.attrs.find(attr => attr[0] === 'href')[1];
      currentStyle = {
        link: href,
        color: 'blue',
        decoration: 'underline',
      };
    } else if (child.type === 'link_close') {
      currentStyle = {};
    } else if (['code', 'code_inline'].includes(child.type)) {
      currentStyle = {};
      inlineContent.push({
        text: child.content,
        background: '#f0f0f0',
      });
    } else if (child.type === 'image') {
      handleImage(stack, child, context);
    } else if (child.type === 'html_inline') {
      if (isHtmlTagStart(child.content)) {
        try {
          htmlStyle = extractStyleFromHtml(child.content, TAG_DEFAULT_STYLES);
        } catch (e) {}
      }
      if (isHtmlTagEnd(child.content)) {
        htmlStyle = {};
      }
    } else {
      console.warn('Unhandled inline token type:', child.type, child);
    }
  }

  // 合并连续的文本节点
  const mergedContent = mergeTextNodes(inlineContent);

  // 添加到当前上下文
  addToParent(stack, mergedContent);
}

// 合并文本节点
function mergeTextNodes(content) {
  return {
    text: content,
  };
}
