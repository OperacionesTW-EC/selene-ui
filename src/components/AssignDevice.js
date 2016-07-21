import React from 'react'
import Devices from './Devices'
import PageTitle from './layout/PageTitle';
import FormRow from './helpers/FormRow';
import Icon from './helpers/Icon';
import Constants from './../config/Constants';
import $ from 'jquery';
import MessageHelper from './helpers/MessageHelper';
import { Router, Route, IndexRoute} from 'react-router';
import datepicker from 'bootstrap-datepicker';

export default class AssignDevice extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            projects:[],
            message: new MessageHelper(),
            assignment: {
                assignee_name: '',
                project: undefined,
                devices: [],
                expected_return_date: undefined
            }
        };
        this.handleFormChanges = this.handleFormChanges.bind(this);
        this.handleCheckBoxChanges = this.handleCheckBoxChanges.bind(this);
        this.handleAssignment = this.handleAssignment.bind(this);
        this.assign = this.assign.bind(this);
        this.canAssign = this.canAssign.bind(this);
        this.setDatePicker = this.setDatePicker.bind(this);
        this.processForm = this.processForm.bind(this);
        this.redirectToAssignedDevice = this.redirectToAssignedDevice.bind(this);
    }

    componentDidMount(){
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: Constants.BACKEND_URL +'/projects/'
        }).done((data) => {
            this.setState({projects: data.results});
        }).fail(() => {
            this.state.message.buildErrorMessage();
            this.setState({projects:[]});
        });
        this.setDatePicker();
    }

    handleFormChanges(event){
        let data = {assignment:this.state.assignment};
        data.assignment[event.target.name] = event.target.value;
        this.setState(data);
    }

    handleCheckBoxChanges(event){
        let data = {assignment:this.state.assignment};
        if(event.target.checked)
            data.assignment.devices.push(event.target.value);
        else
            data.assignment.devices.splice(data.assignment.devices.indexOf(event.target.value), 1);
        this.setState(data);
    }

    handleAssignment(){
        if(this.canAssign())
            this.assign();
        else {
            this.state.message.buildErrorMessage('Error, existen campos obligatorios vacíos, recuerde ingresar el nombre del responsable y seleccionar al menos un dispositivo.');
            this.setState({});
        }
    }

    canAssign(){
        return this.state.assignment.assignee_name != undefined && this.state.assignment.devices.length != 0;
    }

    assign(){
        const submitData = this.processForm();
        $.ajax({
            type: 'post',
            datatype: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(submitData),
            url: Constants.BACKEND_URL +'/assignments/'
        }).done((data) => {
            this.redirectToAssignedDevice(data)
        }).fail(() => {
            this.state.message.buildErrorMessage('Error, no se pudo realizar la asignación,  recuerde ingresar el nombre del responsable y seleccionar al menos un dispositivo.');
            this.setState({});
        });
    }

    redirectToAssignedDevice(responseFromBackend){
        this.context.router.push({
            pathname: '/assign_device/'+responseFromBackend.id,
            query: { message: 'El dispositivo se asignó correctamente.' }
        })
    }

    processForm(){
        let assignmentTemp = $.extend({}, this.state.assignment);
        if(this.state.assignment.expected_return_date!='' && this.state.assignment.expected_return_date!= undefined) {
            let dateParts = assignmentTemp.expected_return_date.split('-');
            assignmentTemp.expected_return_date = dateParts[2] + "-" + dateParts[0] + "-" + dateParts[1];
        }
        return assignmentTemp;
    }

    setDatePicker(){
        $("[name='expected_return_date']").datepicker({
            format: 'mm-dd-yyyy',
            startDate: 'now',
            autoclose: true,
            setDate: new Date()
        }).on('changeDate', (event) =>  {
            this.handleFormChanges(event);
        });
    }

    render(){
        return(
            <div>
                <PageTitle content="Asignar dispositivos"/>
                {this.state.message.renderMessage()}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <section className="form-card paper white">
                                <form className="form" onChange={this.handleFormChanges}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Responsable: *</label>
                                            <input type="text" name="assignee_name" className="form-control" />
                                        </div>
                                        <div className="col-md-4">
                                            <label>Proyecto:</label>
                                            <select className="form-control" name="project" >
                                                <option value=""> Ninguno </option>
                                                { this.state.projects.map((project) => {
                                                    return (<option key={project.id} value={project.id}>{ project.name }</option>);
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <label>Fecha de Entrega:</label>
                                            <input type="text" name="expected_return_date" className="form-control" readOnly/>
                                        </div>
                                    </div>
                                </form>
                                <hr/>
                                <label>Seleccione los dispositivos disponibles: *</label>

                                <Devices type="device_assignment_table" callback={this.handleCheckBoxChanges} filterBy="Disponible"/>

                                <FormRow>
                                    <a  id="save"  className="btn btn-ternary btn-block"  onClick={this.handleAssignment} >
                                        <Icon icon="save"/> Guardar
                                    </a>
                                </FormRow>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

AssignDevice.contextTypes = {
    router: React.PropTypes.object
}
