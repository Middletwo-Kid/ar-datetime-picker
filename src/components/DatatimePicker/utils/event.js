// addEventListener绑定
export const on = (target, event, handler, passive = false) => {
  target.addEventListener(event, handler, { capture: false, passive });
};

// removeEventListener移除
export const off = (target, event, handler) => {
  target.removeEventListener(event, handler);
};

// 阻止冒泡
export const stopPropagation = (event) => {
  event.stopPropagation();
};

// 阻止默认行为
export const preventDefault = (event, isStopPropagation) => {
  if (typeof event.cancelBubble !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
};
