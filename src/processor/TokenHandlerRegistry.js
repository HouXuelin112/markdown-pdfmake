export class TokenHandlerRegistry {
  constructor() {
    this.handlers = new Map();
    this.defaultHandler = null;
  }

  // 注册单个处理器
  register(type, handler) {
    if (Array.isArray(type)) {
      type.forEach(t => this.handlers.set(t, handler));
    } else {
      this.handlers.set(type, handler);
    }
    return this;
  }

  // 批量注册处理器
  registerBatch(handlersMap) {
    Object.entries(handlersMap).forEach(([type, handler]) => {
      this.register(type, handler);
    });
    return this;
  }

  // 设置默认处理器
  setDefaultHandler(handler) {
    this.defaultHandler = handler;
    return this;
  }

  // 获取处理器
  getHandler(type) {
    return this.handlers.get(type) || this.defaultHandler;
  }

  // 处理token
  handle(stack, token, context = {}) {
    const handler = this.getHandler(token.type);
    if (handler) {
      return handler(stack, token, context);
    }
    return null;
  }
}
