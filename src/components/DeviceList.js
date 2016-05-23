import React from 'react';
import Devices from './Devices';
import { Link } from 'react-router';
import PageTitle from './layout/PageTitle'

export default class DeviceList extends React.Component {

    constructor(props) {
        super(props);
        this.renderPanelHeader = this.renderPanelHeader.bind(this);
    }

    render() {
        return (
            <div>
                <PageTitle content="Lista de dispositivos"/>
                <div className="paper transparent">
                    <div className="container">
                        {this.renderPanelHeader()}
                        <div className="row">
                            <div className="col-md-12">
                                <Devices />
                            </div>
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
                    <div className="col-md-12 text-right">
                        <Link to='/assign_device' className='btn btn-sm btn-primary btn-create'>Asignar Dispositivo</Link>
                        <Link to='/device_form' className='btn btn-sm btn-secondary btn-create'>Registrar Dispositivo</Link>
                    </div>
                </div>
            </div>
        )
    }
}
