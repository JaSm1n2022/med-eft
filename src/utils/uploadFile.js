/**
 * @param {Binary} file - file
 * @param {String}  signedRequest - signedRequest
 * @returns {Promise<Any>} -
 */
const uploadFile = (file, signedRequest) => new Promise((res, rej) => {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        res(200);
      } else {
        rej(xhr);
      }
    }
  };
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
      xhr.setRequestHeader('Access-Control-Allow-Credential', true);
  
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send(file);
});

export default uploadFile;
