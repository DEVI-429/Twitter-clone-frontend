import React from 'react'
import './SidebarOptions.css'

function SidebarOptions({active,Icon,text}) {
  return (
    <div className={`SidebarOptions ${active && 'SidebarOptions_active'}` }>
        <Icon/>
        <h2>{text}</h2>
    </div>
  )
}

export default SidebarOptions