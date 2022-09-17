import axios from 'axios'
import EventSource from 'eventsource'

export function connect4Solution(battleId: string) {
  const src = `https://cis2022-arena.herokuapp.com/connect4/play/${battleId}`
  const evtSource = new EventSource(
    `https://cis2022-arena.herokuapp.com/connect4/start/${battleId}`
  )

  const board: number[][] = Array(6)
    .fill(0)
    .map((_) => Array(7).fill(0))
  const columns = 'ABCDEFG'
  const addMoveToBoard = (column: string, player: number) => {
    const c = columns.indexOf(column)
    let placed = false
    for (let i = 5; !placed && i >= 0; i--) {
      if (board[i][c] !== 0) continue
      board[i][c] = player
      placed = true
    }
    return placed
  }
  /*
  const removeFromBoard = (column: string) => {
    const c = columns.indexOf(column)
    for (let i = 0; i < 6; i++) {
      if (board[i][c] === 0) continue
      board[i][c] = 0
      return
    }
  }
  */

  let myToken = ''

  const postMove = (column: string) => {
    axios
      .post(src, {
        action: 'putToken',
        column,
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const flipTable = () => {
    axios
      .post(src, {
        action: '(╯°□°)╯︵ ┻━┻',
      })
      .catch((err) => {
        console.log(err)
      })
  }

  type Message = {
    youAre: string
    id: string
    player: string
    action: string
    column: string
    winner: string
  }
  evtSource.onmessage = (event: MessageEvent<string>) => {
    const data = JSON.parse(event.data) as Message
    if (data.hasOwnProperty('youAre')) {
      // initial event
      myToken = data['youAre']
      if (myToken === '🔴') {
        addMoveToBoard('D', 1)
        postMove('D')
      }
    } else if (data.hasOwnProperty('player')) {
      if (data.action === 'putToken') {
        if (data.player !== myToken) {
          const valid = addMoveToBoard(data.column, -1)
          if (!valid) flipTable()
          else {
            for (let i = 0; i < 100; i++) {
              const column = columns[Math.floor(Math.random() * 7)]
              if (!addMoveToBoard(column, 1)) continue
              postMove(column)
            }
          }
        } else {
          // someone flip table
          /* do nothing */
        }
      }
    } else {
      console.log(event)
      evtSource.close()
    }
  }
}