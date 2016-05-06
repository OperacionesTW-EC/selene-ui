import React from 'react';
import $ from 'jquery';
class Devices extends React.Component{

    constructor(props) {
        super(props);
        this.state = { devices: [], error_message:'Error', show_error_message: false };
        this.renderRows = this.renderRows.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    componentDidMount(){
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: 'http://localhost:8000/devices/'
        }).done((data) => {
            this.setState({devices: data.results})
        }).fail(() => {
            this.setState({show_error_message: true})
        });
    }

    renderRows(){
        return (
            <tbody>
            {
                this.state.devices.map(function(device) {
                    return(
                        <tr key={device.id}>
                            <td>SOME_CODE_WILL_BE</td>
                            <td>{device.serial_number}</td>
                            <td>{device.device_type.name}</td>
                            <td>{device.device_brand.name}</td>
                            <td>{device.asset == 1 ? 'Si' : 'No'}</td>
                            <td>{device.purchase_date}</td>

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
                <th>No. Serie</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>¿Es Activo?</th>
                <th>Fecha de Compra</th>
            </tr>
            </thead>
        )
    }

    renderTable(){
        return (
            <table className="table table-condensed table-striped">
                {this.renderHeader()}
                {this.renderRows()}
            </table>
        )
    }

    renderError(){
        return <div className="error_message">{this.state.error_message}</div>
    }

    render(){
        return (
            <div>
                <h1>Dispositivos</h1>
                {this.state.show_error_message ? this.renderError() : this.renderTable()}
            </div>

        )
    };


}

export default Devices;