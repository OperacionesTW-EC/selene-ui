import React from 'react';

const FormRow1 = (props)=> {
    return(
            <div className={`row ${props.rowClass}`}>
                    <div>
                        <label  className={props.labelColumnClass}>
                            {props.label}
                        </label>
                        <span className={props.fieldColumnClass}>{props.children}</span>
                    </div>
             </div>
         )
}

FormRow1.defaultProps = {
  label : 'Label Form Row',
  rowClass : 'margin',
  fieldColumnClass : 'col-md-12',
  labelColumnClass: 'col-md-4',
  children: <div>No hay contenido</div>
}

export default FormRow1;
