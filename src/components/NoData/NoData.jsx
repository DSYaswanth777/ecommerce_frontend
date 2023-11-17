import React from 'react'
import NoDataImg from "../../assets/images/nodata.jpg"
function NoData() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
        <img src={NoDataImg} alt="nodata img" className='w-75 h-100'/>
    </div>
  )
}
 
export default NoData