import classes from './spinner.module.scss'

export default function Spinner() {
  return (
    <div className={classes.spinner} data-testid="spinner">
      <div className={classes.spinnerInner} />
      <div className={classes.spinnerInner} />
    </div>
  )
}
