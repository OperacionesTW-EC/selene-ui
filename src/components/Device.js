import React from 'react';
import $ from 'jquery';
import Constants from './../config/Constants';
import FormRow from './helpers/FormRow';
import PageTitle from './layout/PageTitle';
import DateHelper from './helpers/DateHelper';
import Icon from './helpers/Icon';

export default class Device extends React.Component {

    constructor(props){
        super(props);
        this.END_STATUS = 'Dado de baja';
        this.state = {device :{}, deviceStatus:[], new_device_status:''};
        this.renderDeviceInfo = this.renderDeviceInfo.bind(this);
        this.renderDeviceStatusSelect = this.renderDeviceStatusSelect.bind(this);
        this.loadDeviceData = this.loadDeviceData.bind(this);
        this.loadStatusData = this.loadStatusData.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.redirectToDeviceList = this.redirectToDeviceList.bind(this);
    }

    componentDidMount(){
        this.loadDeviceData();
        this.loadStatusData();
    }

    render() {
        return(
            <div>
                <PageTitle content="Dispositivo" />
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
                <FormRow label="Código:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.device.full_code}
                </FormRow>
                <FormRow label="Marca:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.device.device_brand_name}
                </FormRow>
                <FormRow label="Tipo:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.device.device_type_name}
                </FormRow>
                <FormRow label="Modelo:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.device.model}
                </FormRow>
                <FormRow label="Serial:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.device.serial_number}
                </FormRow>
                <FormRow label="Fecha de compra:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {DateHelper(this.state.device.purchase_date)}
                </FormRow>
                <FormRow label="Fecha de asignación:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {DateHelper(this.state.device.laptop_begin_life)}
                </FormRow>
                <FormRow label="Fecha de finalización:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {DateHelper(this.state.device.laptop_end_life)}
                </FormRow>
                <FormRow label="Estado actual:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.device.device_status_name}
                </FormRow>
                {this.renderFormControls()}
            </div>
        )
    }

    renderFormControls(){
        if(this.state.device.device_status_name != this.END_STATUS) {
            return(
                <div>
                    <FormRow label="Cambiar estado:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                        {this.renderDeviceStatusSelect()}
                    </FormRow>
                    <FormRow>
                        <a onClick={this.handleSaveClick} id="save" className="btn btn-ternary btn-block">
                            <Icon icon="save"/> Guardar
                        </a>
                    </FormRow>
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

    handleStatusChange(event){
        this.setState({new_device_status: event.target.value})
    }

    handleSaveClick() {
        let component = this;
        if(this.state.new_device_status != ''){
            $.ajax({
                type: 'patch',
                datatype: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({id:this.state.device.id, new_device_status: this.state.new_device_status }),
                url: Constants.BACKEND_URL +'/devices/change_status'
            }).done((response) => {
                component.redirectToDeviceList(response);
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
    router:  function() { return React.PropTypes.func.isRequired; }
};
