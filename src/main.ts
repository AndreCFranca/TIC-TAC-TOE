import {
  closeModal,
  closeResultModal,
  formModal,
  messageError,
  modal,
  player1Input,
  player2Input,
  playerNameResultTarget,
  playerNameTarget,
  restartGame,
  resultModal,
  squares,
} from './constants'

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

window.addEventListener('DOMContentLoaded', () => {
  modal.showModal()
})

closeModal.addEventListener('click', () => {
  window.close()
})

restartGame.addEventListener('click', () => {
  clearGame()
  resultModal.close()
})

closeResultModal.addEventListener('click', () => {
  window.close()
})

const clearGame = () => {
  squares.forEach((square) => {
    square.firstElementChild?.remove()
    square.addEventListener('click', handleClickSquare, { once: true })
  })
  playerTurn = players.player1.name
}

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

function modalScore(message?: string) {
  resultModal.show()
  playerNameResultTarget.innerText = message ? message : playerTurn
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

  const isOver = checkItIsOver()
  if (isOver) {
    modalScore('Ninguém. Pois deu velha :(')
    return
  }
}

const checkItIsOver = () => {
  const totalSquares = squares.length
  let countMarked = 0

  squares.forEach((square) => {
    const marked = !!square.firstElementChild
    if (marked) {
      countMarked++
    }
  })

  if (countMarked === totalSquares) {
    return true
  }

  return false
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
