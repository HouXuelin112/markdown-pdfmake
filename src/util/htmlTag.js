const HTML_TAG_START_REGEX = /^<\w+/i;
const HTML_TAG_END_REGEX = /^<\/\w+/i;

export const isHtmlTagStart = text => {
  return HTML_TAG_START_REGEX.test(text);
};

export const isHtmlTagEnd = text => {
  return HTML_TAG_END_REGEX.test(text);
};
