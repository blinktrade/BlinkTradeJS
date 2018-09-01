import sha256 from 'js-sha256';
import { encodeByteArray } from './hash32';

export function getFingerPrint() {
  const keys = [];
  keys.push(window.navigator.userAgent);
  keys.push(window.screen.colorDepth);
  keys.push(window.navigator.language);
  if (Array.isArray(window.navigator.languages)) {
    keys.push(window.navigator.languages.join('x'));
  } else {
    keys.push(typeof undefined);
  }
  const resolution = (window.screen.height > window.screen.width)
                ? [window.screen.height, window.screen.width]
                : [window.screen.width, window.screen.height];
  keys.push(resolution.join('x'));
  keys.push(new Date().getTimezoneOffset());
  keys.push(typeof window.sessionStorage !== 'undefined');
  keys.push(typeof window.localStorage !== 'undefined');
  keys.push(!!window.indexedDB);
  if (document.body) {
    keys.push(typeof window.document.body.addBehavior);
  } else {
    keys.push(typeof undefined);
  }
  keys.push(typeof window.openDatabase);
  keys.push(window.navigator.cpuClass);
  keys.push(window.navigator.platform);
  keys.push(window.navigator.doNotTrack);

  const pluginKeyList = [];
  Array.from(window.navigator.plugins).forEach((p) => {
    const mimeTypes = [];
    Object.values(p).forEach((mt) => {
      mimeTypes.push([mt.type, mt.suffixes].join('~'));
    });
    pluginKeyList.push([p.name, p.description, mimeTypes.join(',')].join('::'));
  });
  keys.push(pluginKeyList.join(';'));

  const canvasEl = document.createElement('canvas');
  if (canvasEl.getContext && canvasEl.getContext('2d')) {
    const ctx = canvasEl.getContext('2d');
    const txt = 'http://valve.github.io';
    ctx.textBaseline = 'top';
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText(txt, 4, 17);
    keys.push(canvasEl.toDataURL());
  }

  const digest = sha256.digest(keys.join('###'));

  let fingerPrint = parseInt(encodeByteArray(digest));
  if (fingerPrint < 0) {
    fingerPrint *= -1;
  }
  return fingerPrint;
}
