import { getStyle } from '../core/getStyle.js';
import { TokenHandlerRegistry } from './TokenHandlerRegistry.js';
export class TokenProcessor {
  static DEFAULT_HANDLER_NAME = 'default';
  /**
   * @param {{[key: string]: (stack: any, token: any, context: any) => Promise<void 0>}} handlers
   */
  constructor(handlers, context = {}) {
    this.setContext(context);
    this.registry = new TokenHandlerRegistry();
    this.stack = [
      {
        type: 'root',
        content: [],
      },
    ];
    this.handlers = handlers;
    this.initRegistry();
  }

  setContext(context) {
    this.context = Object.assign({}, context, {
      hook: {
        getStyle,
      },
      ...context.hook,
    });
  }

  initRegistry() {
    Object.keys(this.handlers).forEach(handlerType => {
      if (handlerType === TokenProcessor.DEFAULT_HANDLER_NAME) {
        this.registry.setDefaultHandler(this.handlers[handlerType]);
      } else {
        this.registry.register(handlerType, this.handlers[handlerType]);
      }
    });
  }

  process(tokens) {
    // 清空栈
    this.stack = [
      {
        type: 'root',
        content: [],
      },
    ];
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      try {
        this.registry.handle(this.stack, token, {
          context: this.context,
          index: i,
          total: tokens.length,
          tokens: tokens,
        });
      } catch (error) {
        console.error('Error processing token:', token, error);
        throw error;
      }
    }

    return this.stack;
  }

  // 允许动态注册新处理器
  registerHandler(type, handler) {
    this.registry.register(type, handler);
    return this;
  }
}
