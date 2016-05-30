import React from 'react';
import $ from 'jquery';
import Constants from './../config/Constants';
import PageTitle from './layout/PageTitle';
import Icon from './helpers/Icon';
import FormRow from './helpers/FormRow';
import DateHelper from './helpers/DateHelper';
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
            this.setState({assignment: data});
        }).fail(() => {
            this.setState({assignment:{}})
        });
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
                    {DateHelper(this.state.assignment.assignment_datetime)}
                </FormRow>
                <FormRow label="Fecha de entrega:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {DateHelper(this.state.assignment.expected_return_date)}
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
                                        <td>{DateHelper(device.end_date)}</td>
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
