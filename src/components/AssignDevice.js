import React from 'react'
import Devices from './Devices'
export default class AssignDevice extends React.Component{

    callback(event){
        console.log('--->', event.target.value)
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="row margin">
                        <div className="col-md-12">
                            <h3>Seleccione los dispositivos disponibles</h3>
                        </div>
                    </div>
                </div>
                <Devices type="embedded" callback={this.callback} filterBy="Disponible"/>
            </div>
        )
    }

}