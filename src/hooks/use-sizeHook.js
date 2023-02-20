import { useState } from "react"

const useSize = () => {
  const [size, setSize] = useState(200)

  const sizeHandler = (e) => {
    setSize(e.target.value)
  }

  const sizeByWheelHandler = (e) => {
    // wheel up
    if (e.deltaY === -100 && size < 1000) {
      setSize((prevState) => prevState + 10)
    }
    // wheel down
    if (e.deltaY === 100 && size > 200) {
      setSize((prevState) => prevState - 10)
    }
  }

  return { size, sizeHandler, sizeByWheelHandler }
}

export default useSize
