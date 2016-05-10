import React from 'react';
import $ from 'jquery';
import PageTitle from './layout/PageTitle'
import Constants from './../config/Constants'

export default class Devices extends React.Component{

    constructor(props) {
        super(props);
        this.state = { devices: [], messages: {content:'', type:undefined} };
        this.renderRows = this.renderRows.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.renderMessages = this.renderMessages.bind(this);
    }

    componentDidMount(){
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: Constants.BACKEND_URL +'/devices/'
        }).done((data) => {
            this.setState({devices: data.results, messages:this.buildInfoMessage(data)});
        }).fail(() => {
            this.setState({messages:{content:'Ha ocurrido un error al acceder al listado de dispositivos. Por favor intente de nuevo más tarde o contacte al administrador del sistema.', type:'error'}});
        });
    }

    buildInfoMessage(response){
        let message = {};
        if(response.results.length == 0){
            message = {content:'No existen dispositivos registrados en el sistema', type:'info'}
        }
        return message;
    };

    render(){
        return (
            <div >
                <PageTitle content="Lista de dispositivos"/>
                <div className="container">
                    <div className="row margin">
                        {this.state.devices.length == 0 ? this.renderMessages() : this.renderTable()}
                    </div>
                </div>
            </div>
        )
    };

    renderTable(){
        return (
            <table className="table  table-striped table-bordered">
                {this.renderHeader()}
                {this.renderRows()}
            </table>
        )
    }

    renderRows(){
        return (
            <tbody>
            {
                this.state.devices.map(function(device) {
                    return(
                        <tr key={device.id} className="data-row">
                            <td>{device.code}</td>
                            <td>{device.device_type.name}</td>
                            <td>{device.purchase_date}</td>
                            <td>{device.ownership}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        )
    }

    renderHeader(){
        return (
            <thead>
            <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Fecha de Compra</th>
                <th>Propiedad</th>
            </tr>
            </thead>
        )
    }

    renderMessages(){
        return <div className={'message ' + this.state.messages.type + '-message'}>{this.state.messages.content }</div>
    }


}
