'use strict'
// var gMemeIdx

// ONLOAD DOM - body onload="onInit()"|| BUTTON DOM - onclick="onInitGallery()
function onInitGallery() {
    onInitCanva()
    renderGallery()

    document.querySelector('.gallery-section').classList.remove('hide')
    document.querySelector('.editor-section').classList.add('hide')
}

//Create and render Gallery HTMLTO DOM
function renderGallery() {
    var uploadImage = `<form class="flex align-center justify-center upload-image relative" onsubmit="onSaveImg(event)">
                 <label class="" for="upload">
                    <input type="file" name="upload" id="upload" onchange="handleFileUpload(event)">upload
                 </label>
                 <button class="save-button">Save</button></form>`
    var strHtml = gImgs.map(img => `
    <article class="id${img.id}">
        <img class="grid-item item${img.id}" 
        src="${img.url}" 
        onclick="onImageClicked(this,${img.id})">
    </article>
    `)
    document.querySelector('.gallery-grid-container').innerHTML = uploadImage + strHtml.join('')
    // console.log('strHtml:', strHtml)
    // console.log('uploadImage + strHtml.join', uploadImage + strHtml.join(''))
}

// Waiting for the user to click image from the gallery
function onImageClicked(elImg, imgId) {
    updateGMemeIdx(imgId)
    // gMemeIdx = imgId
    gMeme = getMemeById(imgId)
    // saveToStorage('DB__CurrLine', val)


    // console.log('gMemeIdx:', gMemeIdx)
    // console.log('gMeme:', gMeme)
    // console.log('gMeme:', gMeme)
    // console.log('elImg:', elImg)
    // console.log('imgId:', imgId)

    document.querySelector('.editor-section').classList.remove('hide')
    document.querySelector('.gallery-section').classList.add('hide')

    setImg(elImg, imgId)

    // resizeCanvas()
    // coverCanvasWithImg(elImg, imgId)

    // window.addEventListener('resize', () => resizeCanvas())

    // onInitCanva()
    // renderMeme()
}























/////////////////////


// function handleFileUpload(event) {
//     var file = event.target.files[0];
//     // כאן תוכל לעשות מה שתרצה עם הקובץ שנבחר, כמו להציג אותו או לשמורו ב-local storage
//     console.log('הקובץ שנבחר:', file);
// }


// function onSaveImg(ev) {
//     saveImg(ev)
// }



// function _hideGallery() {

// }