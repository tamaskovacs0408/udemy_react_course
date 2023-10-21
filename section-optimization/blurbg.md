# Bluring background focus-in input

## Script

```js

window.useBlur = function () {

    const blurDiv = document.createElement("div");
    blurDiv.setAttribute('id', 'pfbx_ac_blur');
    document.body.prepend(blurDiv);
};

window.useBlur(".header-one");

function autocompleteFocusInEventListener() {
    const acBlur = document.querySelector("#pfbx_ac_blur");

    acBlur.classList.add("visible");
}

window.prefixboxFunctions.autocompleteFocusInEventListener = autocompleteFocusInEventListener;
window.addEventListener('pfbx-autocomplete-focus-in', autocompleteFocusInEventListener);

function autocompleteFocusOutEventListener() {
    const acBlur = document.querySelector("#pfbx_ac_blur");

    acBlur.classList.remove("visible");
}

window.prefixboxFunctions.autocompleteFocusOutEventListener = autocompleteFocusOutEventListener;
window.addEventListener('pfbx-autocomplete-focus-out', autocompleteFocusOutEventListener);

window.useBlur = function () {

    const blurDiv = document.createElement("div");
    blurDiv.setAttribute('id', 'pfbx_ac_blur');
    document.body.prepend(blurDiv);
};

```


## Style:

```css

#pfbx_ac_blur {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh + 30px);
    background-color: rgba(0, 0, 0, 0.504);
    opacity: 0%;
    pointer-events: none;
    z-index: 1001;
    transition: opacity 300ms ease-in-out;
}
#pfbx_ac_blur.visible {
    opacity: 100%;
    pointer-events: all;
}

```
