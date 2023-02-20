import { useState } from "react"

const useMove = () => {
  const [isMouseDragging, setIsMouseDragging] = useState(false)
  const [xPosition, setXPosition] = useState(0)
  const [olxX, setPreviousX] = useState(0)
  const [yPosition, setYPosition] = useState(0)
  const [olxY, setPreviousY] = useState(0)

  // change state of moving
  const startDrawing = () => {
    setIsMouseDragging(true)
  }

  // move our image
  const move = ({ nativeEvent }) => {
    if (!isMouseDragging) {
      return
    }
    const { offsetX, offsetY } = nativeEvent

    // right
    if (offsetX > olxX) {
      setXPosition((prevState) => prevState + 4)
      setPreviousX(offsetX)
      // left
    } else if (offsetX < olxX) {
      setXPosition((prevState) => prevState - 4)
      setPreviousX(offsetX)
    }

    // up
    if (offsetY > olxY) {
      setYPosition((prevState) => prevState + 4)
      setPreviousY(offsetY)
      // down
    } else if (offsetY < olxY) {
      setYPosition((prevState) => prevState - 4)
      setPreviousY(offsetY)
    }
  }

  const changePosition = (x, y) => {
    setXPosition(x)
    setYPosition(y)
  }

  // change state of moving
  const finishDrawing = () => {
    setIsMouseDragging(false)
  }

  return {
    xPosition,
    yPosition,

    changePosition,
    startDrawing,
    move,
    finishDrawing,
  }
}

export default useMove
