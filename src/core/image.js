import { addToParent } from './addToParent';

const DEFAULT_IMAGE_WIDTH = 510;

// 处理图片
export function handleImage(stack, token, { context }) {
  const attrs = {};
  token.attrs.forEach(([key, value]) => {
    attrs[key] = value;
  });

  const imageContent = {
    image: attrs.src,
    width: attrs.width ? parseInt(attrs.width) : context?.style?.imageWidth || DEFAULT_IMAGE_WIDTH,
    height: attrs.height ? parseInt(attrs.height) : context?.style?.imageHeight,
    margin: [0, 10, 0, 10],
  };

  addToParent(stack, imageContent);
}
