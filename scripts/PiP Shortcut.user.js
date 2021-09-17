// ==UserScript==
// @name         PiP Shortcut
// @namespace    https://github.com/sachinthakac/tampermonkey_scripts
// @version      1.1
// @description  Hotkey to make play HTML5 video in Picture in Picture format.
// @author       sachi
// @match        http://*/*
// @icon         https://raw.githubusercontent.com/sachinthakac/tampermonkey_scripts/main/icons/pip.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function pipFunction(videoElement) {
        try {
            if (videoElement !== document.pictureInPictureElement) {

                // exit PiP if already playing
                if(document.pictureInPictureElement)
                    document.exitPictureInPicture();

                videoElement.requestPictureInPicture();

                if (videoElement.paused)
                    videoElement.play()

            } else {
                document.exitPictureInPicture();
            }
        } catch (e) {
            console.error(e);
        }
    }

    function isElementInViewport(el) {
        let rect = el.getBoundingClientRect();

        return rect.bottom > 0 &&
            rect.right > 0 &&
            rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
            rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
    }

    document.addEventListener('keyup', function(e) {
        if(e.ctrlKey && e.key === 'i' && document.getElementsByTagName('video').length > 0) {

            let playingVideos = Array.from(document.getElementsByTagName('video')).filter(x=>!x.paused);
            if (playingVideos.length >= 1) {
                let viewportVideos = playingVideos.filter(x=>isElementInViewport(x));
                if (viewportVideos.length >= 1) {
                    pipFunction(viewportVideos[0]);
                } else {
                    pipFunction(playingVideos[0]);
                }
            } else {
                let allVideos = Array.from(document.getElementsByTagName('video'));
                let viewportVideos = allVideos.filter(x=>isElementInViewport(x));
                if (viewportVideos.length >= 1) {
                    pipFunction(viewportVideos[0]);
                } else {
                    pipFunction(allVideos[0]);
                }
            }
        }
    });

})();