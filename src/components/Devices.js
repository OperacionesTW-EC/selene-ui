import React from 'react';
import $ from 'jquery';
import PageTitle from './layout/PageTitle'
import MessageHelper from './helpers/MessageHelper'
import Constants from './../config/Constants'

export default class Devices extends React.Component{

    constructor(props) {
        super(props);
        this.state = { devices: [], message: new MessageHelper()};
        this.renderRows = this.renderRows.bind(this);
        this.renderTable = this.renderTable.bind(this);
    }

    componentDidMount(){
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: Constants.BACKEND_URL +'/devices/'
        }).done((data) => {
            data.results.length > 0 || this.state.message.buildInfoMessage();
            this.setState({devices:data.results});
        }).fail(() => {
            this.state.message.buildErrorMessage();
            this.setState({devices:[]})
        });
    }

    render(){
        return (
            <div >
                <PageTitle content="Lista de dispositivos"/>
                <div className="container">
                    <div className="row margin">
                        {this.state.devices.length == 0 ? this.state.message.renderMessage() : this.renderTable()}
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

}
