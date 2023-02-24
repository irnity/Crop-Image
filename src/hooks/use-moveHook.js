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

  function TouchmoveDrawing(e) {
    if (!isMouseDragging) {
      return
    }
    e.preventDefault()
    // right
    if (e.touches[0].clientX > olxX) {
      setXPosition((prevState) => prevState + 4)
      setPreviousX(e.touches[0].clientX)
      // left
    } else if (e.touches[0].clientX < olxX) {
      setXPosition((prevState) => prevState - 4)
      setPreviousX(e.touches[0].clientX)
    }

    // up
    if (e.touches[0].clientY > olxY) {
      setYPosition((prevState) => prevState + 4)
      setPreviousY(e.touches[0].clientY)
      // down
    } else if (e.touches[0].clientY < olxY) {
      setYPosition((prevState) => prevState - 4)
      setPreviousY(e.touches[0].clientY)
    }
  }

  // change state of moving
  const finishDrawing = () => {
    setIsMouseDragging(false)
  }

  const changePosition = (x, y) => {
    setXPosition(x)
    setYPosition(y)
  }

  return {
    xPosition,
    yPosition,

    TouchmoveDrawing,

    changePosition,
    startDrawing,
    move,
    finishDrawing,
  }
}

export default useMove
