import React from 'react';
import Icon from './helpers/Icon';
import Constants from './../config/Constants';
import PageTitle from './layout/PageTitle';
import MessageHelper from './helpers/MessageHelper';
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
                          ownership: '',
                          purchase_date: ''
                        }
                      };
        this.error = false;
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
      }).done((response) => {
      }).fail((response) => {
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
                  <div className="row">
                    <div className="col-md-12">
                      <label>Tipo</label>
                    </div>
                    <div className="col-md-12">
                      {this.renderDeviceTypeSelect()}
                    </div>
                  </div>
                <div className="row margin">
                  <div className="col-md-12">
                    <label>Marca</label>
                  </div>
                  <div className="col-md-12">
                    {this.renderDeviceBrandSelect()}
                  </div>
                </div>
                <div className="row margin">
                  <div className="col-md-12">
                    <label>Activo</label>
                  </div>
                  <div className="col-md-12">
                    <a value='1' name="asset" onClick={this.handleFormChanges} className="btn btn-default asset-chk"> Si </a>
                    <a value='0' name="asset" onClick={this.handleFormChanges} className="btn btn-default asset-chk"> No </a>
                  </div>
                </div>
                <div className="row margin">
                  <div className="col-md-12">
                    <label>Serial</label>
                  </div>
                  <div className="col-md-12">
                    <input className="form-control" value={this.state.device.serial_number}  type="text" name='serial_number'/>
                  </div>
                </div>
                <div className="row margin">
                  <div className="col-md-12">
                    <label>Modelo</label>
                  </div>
                  <div className="col-md-12">
                    <input className="form-control" value={this.state.device.model}  type="text" name='model'/>
                  </div>
                </div>
                <div className="row margin">
                  <div className="col-md-12">
                    <label>Fecha de Compra</label>
                  </div>
                  <div className="col-md-12">
                    <input className="form-control" value={this.state.device.purchase_date}  type="text" name='purchase_date'/>
                  </div>
                </div>
                <div className="row margin">
                  <div className="col-md-12">
                    <label>Propiedad</label>
                  </div>
                  <div className="col-md-12">
                    {this.renderOwnershipSelect()}
                  </div>
                </div>
                <div className="row margin">
                  <div className="col-md-12">
                    <a  id="save" onClick={this.handleSaveClick} className="btn btn-primary">
                      <Icon icon="save"/> Guardar
                    </a>
                  </div>
                </div>
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
