"use strict";

import cv from '../cv.json' assert { type: 'json' };

window.onload = () => {
    replaceSingleStrings();
    createTemplates();
};

function createTemplates() {
    const templates = document.getElementsByClassName("t");
    Array.from(templates).forEach(template => {
        const array = cv[template.innerHTML.substring(template.innerHTML.indexOf("{{") + 2, template.innerHTML.lastIndexOf("}}"))];
        template.innerHTML = template.innerHTML.replace(/{{.*?}}/g, '');
        array.forEach(elem => {
            const newElem = template.cloneNode(true);
            getMatches(newElem).forEach(valueReplace => {
                newElem.innerHTML = newElem.innerHTML.replace(`[[${valueReplace}]]`, elem[valueReplace]);
            });
            template.parentElement.appendChild(newElem);
        });

        template.remove();
    });
}

function replaceSingleStrings() {
    const replace = document.getElementsByClassName("r");
    Array.from(replace).forEach(element => {
        getMatches(element).forEach(valueReplace => {
            element.innerHTML = element.innerHTML.replace(`[[${valueReplace}]]`, cv[valueReplace]);
        });
    });
}

function getMatches(element) {
    const regex = /\[\[(.*?)\]\]/g;
    const matches = [];
    let match;
    while ((match = regex.exec(element.innerHTML)) !== null) {
        matches.push(match[1]);
    }

    return matches;
}