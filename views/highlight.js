window.onload = () => output(osName)
Ogebi('input').addEventListener('input', () => output(osName))

const osName = document.currentScript.getAttribute('osName')

function output(osName) {
  const text = getText()
  const processedText = processText(text, osName)
  Ogebi('output').innerHTML = processedText
}

function getText() {
  return Ogebi('input').value
}

function processText(text, osName) {
  const superArray = text.split('\n')
  var j = superArray.length
  var line = ''
  while (--j) {
    checkLine(j, superArray, line, osName)
  }
  checkLine(0, superArray, line, osName)

  const processedText = superArray.join(" ")
  return processedText
}

function checkLine(j, superArray, line, osName) {
  line = superArray[j]
  const subArray = line.split(" ")
  var i = subArray.length
  var word = ''
  while (--i) {
    checkAndReplace(i, subArray, word, osName)
  }
  checkAndReplace(0, subArray, word, osName)
  superArray[j] = subArray.join(" ")
}

function checkAndReplace(i, subArray, word, osName) {
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
    } else {
      console.error('OS navn består av flere enn 3 ord. Har ikke lagd kode for slike tilfeller')
    }
  }
  if (word == 'free' || word == 'CLEARDB_DATABASE_URL') {
    subArray[i] = `<span class="green">${word}</span>`
  }
  if (word == 'MINGW64') {
    subArray[i] = `<span class="purple">${word}</span>`
  }
  if (word.substring(0, 2) == '/c' || word == 'cleardb-rugged-54627') {
    subArray[i] = `<span class="yellow">${word}</span>`
  }
  if (word == '(master)' || word == 'heroku' && prevWord == 'Use' || word == 'addons:docs' && prevWord == 'heroku' || word == 'cleardb' && prevWord == 'addons:docs') {
    subArray[i] = `<span class="blue">${word}</span>`
  }
  if (word == '⬢' || prevWord == '⬢') {
    subArray[i] = `<span class="lightpurple">${word}</span>`
  }
  if (i == 0) {
    subArray[i] = '<br>' + subArray[i]
  }
}

Ogebi('trashButton').addEventListener('click', () => {
  Ogebi('input').value = ''
  output(osName)
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