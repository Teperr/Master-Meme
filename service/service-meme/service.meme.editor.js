'use strict'

const STORAGE_KEY_IMG = 'gImgsDB'
const STORAGE_KEY_MEMES = 'gMemesDB'
const STORAGE_KEY_MEME = 'gMemeDB'
const STORAGE_KEY_LINE = 'gLineDB'

var gImgs
var gMemes = []
_createImgs()
_createMemes()

var gImgIdx
var gMeme
var gCurrLine
var gMemeIdx

function updateGMemeIdx(imgId) {
    gMemeIdx = imgId

}

function getMemes() {
    console.log('gMemes:', gMemes)
    return gMemes
}

function getMeme() {
    return gMeme
}

function getMemeById(memeId) {
    var meme = gMemes.find(meme => memeId === meme.selectedImgId)
    _saveMeme()
    return meme
}

function addLine(idx, currLineText, txt, size, color, bgColor, x, y) {
    var line = _creaetLine(txt, size, color, bgColor, x, y)
    gMeme.lines.push(line)

    _saveMeme()
    _saveline()
    _saveMemes()
}


function getLineById(id) {
    return gMeme.lines[id]
}



function setLineTxt(text, lineIdx, x, y) {
    gMeme.lines[lineIdx].txt = text

    gMeme.lines[lineIdx].x = x
    gMeme.lines[lineIdx].y = y

    gMeme.lines[lineIdx].color = gMeme.lines[lineIdx].color
    gMeme.lines[lineIdx].bgColor = gMeme.lines[lineIdx].bgColor
    _saveMeme()
    _saveline()

}


function setImg(elImg, imgId) {
    console.log('gMemeAAAAAAAAAAAAAAAAAAAAAAAAAAA222222222:', gMeme)
    
    resizeCanvas()
    coverCanvasWithImg(elImg, imgId)


    onInitCanva()
    renderMeme()
    console.log('gMemeAAAAAAAAAAAAAAAAAAAAAAAAAAA2222:', gMeme)
    _saveMeme()
    _saveline()


}

function removeText(idx) {

    // var idx = gMeme.lines.findIndex(line => line.tex === elText)
    console.log('idx:', idx)
    gMeme.lines.splice(idx, 1)
    console.log(' gMeme.lines:',  gMeme.lines)
}


function increaseText(fontSize, lineNum = 0) {
    gMeme.lines[lineNum].size = fontSize
    _saveline()
}

function decreaseText(fontSize, lineNum = 0) {
    gMeme.lines[lineNum].size = fontSize
    _saveline()
}

function colorPicker(txtColor, lineNum = 0) {
    gMeme.lines[lineNum].color = txtColor
    _saveline()

}


function bgColorPicker(bgColor, lineNum = 0) {
    // var { lines } = gMeme
    // lines[lineNum].bgColor = bgColor
    gMeme.lines[lineNum].bgColor = bgColor

}


var gNextId = 0



// function resizeCanvas() {
//     const elCanvasContainer = document.querySelector('.main-canvas')
//     gElCanvas.width = elCanvasContainer.clientWidth
// }

function coverCanvasWithImg(elImg, imgId) {

    // console.log('elImg:', elImg)
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width



    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)


}

// Create Imgs ===============================================================================================
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
        { id: 8, url: 'img/meme-imgs (square)/8.jpg', keywords: ['funny', 'happy'] },
        { id: 9, url: 'img/meme-imgs (square)/9.jpg', keywords: ['funny', 'baby'] },
        { id: 10, url: 'img/meme-imgs (square)/10.jpg', keywords: ['funny', 'happy'] },
        { id: 11, url: 'img/meme-imgs (square)/11.jpg', keywords: ['happy', 'sarcastic'] },
        { id: 12, url: 'img/meme-imgs (square)/12.jpg', keywords: ['funny', 'crazy'] },
        { id: 13, url: 'img/meme-imgs (square)/13.jpg', keywords: ['sarcastic', 'crazy'] },
        { id: 14, url: 'img/meme-imgs (square)/14.jpg', keywords: ['sad', 'crazy'] },
        { id: 15, url: 'img/meme-imgs (square)/15.jpg', keywords: ['happy', 'sarcastic'] },
        { id: 16, url: 'img/meme-imgs (square)/16.jpg', keywords: ['funny', 'happy'] },
        { id: 17, url: 'img/meme-imgs (square)/17.jpg', keywords: ['funny', 'crazy'] },
        { id: 18, url: 'img/meme-imgs (square)/18.jpg', keywords: ['sarcastic', 'sad'] },
        { id: 19, url: 'img/meme-imgs (various aspect ratios)/5.jpg', keywords: ['funny', 'cat'] },
        { id: 20, url: 'img/meme-imgs (various aspect ratios)/2.jpg', keywords: ['funny', 'cat'] },
        { id: 21, url: 'img/meme-imgs (various aspect ratios)/img6.jpg', keywords: ['funny', 'cat'] },
    ]

    _saveImgs()
}

function _createImg(id, url, keywords) {
    return {
        id: id,
        url: `${url}`,
        keywords: keywords
    }
}

// Create Memes ===============================================================================================
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

            _creaetLine()

        ]
    }

}

// Create Line ===============================================================================================
function _creaetLine(txt, size, color, bgColor, x, y) {
    return {
        txt: txt = 'I sometimes eat Falafelxxx',
        size: size = 20,
        color: color = getRandomColor(),
        bgColor: bgColor = getRandomColor(),
        x: x = null,
        y: y = null,
    };
}

// Saves To Storage ===============================================================================================
function _saveImgs() {
    saveToStorage(STORAGE_KEY_IMG, gImgs)
}

function _saveMemes() {
    saveToStorage(STORAGE_KEY_MEMES, gMemes)
}

function _saveMeme() {
    saveToStorage(STORAGE_KEY_MEME, gMeme)
}

function _saveline() {
    saveToStorage(STORAGE_KEY_LINE, gMeme.lines[gQueryPreferences.lineIdx])
}

console.log('gImgs:', gImgs)
console.log('gMemes:', gMemes)
console.log('gMeme:', gMeme)