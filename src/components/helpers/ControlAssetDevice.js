import React from 'react';

const ControlAssetDevice = (props)=> {
    let rowClass = props.rowClass || 'margin';
    let fieldColumnClass = props.fieldColumnClass || 'col-md-0 ';
    let buttonSiClass = props.asset ==1 ? "selected" : ""
    let buttonNoClass = props.asset ==0 ? "selected" : ""

    return(

              <div className={fieldColumnClass}>
                  <div className="btn-group">
                      <button value='1' name="asset" onClick={props.handleFormChanges}
                          className={"btn btn-default asset-chk " + buttonSiClass }> Si </button>
                      <button value='0' name="asset" onClick={props.handleFormChanges}
                          className={"btn btn-default asset-chk " + buttonNoClass}> No </button>
                  </div>
              </div>

     )
}

export default ControlAssetDevice;
