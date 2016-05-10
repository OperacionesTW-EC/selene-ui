import React from 'react';
import Icon from './helpers/Icon'
import PageTitle from './layout/PageTitle'

export default class DeviceForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return (
          <div>
            <PageTitle content="Registrar Dispositivo" />
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 page-content">
                  <div className="row">
                    <div className="col-md-12">
                      <label>Tipo</label>
                    </div>
                    <div className="col-md-12">
                      <select className="form-control" name="device_type"></select>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="col-md-12">
                      <label>Marca</label>
                    </div>
                    <div className="col-md-12">
                      <select className="form-control"  name="device_brand"></select>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="col-md-12">
                      <label>Activo</label>
                    </div>
                    <div className="col-md-12">
                      <button className="btn btn-default asset-chk"> Si </button>
                      <button className="btn btn-default asset-chk"> No </button>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="col-md-12">
                      <label>Serial</label>
                    </div>
                    <div className="col-md-12">
                      <input className="form-control"  type="text" name='serial_number'/>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="col-md-12">
                      <label>Modelo</label>
                    </div>
                    <div className="col-md-12">
                      <input className="form-control"  type="text" name='model'/>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="col-md-12">
                      <label>Fecha de Compra</label>
                    </div>
                    <div className="col-md-12">
                      <input className="form-control"  type="text" name='purchase_date'/>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="col-md-12">
                      <label>Propiedad</label>
                    </div>
                    <div className="col-md-12">
                      <select className="form-control"  name="ownership"></select>
                    </div>
                  </div>
                  <div className="row margin">
                    <div className="col-md-12">
                      <a href='#' id="save" className="btn btn-primary">
                        <Icon icon="save"/> Guardar
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }

}
