import React from 'react';
import $ from 'jquery';
import MessageHelper from './helpers/MessageHelper'
import Constants from './../config/Constants'
import Icon from './helpers/Icon'
import DateHelper from './helpers/DateHelper';
import {Link} from  'react-router'

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
        this.selectTableType = this.selectTableType.bind(this);
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


    componentWillReceiveProps(nextProps){
        this.setState({filterBy:nextProps.filterBy})
    }

    render(){
        return (
            <section className="paper panel panel-default panel-table">
                <div className="panel-body">
                    {this.state.devices.length == 0 ? this.state.message.renderMessage() : this.renderTable()}
                </div>
            </section>
        )
    };

    renderTable(){
        this.selectTableType();
        return (
            <table className="table table-striped table-bordered table-list" id="device-list">
                {this.renderHeader()}
                {this.renderRows()}
            </table>
        )
    }

    selectTableType(){
        if (this.state.type=='device_assignment_table'){
            this.renderHeader = this.renderAssignmentHeader.bind(this);
            this.renderDataRow = this.renderAssignmentDataRow.bind(this);
        } else {
            this.renderHeader = this.renderHeader.bind(this);
            this.renderDataRow = this.renderDataRow.bind(this);
        }
    }

    renderRows(){
        let context = this;
        let cont = 0;
        return (
            <tbody>
            {
                this.state.devices.map((device) => {
                    if(!context.props.filterBy || device.device_status_name==context.state.filterBy){
                        cont++;
                        { return context.renderDataRow(device) }
                    }
                })
            }
            { cont>0 || <tr className="data-row"><td colSpan="5">No hay dispositivos {this.state.filterBy}(s)</td></tr>}
            </tbody>
        )
    }

    renderDataRow(device){
        return (
            <tr key={device.id} className="data-row">
                <td className="text-center">{device.full_code}</td>
                <td>{device.device_type_name}</td>
                <td>{device.device_brand_name}</td>
                <td>{DateHelper(device.purchase_date)}</td>
                <td>{DateHelper(device.life_start_date_or_assignment_date)}</td>
                <td>{DateHelper(device.life_end_date)}</td>
                <td>{device.device_status_name}</td>
                <td>
                    <Link to={"/device/"+device.id} className="btn btn-xs btn-primary"><Icon icon="search"/></Link>
                </td>
            </tr>);
    }

    renderAssignmentDataRow(device){
        return (
            <tr key={device.id} className="data-row">
                <td className="text-center">{device.full_code}</td>
                <td>{device.device_type_name}</td>
                <td>{device.device_brand_name}</td>
                <td>{DateHelper(device.purchase_date)}</td>
                <td><input type="checkbox" className="device-chk" onChange={this.state.callback} value={device.id}/></td>
            </tr>);
    }

    renderHeader(){
        return(
            <thead>
            <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Fecha de Compra</th>
                <th>Fecha de Asignación</th>
                <th>Fecha de Finalización</th>
                <th>Estado</th>
                <th></th>
            </tr>
            </thead>)
    }

    renderAssignmentHeader(){
        return (
            <thead>
            <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Fecha de Compra</th>
                <th className="checkbox-col"><Icon icon="check"/></th>
            </tr>
            </thead>);
    }

}
