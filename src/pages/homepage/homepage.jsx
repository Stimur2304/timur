import React from 'react'
import './homepade.css'
const Homepage = () => {
  return (
    <div className='homePageDiv'>
        <h2>Choose page</h2>
        <a href="/weather"><input type="button" value="weather" /></a>
        <a href="/currence"><input type="button" value="currrence" /></a>
    </div>
  )
}

export default Homepage