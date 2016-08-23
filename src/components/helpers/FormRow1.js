import React from 'react';

const FormRow1 = (props)=> {
    return(
            <div className={`row ${props.rowClass}`}>
                    <div className={props.fieldColumnClass}>
                      <div className={props.labelColumnClass}>
                        <label>{props.label}</label>
                      </div>
                      {props.children}
                    </div>
             </div>
         )
}

FormRow1.defaultProps = {
  label : 'Label Form Row',
  rowClass : 'margin',
  fieldColumnClass : 'col-md-12',
  labelColumnClass: 'col-md-12',
  children: <div>No hay contenido</div>
}

export default FormRow1;
