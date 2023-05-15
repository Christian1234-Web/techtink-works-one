import React from 'react'
import { SuperTag } from '~components/Core'
 
const WidgetCounter = ({titleClass,textClass,className,title,text}) => {
return(
<div className={`widget widget-column ${className}`}>
        <h3 className={`widget-title${titleClass ? " " + titleClass : ""}`}><SuperTag value={title}/></h3>
        <p className={`widget-text${textClass ? " " + textClass : ""}`}><SuperTag value={text}/></p>
    </div>
)
}
 
export default WidgetCounter