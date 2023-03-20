import { useState } from 'react'
import './App.css'

function App() {

  let Griddim = 20

  let matrix = [];
  for (let i = 0; i < Griddim; i++) {
    matrix[i] = [];
    for (let j = 0; j < Griddim; j++) {
      matrix[i][j] = 0;
    }
  }

  const colorCode = {
    0: "green",
    1: "pink",
    2: "red",
    3: "purple",
    4: "blue"
  }

  const [grid, setGrid] = useState(matrix)


  const [start, setStart] = useState(false)
  const [currentStart, setCurrentStart] = useState()

  const [end, setEnd] = useState(false)
  const [currentEnd, setCurrentEnd] = useState()

  const [obstacles, setObstacles] = useState(false)

  const handleGridClick = (idx, idx2) => {
    if (start) {
      var newGrid = [...grid]
      newGrid[idx][idx2] = 2
      if (currentStart) {
        newGrid[currentStart[0]][currentStart[1]] = 0
      }
      setGrid(newGrid)
      setCurrentStart([idx, idx2])
      setStart(false)
    }
    else if (end) {
      var newGrid = [...grid]
      newGrid[idx][idx2] = 3
      if (currentEnd) {
        newGrid[currentEnd[0]][currentEnd[1]] = 0
      }
      setGrid(newGrid)
      setCurrentEnd([idx, idx2])
      setEnd(false)
    }
  }

  const handleGridMouseDown = (e, idx, idx2) => {
    if (e.buttons === 1) {
      if (obstacles) {
        var newGrid = [...grid]
        newGrid[idx][idx2] = 1
        setGrid(newGrid)
      }
    }
  }

  const getAdjacentNodes = (x, y) => {
    var adjacents = []
    for (var i = x - 1; i < x + 2; i++) {
      if (i < 0 || i > Griddim - 1) { continue }
      for (var j = y - 1; j < y + 2; j++) {
        if (j < 0 || j > Griddim - 1) { continue }
        if (grid[i][j] === 0) {
          console.log(i,j);
          adjacents.push([i][j])
        }
      }
    }
    return adjacents
  }

  const findPathDj = (e) => {
    var found = false
    const dist = []
    for (var i = 0; i < Griddim; i++) {
      dist[i] = []
      for (var j = 0; j < Griddim; j++) {
        dist[i][j] = -1
      }
    }
    dist[currentStart[0]][currentStart[1]] = 0
    var ptr = currentStart
    while (!found) {
      console.log(getAdjacentNodes(ptr[0], ptr[1]));
      break;
    }
  }

  return (
    <div className="App">
      <div>
        <button className={start ? "selected" : ""} onClick={
          (e) => {
            setStart(!start)
          }
        }>Select start point</button>

        <button className={end ? "selected" : ""} onClick={
          (e) => {
            setEnd(!end)
          }
        }>Select end point</button>

        <button className={obstacles ? "selected" : ""} onClick={
          (e) => {
            setObstacles(!obstacles)
          }
        }>Draw obstacles</button>
      </div>
      {grid.map((val, idx) => {
        return (
          <div key={idx} style={{}}>
            {
              val.map((val2, idx2) => {
                return (
                  <div onMouseOver={(e) => handleGridMouseDown(e, idx, idx2)} onClick={(e) => handleGridClick(idx, idx2)} key={idx2} style={{ float: "left", border: "1px solid white", padding: "12px", backgroundColor: colorCode[grid[idx][idx2]] }}>

                  </div>
                )
              })
            }
          </div>
        )
      })}
      <div><br />
        <button onClick={findPathDj} disabled={(!(currentStart && currentEnd))}>Find Path</button>
      </div>

    </div>
  )
}

export default App
