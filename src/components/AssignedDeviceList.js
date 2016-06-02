import React from 'react';
import Constants from './../config/Constants';
import $ from 'jquery';
import MessageHelper from './helpers/MessageHelper';
import PageTitle from './layout/PageTitle';
import { Link } from 'react-router';
import DateHelper from './helpers/DateHelper';

export default class AssignedDeviceList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            devices: [],
            message: new MessageHelper()
        };
        this.renderTable = this.renderTable.bind(this);
        this.renderBody = this.renderBody.bind(this);
    }

    componentDidMount(){
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: Constants.BACKEND_URL +'/assigned_devices/'
        }).done((data) => {
            data.length > 0 || this.state.message.buildInfoMessage();
            this.setState({devices:data});
        }).fail(() => {
            this.state.message.buildErrorMessage();
            this.setState({devices:[]})
        });
    }

    render(){
        return (
            <div>
                <PageTitle content="Listados de Dispositivos Asignados" />
                <div className="container-fluid">
                    {this.renderPanelHeader()}
                    <div className="row">
                        <div className="col-md-12">
                            <section className="paper panel panel-default panel-table">
                                <div className="panel-body">
                                    { this.state.devices.length==0 ? this.state.message.renderMessage() : this.renderTable()}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderPanelHeader(){
        return (
            <div className="panel-heading">
                <div className="row">
                    <div className="col-md-12 text-right">
                        <Link to='/assign_device' className='btn btn-primary btn-sm btn-create'>Asignar Dispositivo</Link>
                    </div>
                </div>
            </div>
        )
    }

    renderTable(){
        return(
            <table className="table table-striped table-bordered table-list">
                {this.renderHeaders()}
                {this.renderBody()}
            </table>
        )
    }

    renderHeaders(){
        return(
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Tipo</th>
                    <th>Marca</th>
                    <th>Fecha de Asignación</th>
                    <th>Fecha de Entrega</th>
                    <th>Fecha de Finalización</th>
                    <th>Responsable</th>
                    <th>Proyecto</th>
                </tr>
            </thead>
        )
    }

    renderBody(){
        const LAPTOP_NAME = "Laptop";
        return(
            <tbody>
            {
                this.state.devices.map(function(device, index) {
                    return(
                        <tr className="data-row" key={index}>
                            <td>{device.full_code}</td>
                            <td>{device.device_type_name}</td>
                            <td>{device.device_brand_name}</td>
                            <td>{DateHelper(device.assignment_date)}</td>
                            <td>{DateHelper(device.return_date)}</td>
                            <td>{DateHelper(device.end_date)}</td>
                            <td>{device.assignee_name}</td>
                            <td>{device.project}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        )
    }

}
