'use strict'

var gElCanvas
var gCtx
var gCurrLines

var gQueryPreferences = {
    memeIdx: 0,
    lineCount: 1,
    lineIdx: 0,
    currNextLineIdx: 0,
    currLineText: '',
    currLineTextWidth: null,
    linePlace: { x: null, y: null },
    fontSize: 20,
    txtAlign: null,
    txtFont: null,
    txtColor: null,
    bgColor: null
}

function onInitCanva() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
    renderHtmlButtons()

    window.addEventListener('resize', () => resizeCanvas())
    console.log('gMemeAAAAAAAAAAAAAAAAAAAAAAAAAAA1111:', gMeme)
}


function renderHtmlButtons() {

    const elEditorTools = document.querySelector('.editor-tools')
    console.log('gMemeIdx:', gMemeIdx)

    elEditorTools.innerHTML = `
    <label for="text"></label>
    <input class="text-input" type="text" id="name" placeholder="Text Here" oninput="onInputText(this, ${gMemeIdx})">

    <div class="main-button">
        <button class="select-text" onClick="onSelectline(event)"><i class="fa-solid fa-arrow-up"> <i
                    class="fa-solid fa-arrow-down"></i></i></button>
        <button class="add-text" onclick="onAddLine(this, ${gMemeIdx})"><i class="fa-solid fa-plus"></i></button>
        <button class="remove-text" onclick="onRemoveText(this, ${gMemeIdx})"><i class="fa-regular fa-trash-can"></i></button>
    </div>

    <div class="main-text-buttons">
         <div class="main-text-buttons-top">
            <button class="text-growth" onclick="onIncreaseText(this)"><i class="fa-solid fa-font"></i><i
                    class="fa-solid fa-plus"></i></i></button>
            <button class="reduce-text" onclick="onDecreaseText(this)"><i class="fa-solid fa-font"></i><i class="fa-solid fa-minus"></i></button>
            <button class="ltr-text"><i class="fa-solid fa-align-left"></i></i></button>
            <button class="center-text"><i class="fa-solid fa-align-center"></i></button>
            <button class="rtl-text"><i class="fa-solid fa-align-right"></i></button>
        
        
        </div>

        <div class="main-text-buttons-down">
        
         <select name="font" id="">font</select>
        
            <label for="text-color-border">
             <input type="color" class="text-bg-color-input" id="text-color-border" name="text-color-border" value="#46E5FB" onchange="onBgColorPicker(this)">
             <!-- <i class="fa-solid fa-brush"></i> -->
            </label>
        
            <label for="text-color">
             <input type="color" class="text-color-input" id="text-color" name="text-color" value="#46E5FB" onchange="onColorPicker(this)">
              <!-- <i class="fa-solid fa-brush"></i> -->
          </label>
        </div>

    </div>

    <div class="button-footer">
        <button class="save-meme-button"><i class="fa-solid fa-download"></i>Save</button>
        <button class="share-meme-button"><i class="fa-solid fa-share"></i>Share</button>
        
        <a href="" onclick="onDownLoadCanvas(this)" download="file-name">Download</a>
    </div>
    `

    // console.log('elEditorTools:',elEditorTools )
    // <button class="download-meme-button" onclick="onDownLoadCanvas(this)"><a href="" download="file-name"></a><i class="fa-solid fa-floppy-disk"></i>Download</button>

}




function renderMeme() {
    if (!gMeme) return
    var { selectedImgId, selectedLineIdx, lines } = gMeme

    const img = new Image()
    img.src = `img/meme-imgs (square)/${selectedImgId}.jpg`

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderLines()
    }
}


function renderLines() {
    // var widthLine = 50
    // var heightLine = 50

    console.log('gMeme:', gMeme)
    var line = getLineById()
    var meme = getMeme()
    console.log('meme:', meme)
    console.log('gMeme:', gMeme)
    console.log('line:', line)
    for (var i = 0; i < meme.lines.length; i++) {
        var x = (!meme.lines.length) ? 50 : (50 * (i + 1))
        var y = 50

        const text = meme.lines[i].txt
        console.log('meme.lines[i].color:', meme.lines[i].color)
        gCtx.fillStyle = meme.lines[i].color // updat text color 
        gCtx.strokeStyle = meme.lines[i].bgColor // update bg-color
        gCtx.font = `${meme.lines[i].size}px Ariel` // update the font size and font style
        gCtx.fillText(text, y, x) // print text on canvas
        gCtx.strokeText(text, y, x) // render text

        gQueryPreferences.linePlace.x = x
        gQueryPreferences.linePlace.y = y

        var elText = document.querySelector('.text-input').value = meme.lines[gQueryPreferences.lineIdx].txt

        document.querySelector('.text-color-input').value = meme.lines[gQueryPreferences.lineIdx].color
        document.querySelector('.text-bg-color-input').value = meme.lines[gQueryPreferences.lineIdx].bgColor

        setLineTxt(elText, gQueryPreferences.lineIdx, gQueryPreferences.linePlace.x, gQueryPreferences.linePlace.y)


        console.log('textaaaaaaaaaaasssssssssssssssssssss:', text)
        var textWidth = gCtx.measureText(text).width;
        console.log(textWidth);

        gQueryPreferences.currLineTextWidth = textWidth
        // _drawSquares(textWidth)

    }


}


function onSelectline(ev) {
    const { lineIdx } = gQueryPreferences
    getLineById(gQueryPreferences.lineIdx)
    
    if (gQueryPreferences.lineIdx === gQueryPreferences.lineCount - 1) {
        gQueryPreferences.lineIdx = 0
    } else {
        gQueryPreferences.lineIdx++
    }

    document.querySelector('.text-color-input').value = gMeme.lines[gQueryPreferences.lineIdx].color
    document.querySelector('.text-bg-color-input').value = gMeme.lines[gQueryPreferences.lineIdx].bgColor

    renderMeme()
}

function onInputText(elInput) {
    gQueryPreferences.currLineText = elInput.value

    saveLine(elInput.value, gQueryPreferences.lineIdx)
    setLineTxt(elInput.value, gQueryPreferences.lineIdx, gQueryPreferences.linePlace.x, gQueryPreferences.linePlace.y)
    renderMeme()
}


function _drawSquares(textWidth) {
    gCtx.moveTo(gQueryPreferences.linePlace.x - 10, gQueryPreferences.linePlace.y * 1.5);
    gCtx.lineTo(textWidth, gQueryPreferences.linePlace.y * 1.5);
    gCtx.stroke();


}

function resizeCanvas() {
    const elCanvasContainer = document.querySelector('.main-canvas')
    gElCanvas.width = elCanvasContainer.clientWidth


}


function onRemoveText(t,i) {
    removeText(gQueryPreferences.lineIdx)
    gQueryPreferences.lineIdx  -= 1
    
    renderMeme()
}

function onAddLine(el, idx) {
    // const meme = getMeme()
    // console.log('meme:', meme)
    gQueryPreferences.lineIdx = gQueryPreferences.lineCount - 1
    // console.log('gQueryPreferences.lineIdx:', gQueryPreferences.lineIdx)


    var { lineIdx, currLineText, fontSize, txtColor, bgColor } = gQueryPreferences
    // console.log('fontSizeWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW:', fontSize)


    gQueryPreferences.lineIdx++
    gQueryPreferences.lineCount++
    // gQueryPreferences.currNextLineIdx = gQueryPreferences.lineIdx +1


    // gQueryPreferences.fontSize = gMeme.lines[idx].size
    gQueryPreferences.linePlace.y += 20

    addLine(idx, currLineText, 'New TEXT', fontSize, txtColor, bgColor, gQueryPreferences.linePlace.x, gQueryPreferences.linePlace.y)
    renderMeme()
}

function onIncreaseText(elIncreaseText) {
    var { fontSize, lineIdx } = gQueryPreferences
    gQueryPreferences.fontSize = ++fontSize

    // gCtx.font = `${gQueryPreferences.fontSize}px Ariel`
    const memeSize = getMeme()
    gCtx.font = `${memeSize.lines[lineIdx].size}px Ariel`


    increaseText(fontSize, lineIdx)
    renderMeme()
}

function onDecreaseText(elIncreaseText) {
    var { fontSize, lineIdx } = gQueryPreferences
    gQueryPreferences.fontSize = --fontSize
    console.log('gQueryPreferences.fontSize:', gQueryPreferences.fontSize)
    
    // gCtx.font = `${gQueryPreferences.fontSize}px Ariel`
    const memeSize = getMeme()
    gCtx.font = `${memeSize.lines[lineIdx].size}px Ariel`

    decreaseText(gQueryPreferences.fontSize, lineIdx)
    renderMeme()
}

function onColorPicker(elColorText) {
    var { txtColor, lineIdx } = gQueryPreferences
    txtColor = elColorText.value

    colorPicker(txtColor, lineIdx)
    renderMeme()
}

function onBgColorPicker(elBgColorText) {
    var { bgColor, lineIdx } = gQueryPreferences
    bgColor = elBgColorText.value

    bgColorPicker(bgColor, lineIdx)
    renderMeme()
}

function onDownLoadCanvas(elBtn) {
    const dataUrl = gElCanvas.toDataURL()
    elBtn.href = dataUrl
}

function saveLine(val) {
    saveToStorage('DB__CurrLine', val)
}