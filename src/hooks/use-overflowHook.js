const useOverFlow = () => {
  // hide scroll
  const scrollHandlerOn = () => {
    document.body.style.overflow = "hidden"
  }
  // show scroll
  const scrollHandlerOff = () => {
    document.body.style.overflow = "auto"
  }
  return { scrollHandlerOn, scrollHandlerOff }
}

export default useOverFlow
