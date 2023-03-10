import { useState } from "react"

const useSize = () => {
  const [size, setSize] = useState(600)

  // change state by input
  const sizeHandler = (e) => {
    setSize(parseInt(e.target.value))
  }

  // change state by mouse wheel
  const sizeByWheelHandler = (e) => {
    // wheel up
    if (e.deltaY <= 0 && size < 1000) {
      setSize((prevState) => prevState + 10)
    }

    // wheel down
    if (e.deltaY >= 0 && size > 200) {
      setSize((prevState) => prevState - 10)
    }
  }

  return { size, sizeHandler, sizeByWheelHandler }
}

export default useSize
