import classes from "./DownloadButton.module.css"

function DownloadButton(props) {
  return (
    <button className={classes.download} onClick={props.handler}>
      Download Image
    </button>
  )
}

export default DownloadButton
