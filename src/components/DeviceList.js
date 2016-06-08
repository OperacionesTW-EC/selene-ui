import React from 'react';
import Devices from './Devices';
import { Link } from 'react-router';
import PageTitle from './layout/PageTitle';
import Icon from './helpers/Icon';
import MessageHelper from './helpers/MessageHelper';


export default class DeviceList extends React.Component {

    constructor(props) {
        super(props);
        let { query } = this.props.location;
        this.state = {
            message: new MessageHelper()
        };
        if(query.message) {
            this.state.message.buildSuccessMessage(query.message)
        }
        this.renderPanelHeader = this.renderPanelHeader.bind(this);
    }

    render() {
        return (
            <div>
                <PageTitle content="Lista de dispositivos"/>
                {this.state.message.renderMessage()}
                <div className="paper transparent">
                    <div className="container-fluid">
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
                    <div className="col-xs-9">
                      <div className="form">
                        <input type="text" className="form-control" placeholder="Buscar..." />
                      </div>
                    </div>
                    <div className="col-xs-3 text-right">
                        <Link to='/assign_device' className='btn btn-primary btn-sm btn-create'><Icon icon='user-plus icon' /> Asignar</Link>
                        <Link to='/device_form' className='btn btn-secondary btn-sm btn-create'><Icon icon='plus-square icon' /> Registrar</Link>
                    </div>
                </div>
            </div>
        )
    }
}
