import React from 'react'
import Devices from './Devices'
import PageTitle from './layout/PageTitle';
import FormRow from './helpers/FormRow';
import Icon from './helpers/Icon';
import Constants from './../config/Constants';
import $ from 'jquery';
import MessageHelper from './helpers/MessageHelper';
export default class AssignDevice extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            projects:[],
            message: new MessageHelper(),
            assignment: {
                assign_employee: '',
                assign_project: '',
                selected_devices: []
            }
        };
        this.handleFormChanges = this.handleFormChanges.bind(this);
        this.handleCheckBoxChanges = this.handleCheckBoxChanges.bind(this);
        this.handleAssignment = this.handleAssignment.bind(this);
        this.assign = this.assign.bind(this);
        this.canAssign = this.canAssign.bind(this);
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
    }

    handleFormChanges(event){
        let data = {assignment:this.state.assignment};
        data.assignment[event.target.name] = event.target.value;
        this.setState(data);
        console.log(data);
    }

    handleCheckBoxChanges(event){
        let data = {assignment:this.state.assignment};
        data.assignment.selected_devices.push(event.value);
        this.setState(data);
        console.log(data)
    }

    handleAssignment(){
        if(this.canAssign())
            this.assign();
    }

    canAssign(){
        return this.state.assignment.assign_employee != undefined && this.state.assignment.selected_devices.length != 0;
    }

    assign(){
       $.ajax({
            type: 'post',
            datatype: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.assignment),
            url: Constants.BACKEND_URL +'/assignment/'
        }).done(() => {
            this.state.message.buildSuccessMessage('El(los) dispositivo(s) ha(n) sido asignados satisfactoriamente');

        }).fail(() => {
            this.state.message.buildErrorMessage('Error, no se pudo realizar la asignación');
            this.setState({});
        })
    }

    render(){
        return(
            <div>
                <PageTitle content="Asignar dispositivos"/>
                {this.state.message.renderMessage()}
                <div className="container margin">
                    <div className="row margin">
                        <form onChange={this.handleFormChanges}>
                            <div className="col-md-2">
                                <label>Responsable:</label>
                            </div>
                            <div className="col-md-4">
                                <input type="text" name="assign_employee" className="form-control" />
                            </div>
                            <div className="col-md-2">
                                <label>Proyecto:</label>
                            </div>
                            <div className="col-md-4">
                                <select className="form-control" name="assign_project" >
                                    <option> Ninguno </option>
                                    { this.state.projects.map((project) => {
                                        return (<option key={project.id}>{ project.name }</option>);
                                    })}
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="row margin">
                        <div className="col-md-12">
                            <b>Seleccione los dispositivos disponibles</b>
                        </div>
                    </div>
                </div>
                <div className="margin">
                    <Devices type="embedded" callback={this.handleCheckBoxChanges} filterBy="Disponible"/>
                </div>
                <div className="container">
                    <FormRow>
                        <a  id="save"  className="btn btn-secondary btn-block"  onClick={this.handleAssignment} >
                            <Icon icon="save"/> Guardar
                        </a>
                    </FormRow>
                </div>
            </div>
        )
    }

}
