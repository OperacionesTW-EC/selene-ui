import React from 'react';
import Icon from './helpers/Icon';
import Constants from './../config/Constants';
import PageTitle from './layout/PageTitle';
import MessageHelper from './helpers/MessageHelper';
import FormRow from './helpers/FormRow';
import $ from 'jquery';
import datepicker from 'bootstrap-datepicker';

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
                asset: '1',
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
        this.setDatePicker = this.setDatePicker.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    componentDidMount(){
        this.loadDeviceTypes();
        this.loadDeviceBrands();
        this.setDatePicker();
    }

    setDatePicker(){
      $("[name='purchase_date']").datepicker({
          format: 'yyyy-mm-dd',
          endDate: 'now',
          autoclose: true,
          setDate: new Date()
      }).on('changeDate', (event) =>  {
          this.handleFormChanges(event);
      });
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
                                    <a value='1' name="asset" onClick={this.handleFormChanges}
                                        className={"btn btn-default asset-chk " + (this.state.device.asset ==1 ? "selected" : "") }> Si </a>
                                    <a value='0' name="asset" onClick={this.handleFormChanges}
                                        className={"btn btn-default asset-chk " + (this.state.device.asset ==0 ? "selected" : "")}> No </a>
                                </FormRow>
                                <FormRow label="Serial">
                                    <input className="form-control" value={this.state.device.serial_number}  type="text" name='serial_number'/>
                                </FormRow>
                                <FormRow label="Modelo">
                                    <input className="form-control" value={this.state.device.model}  type="text" name='model'/>
                                </FormRow>
                                <FormRow label="Fecha de Compra">
                                    <input type='text' className="form-control" value={this.state.device.purchase_date} name='purchase_date'/>
                                </FormRow>
                                <FormRow label="Propiedad">
                                    {this.renderOwnershipSelect()}
                                </FormRow>
                                <FormRow>
                                    <a  id="save" onClick={this.handleSaveClick} className="btn btn-secondary btn-block">
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

    processForm(){
        let deviceTemp = $.extend({}, this.state.device);
        if(deviceTemp.purchase_date=='')
            delete deviceTemp.purchase_date;
        return deviceTemp;
    }

    handleSaveClick(){
        const submitData = this.processForm();
        $.ajax({
            type: 'post',
            datatype: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(submitData),
            url: Constants.BACKEND_URL +'/devices/'
        }).done((response) => {
            this.state.message.buildSuccessMessage('El dispositivo '+response.full_code+" ha sido registrado satisfactoriamente");
            this.resetState();
        }).fail(() => {
            this.state.message.buildErrorMessage('Error, no se pudo guardar el dispositivo');
            this.setState({});
        })
    }

    renderDeviceTypeSelect(){
        return (
            <select className='form-control' name='device_type' value={this.state.device.device_type}>
                <option>Seleccione...</option>
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
            <select className='form-control' name='device_brand'  value={this.state.device.device_brand}>
                <option>Seleccione...</option>
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

    resetState(){
        this.setState({device: {
            device_type: '',
            device_brand: '',
            asset: '1',
            serial_number: '',
            model: '',
            ownership: 'TW',
            purchase_date: ''
        }});
    }

}
