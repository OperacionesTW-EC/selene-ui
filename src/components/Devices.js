import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import PageTitle from './layout/PageTitle'
import MessageHelper from './helpers/MessageHelper'
import Constants from './../config/Constants'
import Icon from './helpers/Icon'

export default class Devices extends React.Component{

    constructor(props) {
        super(props);
        this.state = { devices: [],
            message: new MessageHelper(),
            type: props.type,
            callback : props.callback,
            filterBy: props.filterBy
        };
        this.renderRows = this.renderRows.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
        this.renderPanelHeader = this.renderPanelHeader.bind(this);
        this.renderChkRow = this.renderChkRow.bind(this);
        this.renderChkHeader = this.renderChkHeader.bind(this);
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
                { this.renderTitle() }
                <div className="container">
                    <div className="row">
                        <section className="paper panel panel-default panel-table">
                            { this.renderPanelHeader()}
                            <div className="panel-body">
                                {this.state.devices.length == 0 ? this.state.message.renderMessage() : this.renderTable()}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    };

    renderPanelHeader(){
        if (this.state.type!='embedded')
            return (<div className="panel-heading">
                <div className="row">
                    <div className="col-md-12 text-right">
                        <Link to='/device_form' className='btn btn-sm btn-secondary btn-create'>Registrar Dispositivo</Link>
                    </div>
                </div>
            </div>)
    }

    renderTitle(){
        if(this.state.type!='embedded')
            return (<PageTitle content="Lista de dispositivos"/>)
    }

    renderTable(){
        return (
            <table className="table table-striped table-bordered table-list" id="device-list">
                {this.renderHeader()}
                {this.renderRows()}
            </table>
        )
    }

    renderRows(){
        let context = this;
        let cont = 0;
        return (
            <tbody>
            {
                this.state.devices.map(function(device) {
                    if(!context.state.filterBy || device.device_state_name==context.state.filterBy){
                        cont++;
                        return(
                            <tr key={device.id} className="data-row">
                                <td className="text-center">{device.full_code}</td>
                                <td>{device.device_type_name}</td>
                                <td>{device.device_brand_name}</td>
                                <td>{device.purchase_date}</td>
                                <td>{device.assign_date}</td>
                                <td>{device.end_date}</td>
                                <td>{device.return_date}</td>
                                { context.renderChkRow(device) }
                            </tr>
                        )
                    }
                })

            }
            { cont>0 || <tr><td colSpan="5">No hay dispositivos {this.state.filterBy}(s)</td></tr>}
            </tbody>
        )
    }

    renderHeader(){
        return (
            <thead>
            <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Fecha de Compra</th>
                <th>Fecha de Asignación</th>
                <th>Fecha de Finalización</th>
                <th>Fecha de Entrega</th>
                { this.renderChkHeader() }
            </tr>
            </thead>
        )
    }

    renderChkHeader(){
        if (this.state.type=='embedded')
            return (
                <th className="checkbox-col"> <Icon icon="check"/></th>
            )
    }

    renderChkRow(device){
        if (this.state.type=='embedded')
            return (
                <td><input type="checkbox" className="device-chk" onChange={this.state.callback} value={device.id}/></td>
            )
    }


}
