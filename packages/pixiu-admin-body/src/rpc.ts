export const MESSEAGE_HREF = 'MESSEAGE_HREF';
export const MESSEAGE_ADD_TAB = 'MESSEAGE_ADD_TAB';
export const isInIframe = window.top !== window;
export const parentLocation = (url) => {
  const msg = {
    type: MESSEAGE_HREF,
    data: {
      url,
    },
  };
  window.parent.postMessage(JSON.stringify(msg), '*');
};
const nativeOpen = window.open;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.open = (url, option) => {
  if (option === '_parent') {
    const msg = {
      type: MESSEAGE_ADD_TAB,
      data: {
        url,
      },
    };
    window.parent.postMessage(JSON.stringify(msg), '*');
  } else {
    nativeOpen(url, option);
  }
};
