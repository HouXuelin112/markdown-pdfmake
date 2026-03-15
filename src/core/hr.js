import { addToParent } from './addToParent';

// 处理水平线
export function handleHr(stack) {
  addToParent(stack, {
    canvas: [
      {
        type: 'line',
        x1: 0,
        y1: 0,
        x2: 515,
        y2: 0,
        lineWidth: 1,
        lineColor: '#cccccc',
      },
    ],
    margin: [0, 10, 0, 10],
  });
}
