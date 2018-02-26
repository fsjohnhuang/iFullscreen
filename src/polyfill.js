/*************************************************
 * Fixes the pitfalls of native Fullscreen API
 *************************************************/

function webkitIsFullscreen(oh, ow, sh, sw, sah, saw){
  return (saw == sw && ow == saw) || (saw < sw && ow > saw)
}
function msIsFullscreen(oh, ow, sh, sw, sah, saw){
  return ow == sw && oh == sh
}

export function isFullscreen(){
  let oh = window.outerHeight
    , ow = window.outerWidth
    , sh = screen.height
    , sw = screen.width
    , sah = screen.availHeight
    , saw = screen.availWidth

  if (/chrome/i.test(navigator.userAgent)){
    return webkitIsFullscreen(oh, ow, sh, sw, sah, saw)
  }
  else{
    return msIsFullscreen(oh, ow, sh, sw, sah, saw)
  }
}

export function getFullscreenElement(){
  return document.documentElement
}
