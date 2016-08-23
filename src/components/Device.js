import React from 'react';
import $ from 'jquery';
import Constants from './../config/Constants';
import FormRow1 from './helpers/FormRow1';
import PageTitle from './layout/PageTitle';
import MessageHelper from './helpers/MessageHelper';
import DateHelper from './helpers/DateHelper';
import Icon from './helpers/Icon';

export default class Device extends React.Component {

    constructor(props){
        super(props);
        this.END_STATUS = 'Dado de baja';
        this.state = {
            message: new MessageHelper(),
            device :{}, deviceStatus:[], new_device_status:'', deviceEndStatusType:[], new_device_end_status_type: '', new_device_end_status_comment:''};
        this.renderDeviceInfo = this.renderDeviceInfo.bind(this);
        this.renderDeviceStatusSelect = this.renderDeviceStatusSelect.bind(this);
        this.renderDeviceEndStatusTypeSelect = this.renderDeviceEndStatusTypeSelect.bind(this);
        this.loadDeviceData = this.loadDeviceData.bind(this);
        this.loadStatusData = this.loadStatusData.bind(this);
        this.loadEndStatusTypeData = this.loadEndStatusTypeData.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleEndStatusTypeChange = this.handleEndStatusTypeChange.bind(this);
        this.handleEndStatusCommentChange = this.handleEndStatusCommentChange.bind(this);
        this.redirectToDeviceList = this.redirectToDeviceList.bind(this);
        this.renderEndStatusType = this.renderEndStatusType.bind(this);
        this.renderDeviceEndStatusComment = this.renderDeviceEndStatusComment.bind(this);
    }

    componentDidMount(){
        this.loadDeviceData();
        this.loadStatusData();
        this.loadEndStatusTypeData();
    }

    render() {
        return(
            <div>
                <PageTitle content="Dispositivo" />
                {this.state.message.renderMessage()}
                <div className="container">
                    <section className="form-card paper white medium">
                        {this.renderDeviceInfo()}
                    </section>
                </div>
            </div>

        )
    }

    renderDeviceInfo(){
        return(
            <div>
                <FormRow1 label="Código:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.device.full_code}
                </FormRow1>
                <FormRow1 label="Marca:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.device.device_brand_name}
                </FormRow1>
                <FormRow1 label="Tipo:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.device.device_type_name}
                </FormRow1>
                <FormRow1 label="Modelo:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.device.model}
                </FormRow1>
                <FormRow1 label="Serial:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.device.serial_number}
                </FormRow1>
                <FormRow1 label="Descripción:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.device.description}
                </FormRow1>
                <FormRow1 label="Fecha de compra:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {DateHelper(this.state.device.purchase_date)}
                </FormRow1>
                <FormRow1 label="Fecha de asignación:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {DateHelper(this.state.device.life_start_date_or_assignment_date)}
                </FormRow1>
                <FormRow1 label="Fecha de finalización:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {DateHelper(this.state.device.life_end_date)}
                </FormRow1>
                <FormRow1 label="Estado actual:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.device.device_status_name}
                </FormRow1>
                {this.renderFormControls()}
            </div>
        )
    }

    renderEndStatusType(){
      if(this.state.new_device_status==4) {
            return(
              <div>
                <FormRow1 label="Tipo de Baja:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                            {this.renderDeviceEndStatusTypeSelect()}
                </FormRow1>
                <FormRow1 label="Observaciones:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                            {this.renderDeviceEndStatusComment()}
                </FormRow1>
              </div>
          )
        }
    }

    renderFormControls(){
        if(this.state.device.device_status_name != this.END_STATUS) {

            return(
                <div>
                    <FormRow1 label="Cambiar estado:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                        {this.renderDeviceStatusSelect()}
                    </FormRow1>
                    {this.renderEndStatusType()}
                    <FormRow1>
                        <a onClick={this.handleSaveClick} id="save" className="btn btn-ternary btn-block">
                            <Icon icon="save"/> Guardar
                        </a>
                    </FormRow1>
                </div>
            )
        }
        else{
            return(
                <div>
                    <FormRow1 label="Tipo de baja:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                           {this.state.device.device_end_status_type_name}
                    </FormRow1>
                    <FormRow1 label="Observaciones:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                           {this.state.device.device_end_status_comment}
                    </FormRow1>
                </div>
                 )
        }

    }


    renderDeviceStatusSelect(){
        return (
            <select className='form-control' name='new_device_status' onChange={this.handleStatusChange}
                    value={this.state.new_device_status}>
                    <option>Seleccione...</option>
                    {
                        this.state.deviceStatus.map(function (status) {
                            return (
                                <option key={status.id} value={status.id}>{status.name}</option>
                            )
                        })
                    }
            </select>
        )
    }

    renderDeviceEndStatusTypeSelect(){
        return (
            <select className='form-control' name='new_device_end_status_type' onChange={this.handleEndStatusTypeChange}
                   value={this.state.new_device_end_status_type}>
                    <option>Seleccione...</option>
                    {
                        this.state.deviceEndStatusType.map(function (endStatusType) {
                            return (
                                <option key={endStatusType.id} value={endStatusType.id}>{endStatusType.name}</option>
                            )
                        })
                    }
            </select>
        )
    }

    renderDeviceEndStatusComment(){
      return (
          <input type='text' className='form-control' name = 'new_device_end_status_comment'
          value={this.state.new_device_end_status_comment} onChange={this.handleEndStatusCommentChange}/>
          )
    }

    loadDeviceData(){
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: Constants.BACKEND_URL +'/devices/'+ this.props.params.id
        }).done((data) => {
            this.setState({device: data});
        }).fail(() => {
            this.setState({device:{}})
        });
    }

    loadStatusData(){
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: Constants.BACKEND_URL +'/device_status'
        }).done((data) => {
            this.setState({deviceStatus: data.results});
        }).fail(() => {
            this.setState({deviceStatus:[]})
        });
    }

    loadEndStatusTypeData(){
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: Constants.BACKEND_URL +'/device_end_status_type'
        }).done((data) => {
            this.setState({deviceEndStatusType: data.results});
        }).fail(() => {
            this.setState({deviceEndStatusType:[]})
        });
    }

    handleStatusChange(event){
        this.setState({new_device_status: event.target.value})
    }

    handleEndStatusTypeChange(event){
        this.setState({new_device_end_status_type: event.target.value})
    }

    handleEndStatusCommentChange(event){
        this.setState({new_device_end_status_comment: event.target.value})
    }

    handleSaveClick() {
        let component = this;
        if(this.state.new_device_status != ''){
            $.ajax({
                type: 'patch',
                datatype: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({id:this.state.device.id, new_device_status: this.state.new_device_status,
                new_device_end_status_type: this.state.new_device_end_status_type, new_device_end_status_comment: this.state.new_device_end_status_comment}),
                url: Constants.BACKEND_URL +'/devices/change_status'
            }).done((response) => {
                component.redirectToDeviceList(response);
            }).fail(() => {
            this.state.message.buildErrorMessage('Error, no se pudo guardar el dispositivo');
            this.setState({});
        })
        }
    }

    redirectToDeviceList(responseFromBackend){
        this.context.router.push({
            pathname: '/device_list/',
            query: { message: responseFromBackend.message }
        })
    }
}


Device.contextTypes = {
    router: React.PropTypes.object
}
