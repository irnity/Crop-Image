const useOverFlow = () => {
  const scrollHandlerOn = () => {
    document.body.style.overflow = "hidden"
  }

  const scrollHandlerOff = () => {
    document.body.style.overflow = "auto"
  }
  return { scrollHandlerOn, scrollHandlerOff }
}

export default useOverFlow
