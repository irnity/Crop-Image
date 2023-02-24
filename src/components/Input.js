import classes from "./Input.module.css"

function Input(props) {
  return (
    <div className={classes.setting}>
      <label className={classes.setting_input} htmlFor={props.name}>
        {props.name}
      </label>
      <input
        className={classes.setting_input}
        type="range"
        id={props.name}
        name={props.name}
        step={1 || props.step}
        min={props.min}
        value={props.size}
        max={props.max}
        onChange={props.handler}
      />
    </div>
  )
}

export default Input
