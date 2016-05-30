import React from 'react'
import Devices from './Devices'
import PageTitle from './layout/PageTitle';
import FormRow from './helpers/FormRow';
import Icon from './helpers/Icon';
import Constants from './../config/Constants';
import $ from 'jquery';
import { Router, Route, IndexRoute} from 'react-router';
import datepicker from 'bootstrap-datepicker';

export default class AssignDevice extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            projects:[],
            assignment: {
                assignee_name: '',
                project: undefined,
                devices: [],
                assignment_end_date: undefined
            }
        };
        this.handleFormChanges = this.handleFormChanges.bind(this);
        this.handleCheckBoxChanges = this.handleCheckBoxChanges.bind(this);
        this.handleAssignment = this.handleAssignment.bind(this);
        this.assign = this.assign.bind(this);
        this.canAssign = this.canAssign.bind(this);
        this.setDatePicker = this.setDatePicker.bind(this);
    }

    componentDidMount(){
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: Constants.BACKEND_URL +'/projects/'
        }).done((data) => {
            this.setState({projects: data.results});
        }).fail(() => {
            this.props.setMessage('', Constants.MESSAGE_TYPE.ERROR);
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
            this.props.setMessage('Error, existen campos vacíos', Constants.MESSAGE_TYPE.ERROR);
        }
    }

    canAssign(){
        return this.state.assignment.assignee_name != undefined && this.state.assignment.devices.length != 0;
    }

    assign(){
        $.ajax({
            type: 'post',
            datatype: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.assignment),
            url: Constants.BACKEND_URL +'/assignments/'
        }).done((data) => {
            this.props.setMessage('El(los) dispositivo(s) ha(n) sido asignados satisfactoriamente', Constants.MESSAGE_TYPE.OK);
            $(location).attr('href', '#/assign_device/' + data.id);
        }).fail(() => {
            this.props.setMessage('Error, no se pudo realizar la asignación',Constants.MESSAGE_TYPE.ERROR);
        });
    }

    setDatePicker(){
      $("[name='assignment_end_date']").datepicker({
          format: 'yyyy-mm-dd',
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
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <section className="form-card paper white">
                                <form className="form" onChange={this.handleFormChanges}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Responsable: *</label>
                                            <input type="text" name="assignee_name" className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Proyecto:</label>
                                            <select className="form-control" name="project" >
                                                <option> Ninguno </option>
                                                 { this.state.projects.map((project) => {
                                                    return (<option key={project.id} value={project.id}>{ project.name }</option>);
                                                 })}
                                            </select>
                                        </div>
                                    </div>
                                </form>
                                <hr/>
                                <label>Seleccione los dispositivos disponibles: *</label>

                                <Devices type="device_assignment_table" callback={this.handleCheckBoxChanges} filterBy="Disponible"/>

                                <FormRow>
                                    <a  id="save"  className="btn btn-secondary btn-block"  onClick={this.handleAssignment} >
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
