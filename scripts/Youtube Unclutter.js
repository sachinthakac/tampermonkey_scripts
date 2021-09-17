// ==UserScript==
// @name         Youtube Unclutter
// @namespace    https://github.com/sachinthakac/tampermonkey_scripts
// @version      1.0
// @description  Unclutter youtube by disabeling seekbar and info
// @author       saro
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var yt_uncletter_hidden = false;

    function hide () {
        var goaway=".branding-img-container,.ytp-chrome-top,.ytp-chrome-bottom{display:none;}";
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
        var goaway=".branding-img-container,.ytp-chrome-top,.ytp-chrome-bottom{display:initial;}";
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