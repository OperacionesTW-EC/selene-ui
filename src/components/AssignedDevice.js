import React from 'react';
import $ from 'jquery';
import Constants from './../config/Constants';
import PageTitle from './../components/layout/PageTitle';
import Icon from './../components/helpers/Icon';
import FormRow from './../components/helpers/FormRow';
import { Link } from 'react-router';

export default class AssignedDevice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            assignment: {devices:[]}
        };
        this.getAssignmentId=this.getAssignmentId.bind(this);
        this.renderAssigmentInfo=this.renderAssigmentInfo.bind(this);
        this.renderDeviceTable=this.renderDeviceTable.bind(this);
    }

    componentDidMount(){
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: Constants.BACKEND_URL +'/assignments/'+ this.getAssignmentId()
        }).done((data) => {
            this.setState({assignment: this.processResponse(data)});
        }).fail(() => {
            this.setState({assignment:{}})
        });
    }

    processResponse(responseData){
        responseData.assignment_datetime =this.convertDate(responseData.assignment_datetime);
        responseData.return_date = this.convertDate(responseData.return_date);
        return responseData;
    }

    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var date = new Date(inputFormat);
        if(isNaN(date.getTime()))
            return 'No registrada';
        return [pad(date.getDate()), pad(date.getMonth()+1), date.getFullYear()].join('-')

    }

    getAssignmentId(){
        return this.props.params.assignmentId;
    }

    render() {
        return(
            <div>
                <PageTitle content="Detalle de la asignación" />
                <div className="container">
                    <section className="form-card paper white medium">
                        {this.renderAssigmentInfo()}
                        {this.renderDeviceTable()}
                        <div className="row margin">
                            <Link to="/assigned_device_list" className="btn btn-secondary btn-block">
                                <Icon icon="check"/> Aceptar
                            </Link>
                        </div>
                    </section>
                </div>
            </div>

        )
    }

    renderAssigmentInfo(){
        return(
            <div>
                <FormRow label="Responsable:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.assignment.assignee_name}
                </FormRow>
                <FormRow label="Proyecto:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.assignment.project_name}
                </FormRow>
                <FormRow label="Fecha de asignación:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.assignment.assignment_datetime}
                </FormRow>
                <FormRow label="Fecha de entrega:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.assignment.return_date}
                </FormRow>
            </div>
        )
    }

    renderDeviceTable(){
        return(
            <div className="row margin">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered table-list">
                        <thead>
                        <tr>
                            <th>Código</th>
                            <th>Tipo</th>
                            <th>Marca</th>
                            <th>Fecha de Finalización</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.assignment.devices.map(function(device) {
                                return(
                                    <tr className="data-row" key={device.id}>
                                        <td>{device.full_code}</td>
                                        <td>{device.device_type_name}</td>
                                        <td>{device.device_brand_name}</td>
                                        <td>{device.end_date}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}
