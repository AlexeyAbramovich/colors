const columns = document.querySelectorAll('.column')

document.addEventListener('keydown', (e) => {
  e.preventDefault()
  if (e.code.toLowerCase() === 'space') {
    setRandomeColors()
  }
})

document.addEventListener('click', (e) => {
  const type = e.target.dataset.type
  if (type === 'lock') {
    const node =
      e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0]
    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
    copyToClipboard(e.target.textContent)
  }
})

function generateRandomeColors() {
  const hexCodes = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
  }
  return '#' + color
}

function setRandomeColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : []
  columns.forEach((col, i) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock')
    const text = col.querySelector('h2')
    const btn = col.querySelector('button')
    if (isLocked) {
      colors.push(text.textContent)
      return
    }
    let color = isInitial
      ? colors
        ? colors[i]
        : chroma.random()
      : chroma.random()
    col.style.background = color
    text.textContent = color
    setTextColor(text, btn, color)
    if (!isInitial) {
      colors.push(color)
    }
  })
  updateColorsHash(colors)
}

function setTextColor(text, btn, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
  btn.style.color = luminance > 0.5 ? 'black' : 'white'
}

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text)
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((color) => color.toString().substring(1))
    .join('-')
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map((color) => '#' + color)
  }
}

setRandomeColors(true)
