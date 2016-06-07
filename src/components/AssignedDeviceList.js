import React from 'react';
import Constants from './../config/Constants';
import $ from 'jquery';
import MessageHelper from './helpers/MessageHelper';
import PageTitle from './layout/PageTitle';
import { Link } from 'react-router';
import DateHelper from './helpers/DateHelper';
import Icon from './helpers/Icon';

export default class AssignedDeviceList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            devices: [],
            projects:[],
            filters: {},
            message: new MessageHelper()
        };
        this.renderTable = this.renderTable.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.loadDevices = this.loadDevices.bind(this);
        this.loadProjects = this.loadProjects.bind(this);
        this.handleAssigneeKeyPress = this.handleAssigneeKeyPress.bind(this);
        this.blockSubmit = this.blockSubmit.bind(this);
        this.handleChangeProject = this.handleChangeProject.bind(this);
        this.updateFilterFromEvent = this.updateFilterFromEvent.bind(this);
        this.handleChangeAssignee = this.handleChangeAssignee.bind(this);
    }

    componentDidMount(){
        this.loadDevices();
        this.loadProjects();
    }

    handleSearchClick(event) {
        this.loadDevices(this.state.filters);
    }

    handleAssigneeKeyPress(event) {
        if (event.charCode == 13) {
            this.loadDevices(this.state.filters);
        }
    }

    handleChangeAssignee(event){
        this.updateFilterFromEvent(event);
    }

    handleChangeProject(event){
        this.updateFilterFromEvent(event);
        this.loadDevices(this.state.filters);
    }

    blockSubmit(event) {
        event.preventDefault();
    }

    updateFilterFromEvent(event){
        let data = {filters:this.state.filters};
        data.filters[event.target.name] = event.target.value;
        this.setState(data);
    }

    loadDevices(filters={}){
        $.ajax({
            type: 'GET',
            datatype: 'json',
            data: filters,
            url: Constants.BACKEND_URL +'/assigned_devices/'
        }).done((data) => {
            data.length > 0 || this.state.message.buildInfoMessage();
            this.setState({devices:data});
        }).fail(() => {
            this.state.message.buildErrorMessage();
            this.setState({devices:[]})
        });
    }

    loadProjects(){
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
                  <div className="col-md-9">
                      <form className="form" onSubmit={this.blockSubmit}>
                          <div className="row">
                              <div className="col-md-4">
                                  <label>Responsable: </label>
                                  <input type="text" name="assignee" className="form-control" onKeyPress={this.handleAssigneeKeyPress} onChange={this.handleChangeAssignee}/>
                              </div>
                              <div className="col-md-4">
                                  <label>Proyecto:</label>
                                  <select className="form-control" name="project" onChange={this.handleChangeProject} >
                                      <option value=""> Todos </option>
                                      { this.state.projects.map((project) => {
                                          return (<option key={project.id} value={project.id}>{ project.name }</option>);
                                      })}
                                  </select>
                              </div>
                          </div>
                      </form>
                  </div>
                    <div className="col-md-3 text-right">
                        <a onClick={this.handleSearchClick} id="btn-search" className='btn btn-secondary btn-sm btn-create'><Icon icon='search icon' /> Buscar</a>
                        <Link id="btn-save" to='/assign_device' className='btn btn-primary btn-sm btn-create'><Icon icon='user-plus icon' /> Asignar</Link>
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
        return(
            <tbody>
            {
                this.state.devices.map(function(device, index) {
                    return(
                        <tr className="data-row" key={index}>
                            <td>{device.full_code}</td>
                            <td>{device.device_type_name}</td>
                            <td>{device.device_brand_name}</td>
                            <td>{DateHelper(device.life_start_date_or_assignment_date)}</td>
                            <td>{DateHelper(device.return_date)}</td>
                            <td>{DateHelper(device.life_end_date)}</td>
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
