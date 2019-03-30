
/**
 * Decode/sanitize string to be nicely formatted for the user
 * @param {string} str - text string to be modified
 * @returns {string}
 * @public
 */
export function decodeHTMLEntities(str) {
  if(str && typeof str === 'string') {
    // strip script/html tags
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
    var element = document.createElement('div');
    element.innerHTML = str;
    str = element.textContent;
    element.textContent = '';
  }

  return str;
}