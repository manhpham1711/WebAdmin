import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1"> 2021</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="http://localhost:3001/#/dashboard" target="_blank" rel="noopener noreferrer">Eat2Gether's Team</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
