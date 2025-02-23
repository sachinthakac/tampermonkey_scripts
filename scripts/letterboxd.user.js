// ==UserScript==
// @name         Letterboxd Ad Block Pop Up Dismisser
// @namespace    sachinthakac
// @version      2025-02-15
// @description  Auto dismiss the Letterboxd ad block pop up
// @author       sachinthakac
// @match        https://letterboxd.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=letterboxd.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("Running Letterboxd Ad Blocker Pop Up Dismisser");

    function waitForElement(callback) {

        const observer = new MutationObserver((mutations, obs) => {

            const elements = document.getElementsByClassName("_4ao5eF8B");
            if (elements.length > 0) {
                callback(elements[0]);
                obs.disconnect(); // Stop observing once the element is found
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    waitForElement((button) => {

        setTimeout(() => {
            button.click();
            console.log("Auto dismissed ad blocker pop up");
        }, 120);

    });

})();
