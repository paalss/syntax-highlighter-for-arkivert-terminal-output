window.onload = () => {
  outputInput('outputField', 'inputField')
}
O('inputField').addEventListener('input', () => outputInput('outputField', 'inputField'))

function outputInput(output, input) {
  if (input == 'inputField') {
    var text = O(input).value
  } else {
    var text = O(input).innerHTML
  }
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
    if (line.includes('/c')) {
      if (nextLine != '') {
        const nextLineSubArray = nextLine.split(" ")
        if (nextLineSubArray[0] == '<br>$') {
          // må ha et mellomrom mellom class="green"> og ${line} for at class="green" ikke skal bli en del av krøllafla ordet
          superArray[j] = `<br><span class="green"> ${line}</span>`
          var line = superArray[j]
        }
      }
    }
    const subArray = line.split(" ")
    var i = subArray.length
    var word = ''
    while (--i) {
      checkWordAndReplace(i, subArray, word)
    }
    checkWordAndReplace(0, subArray, word)
    superArray[j] = subArray.join(" ")
  }
}

function checkWordAndReplace(i, subArray, word) {
  word = subArray[i]
  const prevWord = subArray[i - 1]
  const nextWord = subArray[i + 1]
  if (word.includes('@')) {
    subArray[i] = `<span class="green">${word}</span>`
  }
  if (word == 'free' || word == 'CLEARDB_DATABASE_URL') {
    subArray[i] = `<span class="green">${word}</span>`
  }
  if (word == 'MINGW64' || word == 'MSYS') {
    subArray[i] = `<span class="purple">${word}</span>`
  }
  if (word.substring(0, 2) == '/c' || word == 'cleardb-rugged-54627') {
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
  outputInput('outputField', 'inputField')
})

function O(i) {
  return document.getElementById(i)
}

// brukte denne til denne løsningen
// https://codereview.stackexchange.com/questions/6347/better-find-and-highlight-implementation-in-html-element
