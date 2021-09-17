// ==UserScript==
// @name         Search Letterboxd
// @namespace    https://github.com/sachinthakac/tampermonkey_scripts
// @version      0.9
// @description  Search Letterboxd from 1337x
// @author       sachi
// @match        https://1337x.to/*
// @icon         https://letterboxd.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let torrents = Array.from(document.getElementsByTagName('tr')).filter(tr => tr.parentElement.tagName !== 'THEAD').map(tr => tr.children[0]);
    torrents.forEach(torrent => {
        let isMovie = torrent.children[0].href.match(/(73|42|41|70|75|2|54|4|movies)/gm);
        let match = torrent.children[1].innerText.match(/.+?\d{4}\./);
        if(match && isMovie) {
            let name = match[0].slice(0, -1);
            let query = "https://letterboxd.com/search/films/" + name.replaceAll('.', '+');
            let boxd = `
                <span style="position: absolute; left: -30px; top: 25%; display: block; border: 0px solid rgb(215, 215, 215);">
                    <a href="${query}" title="Search Letterboxd for ${name.replaceAll('.', ' ')}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </a>
                </span>
            `
            torrent.insertAdjacentHTML('beforeend', boxd);
        }
    });
})();