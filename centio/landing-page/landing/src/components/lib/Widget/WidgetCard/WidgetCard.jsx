import React from 'react'
import { SuperTag } from '~components/Core'
 
const WidgetCard = ({className,title,text,mode}) => {
return(
    <div className={`widget widget-card widget-card-center ${className}`}>
        <div className="widget-icon">
            <img src={icon} alt="widget" className="make-it-inline"/>
        </div>
        <div className="widget-text">
            <h3 className={`widget-title heading-${mode}`}>{title}</h3>
            <p className={`text-${mode}`}><SuperTag value={text}/></p>
        </div>
    </div>
)
}
 
export default WidgetCard