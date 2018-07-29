//tslint:disable-next-line:no-reference
/// <reference types="typescript/lib/lib" />
export default (extension_id, data) =>
  chrome.runtime.sendMessage(extension_id, data, null, () => window.close())
