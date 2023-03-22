const buttonInit = document.querySelector('#btn-init') as HTMLButtonElement
const modal = document.querySelector('#modal') as HTMLDialogElement
const formModal = document.querySelector('#form-game') as HTMLFormElement
const player1Input = document.querySelector('#player-1') as HTMLInputElement
const player2Input = document.querySelector('#player-2') as HTMLInputElement
const messageError = document.querySelector('#form-error') as HTMLSpanElement
const closeModal = document.querySelector('#btn-close') as HTMLButtonElement
const restartGame = document.querySelector(
  '#btn-game-restart'
) as HTMLButtonElement
const finishGame = document.querySelector('#btn-finish') as HTMLButtonElement
const playerNameTarget = document.querySelector(
  '#game-playerName'
) as HTMLSpanElement
const squares = document.querySelectorAll<HTMLDivElement>('[data-square]')
const restartGameIcon = document.querySelector(
  '#restart-game-icon'
) as HTMLSpanElement
const resultModal = document.querySelector('#modal-result') as HTMLDialogElement
const playerNameResultTarget = document.querySelector(
  '#game-win-playerName'
) as HTMLParagraphElement
const closeResultModal = document.querySelector(
  '#btn-result-close'
) as HTMLButtonElement

let playerTurn = ''

const winingCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const players = {
  player1: {
    name: player1Input.value,
    score: 0,
  },
  player2: {
    name: player2Input.value,
    score: 0,
  },
}

//* Abre o modal através do botão

buttonInit.addEventListener('click', () => {
  modal.showModal()
})

//* Fecha modal através do botão

closeModal.addEventListener('click', () => {
  modal.close()
})

restartGame.addEventListener('click', () => {
  location.reload()
  resultModal.close()
})

closeResultModal.addEventListener('click', () => {
  resultModal.close()
})

finishGame.addEventListener('click', () => {
  window.close()
})

restartGameIcon.addEventListener('click', () => {
  location.reload()
})

//* Mostrar mensagem de erro

formModal.addEventListener('submit', (event) => {
  event.preventDefault()
  messageError.innerText = ''

  if (!player1Input.value || !player2Input.value) {
    messageError.innerText = 'Preencha todos os campos!'
    return
  }

  //* Captura o valor passado no input

  players.player1.name = player1Input.value
  players.player2.name = player2Input.value

  //* Mostra cada um dos jogadores a cada vez

  playerTurn = players.player1.name
  playerNameTarget.innerText = playerTurn

  modal.close()

  squares.forEach((square) => {
    square.addEventListener('click', handleClickSquare, { once: true })
  })
})

function modalScore() {
  resultModal.show()
  playerNameResultTarget.innerText = playerTurn
}

function handleClickSquare(this: HTMLDivElement) {
  const isWin = checkForWin(playerTurn)
  if (isWin) return

  const icon = document.createElement('span')

  if (playerTurn === players.player1.name) {
    icon.classList.add('ri-close-line')
    icon.setAttribute('data-markedBy', playerTurn)
    this.appendChild(icon)

    const isWin = checkForWin(playerTurn)
    if (isWin) {
      modalScore()
    }
    playerTurn = players.player2.name
    playerNameTarget.innerText = playerTurn
  } else {
    icon.classList.add('ri-checkbox-blank-circle-line')
    icon.setAttribute('data-markedBy', playerTurn)
    this.appendChild(icon)

    const isWin = checkForWin(playerTurn)
    if (isWin) {
      modalScore()
    }
    playerTurn = players.player1.name
    playerNameTarget.innerText = playerTurn
  }
}

const checkForWin = (currentPlayer: string) => {
  const result = winingCombinations.some((combination) => {
    return combination.every((index) => {
      return (
        squares[index].firstElementChild?.getAttribute('data-markedBy') ===
        currentPlayer
      )
    })
  })

  return result
}

export {}
