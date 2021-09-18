// ==UserScript==
// @name         Youtube Unclutter
// @namespace    https://github.com/sachinthakac/tampermonkey_scripts
// @version      1.0.1
// @description  Unclutter YouTube by hiding seekbar, video info and channel icon
// @author       saro
// @match        https://www.youtube.com/*
// @icon         https://raw.githubusercontent.com/sachinthakac/tampermonkey_scripts/main/icons/youtube_unclutter.ico
// @grant        none
// ==/UserScript==

/*  Slight modification of the code by @Christian Wijaya.
    web: https://asapguide.com/hide-youtube-bar/
*/

(function() {
    'use strict';

    var yt_uncletter_hidden = false;

    function hide () {
        var goaway=".ytp-gradient-bottom,.branding-img-container,.ytp-chrome-top,.ytp-chrome-bottom{display:none;}";
        if("\v"=="v") {
            document.createStyleSheet().cssText=goaway;
        } else {
            var tag=document.createElement("style");
            tag.type="text/css";
            document.getElementsByTagName("head")[0].appendChild(tag);
            tag[(typeof document.body.style.WebkitAppearance=="string")?"innerText":"innerHTML"]=goaway;
        }
    };

    function show () {
        var goaway=".ytp-gradient-bottom,.branding-img-container,.ytp-chrome-top,.ytp-chrome-bottom{display:initial;}";
        if("\v"=="v") {
            document.createStyleSheet().cssText=goaway;
        } else {
            var tag=document.createElement("style");
            tag.type="text/css";
            document.getElementsByTagName("head")[0].appendChild(tag);
            tag[(typeof document.body.style.WebkitAppearance=="string")?"innerText":"innerHTML"]=goaway;
        }
    };

    document.addEventListener('keyup', function(e) {
        if(e.key === 'u') {
            if(yt_uncletter_hidden === false) {
                hide();
                yt_uncletter_hidden = true;
            } else {
                show();
                yt_uncletter_hidden = false;
            }
        }
    });

})();
