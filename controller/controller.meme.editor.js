'use strict'

var gElCanvas
var gCtx
var gCurrLines

var gQueryPreferences = {
    memeIdx:0,
    lineCount:1,
    lineIdx:0,
    currLineText:'',
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
}

function onInputText(elInput){
    console.log('elInput:', elInput)
    var {selectedImgId, selectedLineIdx, lines} = gMeme

    gQueryPreferences.currLineText = elInput.value

    console.log('selectedImgId:', selectedImgId)

    saveLine(elInput.value)
    gMemes[selectedImgId].lines.txt = elInput.value
    
    gMeme = getMemeById(selectedImgId)
    console.log('gMeme:', gMeme)
    
    setLineTxt(elInput.value)
    console.log('gMeme:', gMeme)

    renderMeme()

}

function renderHtmlButtons(){
    // console.log('gMemeIdx:', gMemeIdx)
    // var memeIdx = findMemeIdx()
    // var memeIdx = findMemeIdx()
    // console.log('memeIdx:', memeIdx)
    // console.log('meme:', meme)
    // console.log('memeIdx:', memeIdx)
    // console.log('meme.selectedImgId:', meme[0].selectedImgId)
    const elEditorTools = document.querySelector('.editor-tools')
    console.log('gMemeIdx:', gMemeIdx)

    elEditorTools.innerHTML = `
    <label for="text"></label>
    <input type="text" id="name" placeholder="Text Here" oninput="onInputText(this, ${gMemeIdx})">

    <div class="">
        <button class="switch-text"><i class="fa-solid fa-arrow-up"> <i
                    class="fa-solid fa-arrow-down"></i></i></button>
        <button class="add-text" onclick="onAddLine(this, ${gMemeIdx})"><i class="fa-solid fa-plus"></i></button>
        <button class="remove-text" onclick="onRemoveText(this, ${gMemeIdx})"><i class="fa-regular fa-trash-can"></i></button>
    </div>

    <div class="">
        <button class="text-growth" onclick="onIncreaseText(this)"><i class="fa-solid fa-font"></i><i
                class="fa-solid fa-plus"></i></i></button>
        <button class="reduce-text" onclick="onDecreaseText(this)"><i class="fa-solid fa-font"></i><i class="fa-solid fa-minus"></i></button>
        <button class="ltr-text"><i class="fa-solid fa-align-left"></i></i></button>
        <button class="center-text"><i class="fa-solid fa-align-center"></i></button>
        <button class="rtl-text"><i class="fa-solid fa-align-right"></i></button>
        <select name="font" id="">font</select>

        <label for="text-color-border">
            <input type="color" id="text-color-border" name="text-color-border" onchange="onBgColorPicker(this)">
            <!-- <i class="fa-solid fa-brush"></i> -->
        </label>

        <label for="text-color">
            <input type="color" id="text-color" name="text-color" onchange="onColorPicker(this)">
            <!-- <i class="fa-solid fa-brush"></i> -->
        </label>

    </div>

    <div class="">
        <button class="save-meme-button"><i class="fa-solid fa-download"></i>Save</button>
        <button class="share-meme-button"><i class="fa-solid fa-share"></i>Share</button>
        
        <a href="" onclick="onDownLoadCanvas(this)" download="file-name">Download</a>
    </div>
    `

    console.log('elEditorTools:',elEditorTools )
    // <button class="download-meme-button" onclick="onDownLoadCanvas(this)"><a href="" download="file-name"></a><i class="fa-solid fa-floppy-disk"></i>Download</button>

}





function saveLine(val){
    saveToStorage('DB__CurrLine', val)
    
    
}




/// MAYBE NEW LINE FETUER
function onSetLineTxt(el,idx = 0) {
    
    // setLineTxt(el.value,idx)

    // document.querySelector('').value = el.value
   
    _onDrawText()

}

function _onDrawText() {
    
    var { selectedLineIdx, lines } = gMeme
    console.log('lines:', lines)
    

    const text = lines[0].txt
    

    gCtx.fillStyle = lines[selectedLineIdx].color
    gCtx.font = `${lines[selectedLineIdx].size}px Ariel`

    gCtx.fillText(text, 50, 50)
    gCtx.strokeText(text, 50, 50)

    console.log('gCtx:', gCtx)
    
}



function renderMeme() {
    if (!gMeme) return
    // if (!gQueryPreferences.memeIdx)
    // gQueryPreferences.memeIdx = getMemeIdx()
    
    var {selectedImgId, selectedLineIdx, lines} = gMeme
    console.log('gMeme:', gMeme)
    // console.log('selectedImgId:', selectedImgId)
    // console.log('gImgIdx:', gImgIdx)

    const img = new Image()
    img.src = `img/meme-imgs (square)/${selectedImgId}.jpg`

    img.onload = () => {
        
          gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        //   console.log('line:', line)
        for(var i = 0; i < lines.length; i++){
        
            const text = lines[i].txt
            gCtx.fillStyle = lines[i].color
            gCtx.strokeStyle  = lines[i].bgColor
            gCtx.font = `${lines[i].size}px Ariel`
  
           gCtx.fillText(text, 50, 50)
           gCtx.strokeText(text, 50, 50)
        }
          
        //   gMeme.lines.forEach(line => {
           
        //   })
          
    }

    // resizeCanvas()
    // coverCanvasWithImg(elImg, selectedImgId)
    
}

function resizeCanvas() {
    const elCanvasContainer = document.querySelector('.main-canvas')
    gElCanvas.width = elCanvasContainer.clientWidth

   
}




function onRemoveText(elText, memmIdx){
    console.log('elText:', elText)
    console.log('memmIdx:', memmIdx)
    console.log('gMeme:', gMeme)
    // gMeme.lines.txt = ''
    removeText()

}

// var gQueryPreferences = {
//     memeIdx:0,
//     lineCount:0,
//     lineIdx:1,
//     currLineText:'',
//     fontSize: 20,
//     txtAlign: null,
//     txtFont: null,
//     txtColor: null,
//     bgColor: null
// }

function onAddLine(el, idx){
    

    // var {txtLineCount} = gQueryPreferences
    // var {txtLineCount} = gQueryPreferences
    var {currLineText, fontSize, txtColor , bgColor} = gQueryPreferences
   
    gQueryPreferences.lineIdx++
    gQueryPreferences.lineCount++

    console.log('el:', el)
    console.log('idx:', idx)
    console.log('gQueryPreferences:', gQueryPreferences)


    addLine(idx,currLineText, 'New TEXT', fontSize, txtColor, bgColor)
    renderMeme()

}


function onIncreaseText(elIncreaseText){
    var {fontSize} = gQueryPreferences
    // fontSize++
    gQueryPreferences.fontSize = ++fontSize 
    
    increaseText(fontSize)
    renderMeme()
}

function onDecreaseText(elIncreaseText){
    var {fontSize} = gQueryPreferences
    gQueryPreferences.fontSize = --fontSize
   
    decreaseText(fontSize)
    renderMeme()
}

function onColorPicker(elColorText){
    // console.log('elColorText:', elColorText)
    // console.log('elColorText.value:', elColorText.value)
    var {txtColor} = gQueryPreferences
    txtColor = elColorText.value
    console.log('gQueryPreferences:', gQueryPreferences)

    colorPicker(txtColor)

    renderMeme()


}


function onBgColorPicker(elBgColorText){
    var {bgColor} = gQueryPreferences
    bgColor = elBgColorText.value
    console.log('bgColor:', bgColor)

    bgColorPicker(bgColor)
    renderMeme()


}

function onDownLoadCanvas(elBtn){

    const dataUrl = gElCanvas.toDataURL()
    elBtn.href = dataUrl




}

// function drawImg(textLine) {
//     var meme = gMeme
//         console.log('meme:', meme)
    
//         var {selectedImgId, selectedLineIdx, lines} = meme
//         // lines[selectedLineIdx].txt = textLine
        

//     const img = new Image()
//     img.src = `img/meme-imgs (square)/${gCurrImgIdx}.jpg`

//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

//         // console.log('lines:', lines)
//         console.log('lines[selectedLineIdx]:', lines[selectedLineIdx])
        
        
//         gCurrLines = lines[selectedLineIdx].txt
//         console.log('gCurrLines:', gCurrLines)


//         // onDrawText()
//         // var {selectedImgId, selectedLineIdx, lines} = meme
//         // const text = gCurrLines
       

//         gCtx.fillStyle = lines[selectedLineIdx].color
//         gCtx.font = `${lines[selectedLineIdx].size}px Ariel`

//         gCtx.fillText(gCurrLines, 50, 50)
//         gCtx.strokeText(gCurrLines, 50, 50)
//     }

// }