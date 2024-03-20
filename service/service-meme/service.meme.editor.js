'use strict'

const STORAGE_KEY_IMG = 'gImgsDB'
const STORAGE_KEY_MEMES = 'gMemesDB'
const STORAGE_KEY_MEME = 'gMemeDB'

var gImgs
var gMemes = []
_createImgs()
_createMemes()


var gImgIdx
var gMeme

var gMemeIdx

function updateGMemeIdx(imgId) {
    gMemeIdx = imgId

}


function getMeme() {
    // gMemes[imgId] = gMeme
    // console.log('gMemesssss:', gMeme)

    return gMeme
}


function getMemeIdx() {
    return gMemeIdx

}

function addLine(idx, currLineText, txt, size, color, bgColor) {
    // gMeme.selectedLineIdx = currLineText
    console.log('gMeme.lines:', gMeme.lines)
    gMeme.lines.push(_creaetLine(txt, size, color, bgColor))
    console.log('gMeme:', gMeme)

    _saveMeme()

}

// _filterMeme()
// function _filterMeme(){
//     gMemes.filter(meme => )

// }

function getMemes() {
    console.log('gMemes:', gMemes)
    return gMemes
}



function setLineTxt(text) {
    var { lines } = gMeme
    console.log('text:', text)
    console.log('lines[0].txt:', lines[0].txt)

    lines[0].txt = text
}


function setImg(elImg, imgId) {
    resizeCanvas()
    coverCanvasWithImg(elImg, imgId)

    onInitCanva()
    renderMeme()

    console.log('gMeme:', gMeme)
    _saveMeme()


}

function removeText() {
    gMemes

}


function increaseText(fontSize, lineNum = 0) {
    var { lines } = gMeme
    lines[lineNum].size = fontSize

}


function decreaseText(fontSize, lineNum = 0) {
    var { lines } = gMeme
    lines[lineNum].size = fontSize

}

function colorPicker(txtColor, lineNum = 0) {
    console.log('gMeme:', gMeme)
    var { lines } = gMeme
    lines[lineNum].color = txtColor

    // var {color} = lines[lineNum]
    // console.log('lines:', lines)

    // console.log('txt:', color)

}


function bgColorPicker(bgColor, lineNum = 0) {
    var { lines } = gMeme
    lines[lineNum].bgColor = bgColor

}

// MODEL Function

// ()
// function getLineIdx(lineIdx){
//     var { lines } = gMeme
//     var text = lines[lineIdx].txt






// }

function getMemeById(memeId) {
    var meme = gMemes.find(meme => memeId === meme.selectedImgId)
    _saveMeme()
    return meme
}

var gNextId = 0



// CANVAS Function
function resizeCanvas() {
    const elCanvasContainer = document.querySelector('.main-canvas')
    gElCanvas.width = elCanvasContainer.clientWidth
}

function coverCanvasWithImg(elImg, imgId) {

    console.log('elImg:', elImg)
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width



    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

}

function getDrawText() {


}



////////////////////////
function _createImgs() {
    gImgs = loadFromStorage(STORAGE_KEY_IMG)
    if (gImgs) return

    gImgs = [
        { id: 1, url: 'img/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] },
        { id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords: ['happy', 'dog'] },
        { id: 3, url: 'img/meme-imgs (square)/3.jpg', keywords: ['baby', 'dot'] },
        { id: 4, url: 'img/meme-imgs (square)/4.jpg', keywords: ['cuteness', 'cat'] },
        { id: 5, url: 'img/meme-imgs (square)/5.jpg', keywords: ['funny', 'baby'] },
        { id: 6, url: 'img/meme-imgs (square)/6.jpg', keywords: ['crazy', 'cat'] },
        { id: 7, url: 'img/meme-imgs (square)/7.jpg', keywords: ['funny', 'baby'] },
        // { id: 11, url: 'img/meme-imgs (square)/8.jpg', keywords: ['funny', 'happy'] },
        // { id: 12, url: 'img/meme-imgs (square)/9.jpg', keywords: ['funny', 'baby'] },
        // { id: 13, url: 'img/meme-imgs (square)/10.jpg', keywords: ['funny', 'happy'] },
        // { id: 14, url: 'img/meme-imgs (square)/11.jpg', keywords: ['happy', 'sarcastic'] },
        // { id: 15, url: 'img/meme-imgs (square)/12.jpg', keywords: ['funny', 'crazy'] },
        // { id: 16, url: 'img/meme-imgs (square)/13.jpg', keywords: ['sarcastic', 'crazy'] },
        // { id: 17, url: 'img/meme-imgs (square)/14.jpg', keywords: ['sad', 'crazy'] },
        // { id: 18, url: 'img/meme-imgs (square)/15.jpg', keywords: ['happy', 'sarcastic'] },
        // { id: 19, url: 'img/meme-imgs (square)/16.jpg', keywords: ['funny', 'happy'] },
        // { id: 20, url: 'img/meme-imgs (square)/17.jpg', keywords: ['funny', 'crazy'] },
        // { id: 21, url: 'img/meme-imgs (square)/18.jpg', keywords: ['sarcastic', 'sad'] },
        // { id: 2, url: 'img/meme-imgs (various aspect ratios)/2.jpg', keywords: ['funny', 'cat'] },
        // { id: 3, url: 'img/meme-imgs (various aspect ratios)/img6.jpg', keywords: ['funny', 'cat'] },
        { id: 8, url: 'img/meme-imgs (various aspect ratios)/5.jpg', keywords: ['funny', 'cat'] },
    ]

    _saveImgs()
}

function _createMemes() {
    gImgs.forEach((img, idx) => gMemes.push(_createMeme(img.id, idx)))
    _saveMemes()

}


function _createMeme(imgId, imgIdx, lineIdx = 0) {
    return {
        selectedImgId: imgId,
        selectedLineIdx: lineIdx,
        memeImg: gImgs[imgIdx],
        lines: [
            {
                txt: `I sometimes eat Falafel `,
                size: 20,
                color: 'red',
                bgColor: 'red'
            }
        ]
    }

}


function _creaetLine(txt = 'I sometimes eat Falafelxxx', size = 20, color = 'red', bgColor = 'red') {
    return {
        txt: txt,
        size: size,
        color: color,
        bgColor: bgColor
    };
}


// _createImg(img.id, img.url, img.keywords)
function _createImg(id, url, keywords) {
    return {
        id: id,
        url: `${url}`,
        keywords: keywords
    }
}


















function _saveImgs() {
    saveToStorage(STORAGE_KEY_IMG, gImgs)
}

function _saveMemes() {
    saveToStorage(STORAGE_KEY_MEMES, gMemes)
}

function _saveMeme() {
    saveToStorage(STORAGE_KEY_MEME, gMeme)
}

console.log('gImgs:', gImgs)
console.log('gMemes:', gMemes)
console.log('gMeme:', gMeme)