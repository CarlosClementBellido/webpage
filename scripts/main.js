"use strict";

import cv from '../cv.json' assert { type: 'json' };

window.onload = () => {
    replaceSingleStrings();
    createTemplates();
    startIgAnimation();
    createListFunctionalities();
};

//#region Ig animation

let posts;
let currentIndex = 0;

function showNextPost() {
    const previousIndex = currentIndex;
    currentIndex = (currentIndex + 1) % posts.length;
    posts[previousIndex].classList.remove('active');
    posts[currentIndex].classList.add('active');

    if (posts[currentIndex].parentElement.offsetHeight < posts[currentIndex].offsetHeight)
        posts[currentIndex].parentElement.style.height = `${posts[currentIndex].offsetHeight}px`;
}

function startIgAnimation() {
    posts = document.querySelectorAll('.t.post');
    showNextPost();
    showNextPost();
    setInterval(showNextPost, 10000);
}

//#endregion Ig animation

//#region Template creation and string substitution

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
    while ((match = regex.exec(element.outerHTML)) !== null) {
        matches.push(match[1]);
    }

    return matches;
}

//#endregion Template creation and string substitution

//#region List functionalities creation

function createListFunctionalities() {
    const commentsHover = document.querySelectorAll(".comment-hover");

    Array.from(commentsHover).forEach(commentHover => {
        const comment = commentHover.querySelector(".comment");
        const closeButton = comment.querySelector(".close-comment");


        closeButton.addEventListener("click", () => {
            comment.classList.remove("active");
            closeButton.classList.remove("active");            
        });

        commentHover.addEventListener("click", (event) => {
            if (event.target.classList.contains("comment-hover")) {
                const activeComments = document.querySelectorAll(".comment.active");
                Array.from(activeComments).forEach(activeComment => {
                    activeComment.classList.remove("active");
                    activeComment.querySelector(".close-comment").classList.remove("active");
                });

                comment.classList.add("active");
                closeButton.classList.add("active");
            }
        });

    });
}

//#endregion List functionalities creation