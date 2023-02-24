import { useState } from "react"

const useAngle = () => {
  const [angle, setAngle] = useState(0)

  // change angle of image if we change it move direction is changed to
  // that will make move top change to move left for example
  const angleHandler = (e) => {
    setAngle(parseInt(e.target.value))
  }

  return { angle, angleHandler }
}

export default useAngle
