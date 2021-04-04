window.onload = () => {
  outputInput('inputField', 'outputField')
}

function O(i) {
  return document.getElementById(i)
}

O('inputField').addEventListener('input', () => outputInput('inputField', 'outputField'))

/**
 * Ta input, prosesser det og lim inn i output
 * @param {*} input 
 * @param {*} output 
 */
function outputInput(input, output) {
  var text = O(input).value
  const processedText = processText(text)
  O(output).innerHTML = processedText
}

function processText(text) {
  const superArray = text.split('\n')
  var j = superArray.length
  var line = ''
  while (--j) {
    checkLineAndReplace(j, superArray, line)
  }
  checkLineAndReplace(0, superArray, line)

  const processedText = superArray.join(" ")
  return processedText
}

function checkLineAndReplace(j, superArray, line) {
  line = superArray[j]
  var nextLine = ''
  if (superArray[j + 1] != undefined) {
    nextLine = superArray[j + 1]
  }

  if (line.includes('[nodemon]')) {
    // linjer som inneholder [nodemon] skal fargelegges med én farge
    if (line.includes('restarting due') || line.includes('starting `node')) {
      superArray[j] = `<br><span class="green">${line}</span>`
    }
    else if (line.includes('2.') || line.includes('to restart') || line.includes('watching')) {
      superArray[j] = `<br><span class="yellow">${line}</span>`
    }
    else if (line.includes('app crashed')) {
      superArray[j] = `<br><span class="red">${line}</span>`
    }
    else {
      superArray[j] = `<br>${line}`
    }
  }
  else {
    var wordsAndColors = ''
    if (line.includes('/c')) {
      if (nextLine != '') {
        const nextLineSubArray = nextLine.split(" ")
        if (nextLineSubArray[0] == '<br>$') {
          // Dette er startlinjen, fargelegg hele grønn (etterpå fargelegges MINGW64/MSYS og path og branch oppå der igjen)
          superArray[j] = `<br><span class="green"> ${line}</span>` // MÅ ha et mellomrom mellom class="green"> og ${line} for at class="green" ikke skal bli en del av krøllafla ordet
          var line = superArray[j]
          wordsAndColors = {
            'MINGW64': 'purple',
            'MSYS': 'purple',
            '/c': 'yellow',
            '(': 'blue'
          }
          // var wordsToColor = {'MINGW64': 'purple'} // kanskje la dette erstatte noe av det i forAnyLinecolorTheseWords
        }
      }
    }
    if (line.includes('test.js') && line.includes('(') && line.includes(')')) {
      wordsAndColors = {
        'PASS': 'gray bg-green padding-sides',
        'FAIL': 'gray bg-red padding-sides'
      }
    }
    else if ((line.includes('√') || line.includes('×')) && line.includes('ms')) {
      wordsAndColors = {
        '√': 'green',
        '×': 'red'
      }
    }
    forThisLineColorTheseWords(wordsAndColors, line, superArray, j)

    line = superArray[j]
    const subArray = line.split(" ")
    var i = subArray.length
    var word = ''
    while (--i) {
      forAnyLinecolorTheseWords(i, subArray, word)
    }
    forAnyLinecolorTheseWords(0, subArray, word)
    superArray[j] = subArray.join(" ")
  }
}

function forThisLineColorTheseWords(wordsAndColors, line, superArray, j) {
  const entries = Object.entries(wordsAndColors)
  var lineSubArray = line.split(" ")
  for (let x = 0; x < lineSubArray.length; x++) {
    for (let i = 0; i < entries.length; i++) {
      if (lineSubArray[x].includes(entries[i][0])) {
        lineSubArray[x] = `<span class='${entries[i][1]}'>${lineSubArray[x]}</span>`
      }
    }
    var coloredLine = lineSubArray.join(' ')
    superArray.splice(j, 1, coloredLine)
  }
}

function forAnyLinecolorTheseWords(i, subArray, word) {
  word = subArray[i]
  const prevWord = subArray[i - 1]
  const nextWord = subArray[i + 1]
  if (word == 'free' || word == 'CLEARDB_DATABASE_URL') {
    subArray[i] = `<span class="green">${word}</span>`
  }
  if (word.includes('cleardb-rugged')) {
    subArray[i] = `<span class="yellow">${word}</span>`
  }
  if (word.includes('(') && word.includes(')') && prevWord.substring(0, 2) == '/c' || word == 'heroku' && prevWord == 'Use' || word == 'addons:docs' && prevWord == 'heroku' || word == 'cleardb' && prevWord == 'addons:docs') {
    subArray[i] = `<span class="blue">${word}</span>`
  }
  if (word == '⬢' || prevWord == '⬢') {
    subArray[i] = `<span class="lightpurple">${word}</span>`
  }
  if (i == 0) {
    word = subArray[i]
    subArray[i] = `<br>${word}`
  }
}

O('trashButton').addEventListener('click', () => {
  O('inputField').value = ''
  outputInput('inputField', 'outputField')
})

// brukte denne til denne løsningen
// https://codereview.stackexchange.com/questions/6347/better-find-and-highlight-implementation-in-html-element
