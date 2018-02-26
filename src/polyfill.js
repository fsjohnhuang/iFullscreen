/*************************************************
 * Fixes the pitfalls of native Fullscreen API
 *************************************************/
export function isFullscreen(){
  let oh = window.outerHeight
    , ow = window.outerWidth
    , sh = screen.height
    , sw = screen.width

  return oh == sh && ow == sw
}

export function getFullscreenElement(){
  return document.documentElement
}
