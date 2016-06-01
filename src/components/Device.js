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
        this.state = {device :{}};
        this.renderDeviceInfo = this.renderDeviceInfo.bind(this);
        this.renderDeviceStatusSelect = this.renderDeviceStatusSelect.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    componentDidMount(){
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
                    {DateHelper(this.state.device.first_assignment_date)}
                </FormRow>
                <FormRow label="Fecha de finalización:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {DateHelper(this.state.device.end_date)}
                </FormRow>
                <FormRow label="Estado actual:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.state.device.device_status_name}
                </FormRow>
                <FormRow label="Cambiar estado:" labelColumnClass="col-md-4" fieldColumnClass="col-md-8">
                    {this.renderDeviceStatusSelect()}
                </FormRow>
                <FormRow>
                    <a onClick={this.handleSaveClick} id="save" className="btn btn-secondary btn-block">
                        <Icon icon="save"/> Guardar
                    </a>
                </FormRow>
            </div>
        )
    }

    renderDeviceStatusSelect(){
        return (
            <select className='form-control' name='new_device_status'>
                <option>Seleccione...</option>
            </select>
        )
    }

    handleSaveClick() {

    }
}
