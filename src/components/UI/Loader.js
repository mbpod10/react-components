import classes from "./Loader.module.css"

import React from 'react'

const Loader = () => {
  return (
    <div className={classes.loaderDiv}>
      <div className={classes.loader}></div>
    </div>
  )
}

export default Loader