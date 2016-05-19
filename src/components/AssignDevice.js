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
            assignation: {
                assign_employee: '',
                assign_project: '',
                selected_devices: []
            }
        };
        this.handleFormChanges = this.handleFormChanges.bind(this);
        this.handleCheckBoxChanges = this.handleCheckBoxChanges.bind(this);
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
        let data = {assignation:this.state.assignation};
        data.assignation[event.target.name] = event.target.value;
        this.setState(data);
    }

    handleCheckBoxChanges(event){
        let data = {assignation:this.state.assignation};
        data.assignation.selected_devices.push(event.value);
        this.setState(data);
        console.log(data)
    }

    render(){
        return(
            <div>
                <PageTitle content="Asignar dispositivos"/>
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
                                    <option></option>
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
                <div className="list-holder margin">
                    <Devices type="embedded" callback={this.handleCheckBoxChanges} filterBy="Disponible"/>
                </div>
                <div className="container">
                    <FormRow>
                        <a  id="save"  className="btn btn-secondary btn-block">
                            <Icon icon="save"/> Guardar
                        </a>
                    </FormRow>
                </div>
            </div>
        )
    }

}