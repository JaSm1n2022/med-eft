export const validateFileSize = (file) => Math.round(file.size / 1000000) > 20;

export function checkForNullObject(obj) {
  if (!obj) {
    return true;
  }
  /*eslint-disable */
  for (const key in obj) {
    if (obj[key] != null && obj[key] !== '') return false;
  }
  /* eslint-enable */

  return true;
}


export function getGuid() {
  const S4 = function () {
    // eslint-disable-next-line
    return ((1 + Math.random()) * 0x10000 | 0).toString(4).substring(1);
  };
  return `${S4()}-${S4()}-${S4()}-${S4()}`;
}
