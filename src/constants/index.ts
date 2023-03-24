export const modal = document.querySelector('#modal') as HTMLDialogElement
export const formModal = document.querySelector('#form-game') as HTMLFormElement
export const player1Input = document.querySelector(
  '#player-1'
) as HTMLInputElement
export const player2Input = document.querySelector(
  '#player-2'
) as HTMLInputElement
export const messageError = document.querySelector(
  '#form-error'
) as HTMLSpanElement
export const closeModal = document.querySelector(
  '#btn-close'
) as HTMLButtonElement
export const restartGame = document.querySelector(
  '#btn-game-restart'
) as HTMLButtonElement
export const playerNameTarget = document.querySelector(
  '#game-playerName'
) as HTMLSpanElement
export const squares =
  document.querySelectorAll<HTMLDivElement>('[data-square]')
export const resultModal = document.querySelector(
  '#modal-result'
) as HTMLDialogElement
export const playerNameResultTarget = document.querySelector(
  '#game-win-playerName'
) as HTMLParagraphElement
export const closeResultModal = document.querySelector(
  '#btn-result-close'
) as HTMLButtonElement
