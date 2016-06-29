    import React from 'react';
    import Constants from './../config/Constants';
    import $ from 'jquery';
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
                deviceStatus:[],
                filters: {},
                message: new MessageHelper()
            };
            if(query.message) {
                this.state.message.buildSuccessMessage(query.message)
            }
            this.renderPanelHeader = this.renderPanelHeader.bind(this);
            this.handleChangeStatus = this.handleChangeStatus.bind(this);
            this.updateFilterFromEvent = this.updateFilterFromEvent.bind(this);
            this.handleSearchClick = this.handleSearchClick.bind(this);
            this.loadStatusData = this.loadStatusData.bind(this);
        }

        componentDidMount(){
            this.loadStatusData();
        }

        updateFilterFromEvent(event){
            let data = {filters:this.state.filters};
            data.filters[event.target.name] = event.target.value;
            this.setState(data);
        }

        handleChangeStatus(event){
            this.updateFilterFromEvent(event);
            this.loadStatusData(this.state.filters);
        }

        handleSearchClick(event) {

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
                                    <Devices filterBy = {this.state.filters.device_status}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        renderPanelHeader(){
            return (
                <div className="main-header">
                    <div className="row">
                    <div className="col-md-9">
                            <form className="flex-form" onSubmit={this.blockSubmit}>
                                <label for="device_status">Filtrar por estado:</label>
                                <select name="device_status" type="search" onChange={this.handleChangeStatus}>
                                    <option value="" defaultValue>Todos</option>
                                    { this.state.deviceStatus.map((device_status) => {
                                        return (<option key={device_status.id} value={device_status.name}>{device_status.name }</option>);
                                    })}
                                </select>

                            </form>
                        </div>
                        <div className="col-xs-12 text-right">
                            <Link to='/assign_device' className='btn btn-primary btn-sm btn-create'><Icon icon='user-plus icon' /> Asignar</Link>
                            <Link to='/device_form' className='btn btn-secondary btn-sm btn-create'><Icon icon='plus-square icon' /> Registrar</Link>
                        </div>
                    </div>
                </div>
            )
        }


    }

