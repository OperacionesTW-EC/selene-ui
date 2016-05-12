import React from 'react';
import Icon from './helpers/Icon';
import Constants from './../config/Constants';
import PageTitle from './layout/PageTitle';
import MessageHelper from './helpers/MessageHelper';
import FormRow from './helpers/FormRow';
import $ from 'jquery';

export default class DeviceForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            message: new MessageHelper(),
            deviceTypes: [],
            deviceBrands: [],
            owners : ['TW', 'CL'],
            device: {
                device_type: '',
                device_brand: '',
                asset: '',
                serial_number: '',
                model: '',
                ownership: 'TW',
                purchase_date: ''
            }
        };
        this.renderDeviceTypeSelect = this.renderDeviceTypeSelect.bind(this);
        this.renderDeviceBrandSelect = this.renderDeviceBrandSelect.bind(this);
        this.renderOwnershipSelect = this.renderOwnershipSelect.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleFormChanges = this.handleFormChanges.bind(this);
        this.loadDeviceTypes = this.loadDeviceTypes.bind(this);
        this.loadDeviceBrands = this.loadDeviceBrands.bind(this);
    }

    componentDidMount(){
        this.loadDeviceTypes();
        this.loadDeviceBrands();
    }

    handleSaveClick(){
        $.ajax({
            type: 'post',
            datatype: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.device),
            url: Constants.BACKEND_URL +'/devices/'
        }).done(() => {
            this.state.message.buildSuccessMessage();
            this.setState({});
        }).fail(() => {
            this.state.message.buildErrorMessage('Error, no se pudo guardar el dispositivo');
            this.setState({});
        })
    }

    handleFormChanges(event){
        let data = {device:this.state.device};
        data.device[event.target.name] = event.target.value;
        this.setState(data);
    }

    render() {
        return (
            <div>
                <PageTitle content="Registrar Dispositivo" />
                {this.state.message.renderMessage()}
                <div className="container">
                    <form onChange={this.handleFormChanges}>
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2 page-content">
                                <FormRow label="Tipo">
                                    {this.renderDeviceTypeSelect()}
                                </FormRow>
                                <FormRow label="Marca">
                                    {this.renderDeviceBrandSelect()}
                                </FormRow>
                                <FormRow label="Activo">
                                    <a value='1' name="asset" onClick={this.handleFormChanges} className="btn btn-default asset-chk"> Si </a>
                                    <a value='0' name="asset" onClick={this.handleFormChanges} className="btn btn-default asset-chk"> No </a>
                                </FormRow>
                                <FormRow label="Serial">
                                    <input className="form-control" value={this.state.device.serial_number}  type="text" name='serial_number'/>
                                </FormRow>
                                <FormRow label="Modelo">
                                    <input className="form-control" value={this.state.device.model}  type="text" name='model'/>
                                </FormRow>
                                <FormRow label="Fecha de Compra">
                                    <input className="form-control" value={this.state.device.purchase_date}  type="text" name='purchase_date'/>
                                </FormRow>
                                <FormRow label="Propiedad">
                                    {this.renderOwnershipSelect()}
                                </FormRow>
                                <FormRow>
                                    <a  id="save" onClick={this.handleSaveClick} className="btn btn-primary">
                                        <Icon icon="save"/> Guardar
                                    </a>
                                </FormRow>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    renderDeviceTypeSelect(){
        return (
            <select className='form-control' name='device_type'>
                <option></option>
                {
                    this.state.deviceTypes.map(function(deviceType) {
                        return(
                            <option key={deviceType.id} value={deviceType.id}>{deviceType.name}</option>
                        )
                    })
                }
            </select>
        )
    }

    renderDeviceBrandSelect(){
        return (
            <select className='form-control' name='device_brand'>
                <option></option>
                {
                    this.state.deviceBrands.map(function(deviceBrand) {
                        return(
                            <option key={deviceBrand.id} value={deviceBrand.id}>{deviceBrand.name}</option>
                        )
                    })
                }
            </select>
        )
    }

    renderOwnershipSelect(){
        return (
            <select className="form-control"  name="ownership">
                {
                    this.state.owners.map(function(owner) {
                        return(
                            <option key={owner} value={owner}>{owner}</option>
                        )
                    })
                }
            </select>
        )
    }


    loadDeviceBrands(){
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: Constants.BACKEND_URL +'/device_brands/'
        }).done((data) => {
            this.setState({deviceBrands: data.results});
        }).fail(() => {
            this.state.message.buildErrorMessage();
            this.setState({deviceBrands:[]});
        });
    }

    loadDeviceTypes(){
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: Constants.BACKEND_URL +'/device_types/'
        }).done((data) => {
            this.setState({deviceTypes: data.results});
        }).fail(() => {
            this.state.message.buildErrorMessage();
            this.setState({deviceTypes:[]});
        });
    }

}
