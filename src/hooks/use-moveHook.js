import { useState } from "react"

const useMove = () => {
  const [isMouseDragging, setIsMouseDragging] = useState(false)

  const [xPosition, setXPosition] = useState(0)
  const [olxX, setPreviousX] = useState(0)

  const [yPosition, setYPosition] = useState(0)
  const [olxY, setPreviousY] = useState(0)

  const [ePosition, setEPosition] = useState(80)
  const [fPosition, setFPosition] = useState(35)

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

  const changePosition = async () => {
    // need delay image have time to move
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    setXPosition((prevState) => prevState - 75)
    setYPosition((prevState) => prevState - 35)
    setEPosition(0)
    setFPosition(0)

    // delay = savehook delay + delay
    await delay(275)

    setXPosition((prevState) => prevState + 75)
    setYPosition((prevState) => prevState + 35)
    setEPosition(80)
    setFPosition(35)
  }

  return {
    ePosition,
    fPosition,
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
