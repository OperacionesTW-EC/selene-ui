import React from 'react';
import Devices from './Devices';
import { Link } from 'react-router';
import PageTitle from './layout/PageTitle'
import MessageHelper from './helpers/MessageHelper';

export default class DeviceList extends React.Component {

    constructor(props) {
        super(props);
        let { query } = this.props.location;
        this.renderPanelHeader = this.renderPanelHeader.bind(this);
        this.state = {
            message: new MessageHelper()
        };
        if(query.message) {
            this.state.message.buildSuccessMessage(query.message)
        }
    }

    render() {
        return (
            <div>
                <PageTitle content="Lista de dispositivos"/>
                {this.state.message.renderMessage()}
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
                        <Link to='/assign_device' className='btn btn-primary btn-sm btn-create'>Asignar Dispositivo</Link>
                        <Link to='/device_form' className='btn btn-secondary btn-sm btn-create'>Registrar Dispositivo</Link>
                    </div>
                </div>
            </div>
        )
    }
}
