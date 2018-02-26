/*!
 * @version 0.2.1
 * @author fsjohnhuang
 * @email fsjohnhuang@hotmail.com
 * @ref https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
 *      http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/fullscreen.html
 * @compatibility IE11+
 * @remark Native Fullscreen API has these pitfalls listed below:
 *         1. The Fullscreen API is disabled in `file` protocol.
 *         2. :fullscreen,:-moz-full-screen,:-webkit-full-screen,:-ms-fullscreen,::backdrop and ::-ms-backdrop would become effective when invoke the requestFullscreen API by JS only.(that is press F11 would not work)
 *         3. Events fullscreenchange and fullscreenerror would be fired when invokes requestFullscreen method to make the element be displayed full-screen only. So press F11 would not trigger those events above.
 *         4. Event fullscreenchange would be fired before window.resize event.
 */

import * as napi from "./napi"
import * as polyfill from "./polyfill"

/** PROPERTIES  **/
export function isFullscreen(){
  return napi.isFullscreen() || polyfill.isFullscreen()
}
export const isFullscreenEnabled = napi.isFullscreenEnabled
export function getFullscreenElement(){
  let el = napi.getFullscreenElement()
  if (el == null && isFullscreen()){
    el = polyfill.getFullscreenElement()
  }

  return el
}

/** METHODS  **/
export const requestFullscreen = napi.requestFullscreen
export const exitFullscreen = napi.exitFullscreen

const CUST_EVENT_TYPE = "ifullscreenchange"
export function addEventListener(eventType, f){
  napi.addEventListener(eventType, f)
  document.addEventListener(CUST_EVENT_TYPE, f)
  // fire ifullscreechange event when add first event listener
  addEventListener.queue  = (addEventListener.queue || 0) + 1
  if (addEventListener.queue == 1){
    detect()
  }
}
export function removeEventListener(eventType, f){
  napi.removeEventListener(eventType, f)
  document.removeEventListener(CUST_EVENT_TYPE, f)
}

/** INITIALIZE  **/
let gIsActive = false
function detect(){
  let currState = isFullscreen()
  if (currState != gIsActive){
    gIsActive = currState
    let evt = document.createEvent("CustomEvent")
    evt.initCustomEvent(CUST_EVENT_TYPE, false, false, null)
    document.dispatchEvent(evt)
  }
}
napi.addEventListener("fullscreenchange", _ => {
  gIsActive = isFullscreen()
})
window.addEventListener("resize", detect)
