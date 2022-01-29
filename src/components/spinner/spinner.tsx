import React from 'react'
import './spinner.css'

export default function Spinner() {
  return (
    <div className="spinner" data-testid="spinner">
      <div className="spinner__inner" />
      <div className="spinner__inner" />
    </div>
  )
}
