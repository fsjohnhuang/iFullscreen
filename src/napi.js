/*************************************************
 * Native API wrapper
 *************************************************/
const rNative = /\{\s*\[native\s+code\]\s*\}/i
function isNative(f){
  let src = f + ''
  return rNative.test(src)
}

/** PROPERTIES  **/
const isFullscreenImpls = ["fullscreen", "mozFullScreen", "webkitIsFullScreen", "msFullscreenElement"]
/* @description indicates displayed full-screen or not
 * @returns {Boolean}
 * @remark allways returns false out of the scope of fullscreenchange event handler
 */
export function isFullscreen(){
  for (var i = 0, l = isFullscreenImpls.length; i < l; i++) {
    let impl = isFullscreenImpls[i]
    if (impl in document){
      return !!document[impl]
    }
  }
}

const getFullscreenElementImpls = ["fullscreenElement", "mozFullScreenElement", "webkitFullscreenElement", "msFullscreenElement"]
export function getFullscreenElement(){
  for (var i = 0, l = getFullscreenElementImpls.length; i < l; i++) {
    let impl = getFullscreenElementImpls[i]
    if (impl in document){
      return document[impl]
    }
  }
}

const isFullscreenEnabledImpls = ["fullscreenEnabled", "mozFullScreenEnabled", "webkitFullscreenEnabled", "msFullscreenEnabled"]
export function isFullscreenEnabled(){
  for (var i = 0, l = isFullscreenEnabledImpls.length; i < l; i++) {
    let impl = isFullscreenEnabledImpls[i]
    if (impl in document){
      return document[impl]
    }
  }
  return false
}

/** METHODS  **/
const requestFullscreenImpls = ["requestFullscreen", "mozRequestFullScreen", "webkitRequestFullscreen", "msRequestFullscreen"]
/* @description issues an asynchronous request to make the element be displayed full-screen.
 * @param {HTMLElement} [el=document.documentElement] - the element be displayed full-screen. the whole page is defualt value.
 * @remark the parameter el must be the built-in standard HTML elements(that is elements in the HTML namespace), <svg>, <math> and iframe with allowfullscreen attribute which are located in the top-level document, otherwise would be displayed full-screen.(eg. <object> and elements in <frame> could not be displayed full-screen)
 */
export function requestFullscreen(el){
  el = el || document.documentElement
  let executed = false
  for (var i = 0, l = requestFullscreenImpls.length; !executed && i < l; i++) {
    let impl = requestFullscreenImpls[i]
    if (isNative(el[impl])){
      executed = true
      el[impl]()
    }
  }
}

const exitFullscreenImpls = ["exitFullscreen", "mozCancelFullScreen", "webkitExitFullscreen", "msExitFullscreen"]
export function exitFullscreen(){
  let executed = false
  for (var i = 0, l = exitFullscreenImpls.length; !executed && i < l; i++) {
    let impl = exitFullscreenImpls[i]
    if (isNative(document[impl])){
      executed = true
      document[impl]()
    }
  }
}

/** EVENTS **/
/* @usage
 *   addEventListener("fullscreenchange", function(evt){
 *    if (isFullscree()){
 *      let el = getFullscreenElement()
 *      // your bussiness logic
 *    }
 *   })
 *   requestFullscreen()
 */
const EVENT_TYPES = ["fullscreenchange", "fullscreenerror"]
export function addEventListener(eventType, f){
  if (!~EVENT_TYPES.indexOf(eventType)) throw Error("Support fullscreenchange and fullscreenerror event only!")

  if (EVENT_TYPES[0] === eventType){
    onFullscreenchange(f)
  }
  else{
    onFullscreenerror(f)
  }
}
export function removeEventListener(eventType, f){
  if (!~EVENT_TYPES.indexOf(eventType)) throw Error("Support fullscreenchange and fullscreenerror event only!")

  if (EVENT_TYPES[0] === eventType){
    offFullscreenchange(f)
  }
  else{
    offFullscreenerror(f)
  }
}

const onFullscreenchangeImpls = ["onfullscreenchange", "onmozfullscreenchange", "onwebkitfullscreenchange", "onmsfullscreenchange"]
function onFullscreenchange(f){
  for (var i = 0, l = onFullscreenchangeImpls.length; i < l; i++) {
    let impl = onFullscreenchangeImpls[i]
    if (impl in document){
      document.addEventListener(impl.replace(/^on/, ""), f)
      return
    }
  }
}
function offFullscreenchange(f){
  for (var i = 0, l = onFullscreenchangeImpls.length; i < l; i++) {
    let impl = onFullscreenchangeImpls[i]
    if (impl in document){
      document.removeEventListener(impl.replace(/^on/, ""), f)
      return
    }
  }
}

const onFullscreenerrorImpls = ["onfullscreenerror", "onmozfullscreenerror", "onwebkitfullscreenerror", "onmsfullscreenerror"]
function onFullscreenerror(f){
  for (var i = 0, l = onFullscreenerrorImpls.length; i < l; i++) {
    let impl = onFullscreenerrorImpls[i]
    if (impl in document){
      document.addEventListener(impl.replace(/^on/, ""), f)
      return
    }
  }
}
function offFullscreenerror(f){
  for (var i = 0, l = onFullscreenerrorImpls.length; i < l; i++) {
    let impl = onFullscreenerrorImpls[i]
    if (impl in document){
      document.removeEventListener(impl.replace(/^on/, ""), f)
      return
    }
  }
}
