import MarkdownIt from 'markdown-it';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import {
  handleCodeblock,
  handleHeadingOpen,
  handleHeadingClose,
  handleParagraphOpen,
  handleParagraphClose,
  handleBlockquoteClose,
  handleBlockquoteOpen,
  handleHr,
  handleImage,
  handleTableCellClose,
  handleTableCellOpen,
  handleTableRowClose,
  handleTableRowOpen,
  handleTableSectionOpen,
  handleTableClose,
  handleTableOpen,
  handleListItemClose,
  handleListItemOpen,
  handleListClose,
  handleListOpen,
  handleInline,
} from './core';
import { TokenProcessor } from './processor/TokenProcessor';

const singleMdInstance = () => {
  let md: MarkdownIt;
  return () => {
    md = MarkdownIt({
      html: true,
      breaks: true,
    });
    return md;
  };
};
const getMd = singleMdInstance();

// 处理默认情况，统一转换内联元素
const handleDefault = (stack, token, { context }) => {
  const md = getMd();
  const inlineTokens = md.parseInline(token.content, {});
  inlineTokens.map(childToken => {
    handleInline(stack, childToken, { context });
  });
};

export const tokenProcessor = new TokenProcessor({
  // 标题
  heading_open: handleHeadingOpen,
  heading_close: handleHeadingClose,

  // 段落
  paragraph_open: handleParagraphOpen,
  paragraph_close: handleParagraphClose,

  // 内联内容
  inline: handleInline,

  // 列表（合并处理 bullet_list_open 和 ordered_list_open）
  bullet_list_open: handleListOpen,
  ordered_list_open: handleListOpen,
  bullet_list_close: handleListClose,
  ordered_list_close: handleListClose,

  // 列表项
  list_item_open: handleListItemOpen,
  list_item_close: handleListItemClose,

  // 表格
  table_open: handleTableOpen,
  table_close: handleTableClose,
  thead_open: handleTableSectionOpen,
  tbody_open: handleTableSectionOpen,
  tr_open: handleTableRowOpen,
  tr_close: handleTableRowClose,
  th_open: handleTableCellOpen,
  td_open: handleTableCellOpen,
  th_close: handleTableCellClose,
  td_close: handleTableCellClose,

  // 图片
  image: handleImage,

  // 水平线
  hr: handleHr,

  // 引用块
  blockquote_open: handleBlockquoteOpen,
  blockquote_close: handleBlockquoteClose,

  // 代码块
  fence: handleCodeblock,
  code_block: handleCodeblock,
  [TokenProcessor.DEFAULT_HANDLER_NAME]: (stack, token, { context }) => {
    handleDefault(stack, token, { context });
  },
});

export default function markdownpdfmake(markdownText: string, context = {}): TDocumentDefinitions {
  tokenProcessor.setContext(context);

  const md = getMd();
  const tokens = md.parse(markdownText, {});

  tokenProcessor.process(tokens);

  return {
    content: tokenProcessor.stack[0].content,
    defaultStyle: {
      font: 'Roboto',
      fontSize: 12,
    },
  };
}
