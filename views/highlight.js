const osName = document.currentScript.getAttribute('osName')

window.onload = () => {
  outputInput('outputField', 'inputField', osName)
  // outputInput('outputExampleField', 'inputExampleField', osName)
}
Ogebi('inputField').addEventListener('input', () => outputInput('outputField', 'inputField', osName))

function outputInput(output, input, osName) {
  if (input=='inputField') {
    var text = Ogebi(input).value 
  } else {
    var text = Ogebi(input).innerHTML
  }
  const processedText = processText(text, osName)
  Ogebi(output).innerHTML = processedText
}

function processText(text, osName) {
  const superArray = text.split('\n')
  var j = superArray.length
  var line = ''
  while (--j) {
    checkLineAndReplace(j, superArray, line, osName)
  }
  checkLineAndReplace(0, superArray, line, osName)

  const processedText = superArray.join(" ")
  return processedText
}

function checkLineAndReplace(j, superArray, line, osName) {
  line = superArray[j]
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
  } else {
    const subArray = line.split(" ")
    var i = subArray.length
    var word = ''
    while (--i) {
      checkWordAndReplace(i, subArray, word, osName)
    }
    checkWordAndReplace(0, subArray, word, osName)
    superArray[j] = subArray.join(" ")
  }
}

function checkWordAndReplace(i, subArray, word, osName) {
  word = subArray[i]
  const prevWord = subArray[i - 1]
  const nextWord = subArray[i + 1]

  const osNameArray = osName.split(" ")
  if (osNameArray.length == 1) {
    if (word.includes(osName + '@')) {
      // f.eks. ordet 'Pål@Asus-VivoBook' inneholder 'Pål@'
      subArray[i] = `<span class="green">${word}</span>`
    }
  } else {
    if (word == osNameArray[0]) {
      subArray[i] = `<span class="green">${word}</span>`
    }
    if (osNameArray.length == 2) {
      if (word.includes(osNameArray[1] + '@')) {
        // f.eks. ordet 'Stakvik@Asus-VivoBook' inneholder 'Stakvik@'
        subArray[i] = `<span class="green">${word}</span>`
      }
    } else if (osNameArray.length == 3) {
      if (word == osNameArray[1]) {
        // f.eks. ordet 'Syvertsen'
        subArray[i] = `<span class="green">${word}</span>`
      }
      if (word.includes(osNameArray[2] + '@')) {
        // f.eks. ordet 'Stakvik@Asus-VivoBook' inneholder 'Stakvik@'
        subArray[i] = `<span class="green">${word}</span>`
      }
    } else if (osNameArray.length > 3) {
      console.error('OS navn består av flere enn 3 ord. Har ikke lagd kode for slike tilfeller')
    }
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

Ogebi('trashButton').addEventListener('click', () => {
  Ogebi('inputField').value = ''
  outputInput('outputField', 'inputField', osName)
})

function Ogebi(i) {
  return document.getElementById(i)
  // return typeof i == 'object' ? i : document.getElementById(i)
}

// function Oqs(i) {
//   return i.substring(0, 1) == '#' ? document.getElementById(i) : document.querySelector(i)
// }

// const string = '#hei'
// const substring = string.substring(0, 1)



// brukte denne til denne løsningen
// https://codereview.stackexchange.com/questions/6347/better-find-and-highlight-implementation-in-html-element

// kanskje se på
// https://github.com/shikijs/shiki
// funnet etter å ha
// googlet 'github syntax highlighter'



// Forsøk på å splitte string til array både etter space og newlines.
// function processText(text) {
//   const array = text.split(' ')
//      const array = text.split(/" "|\\n/) // https://ibnuhx.com/regex-generator/?ref=madewithvuejs.com
//      const array = text.split([" "])
//      const array = text.split([" "]+["\n"])
//   var i = array.length
//   var word = ''
// ...