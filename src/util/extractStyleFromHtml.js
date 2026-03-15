export function extractStyleFromHtml(htmlStr, tagDefaultStyles = {}) {
  const tagName = htmlStr.match(/<(\w+)/i)?.[1]?.toLocaleLowerCase();
  const styleObj = {};

  if (tagDefaultStyles[tagName]) {
    Object.assign(styleObj, tagDefaultStyles[tagName]);
  }
  const styleMatch = htmlStr.match(/style\s*=\s*["']([^"']*)["']/i);
  if (!styleMatch) {
    return styleObj;
  }

  const styleText = styleMatch[1];
  // 将 style 字符串分割为 key: value 对
  styleText.split(';').forEach(pair => {
    const [key, value] = pair.split(':').map(s => s.trim());
    if (key && value) {
      // 转换为驼峰命名（如：font-size → fontSize）
      const camelCaseKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
      styleObj[camelCaseKey] = value;
    }
  });

  return styleObj;
}
