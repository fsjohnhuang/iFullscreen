# iFullscreen
Just a much more ideal Fullscreen API I'm afraid :D

## Usage
```
<button id="fs">Full Screen</button>
<button id="n">Normal</button>

iFullscreen.addEventListener("fullscreenchange", evt => {
  if (iFullscreen.isFullscreen()){
    let el = iFullscreen.getFullscreenElement()
    // do something as you want when displayed full-screen
  }
  else{
    // do something as you want
  }
})

iFullscreen.addEventListener("fullscreenerror", evt => {
  // sorry, make the page or element to be displayed full-screen is fail
})

document.getElementById("fs")
        .addEventListener("click", evt => iFullscreen.requestFullscreen())
document.getElementById("n")
        .addEventListener("click", evt => iFullscreen.exitFullscreen())
```

## API
### isFullscreen
```
/* @description indicates the page is displayed full-screen or not
 * @method
 * @returns {Boolean}
 */
```
### isFullscreenEnabled
```
/* @description indicates current user agent support Fullscreen feature or not
 * @method
 * @returns {Boolean}
 */
```
### getFullscreenElement
```
/* @description gets the element which is displayed full-screen now.
 * @method
 * @returns {Element}
 */
```
### requestFullscreen
```
/* @description issues an asynchronous request to make the element be displayed full-screen.
 * @method
 * @param {HTMLElement} [el=document.documentElement] - the element be displayed full-screen. the whole page is defualt value.
 * @remark the parameter el must be the built-in standard HTML elements(that is elements in the HTML namespace), <svg>, <math> and iframe with allowfullscreen attribute which are located in the top-level document, otherwise would be displayed full-screen.(eg. <object> and elements in <frame> could not be displayed full-screen)
 */
```
### exitFullscreen
```
/* @description issues an asynchronous request to make the element be displayed in normal mode.
 * @method
 */
```
### addEventListener
```
/* @description listen to the fullscreenchange or fullscreenerror event
 * @method
 * @param {String} eventType - fullscreenchange and fullscreenerror are accepted only
 * @param {Function} f - handler
 */
```
### removeEventListener
```
/* @description remove listener to the fullscreenchange or fullscreenerror event
 * @method
 * @param {String} eventType - fullscreenchange and fullscreenerror are accepted only
 * @param {Function} f - handler
 */
```
