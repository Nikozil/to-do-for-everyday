export const autoHeight = (element: HTMLElement | undefined) => {
  if (element) {
    setTimeout(() => {
      element.style.cssText = 'height:' + element.scrollHeight + 'px';
    }, 0);
  }
};

export const toUpperCase = (value: string) => {
  if (value) {
    return value[0].toUpperCase() + value.slice(1);
  } else return '';
};
