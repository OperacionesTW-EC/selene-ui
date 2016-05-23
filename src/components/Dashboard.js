import React from 'react';
import { Link } from 'react-router';

const Dashboard = () => {
    return (
        <section className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="paper actions">
                        <div className="action-card-group">
                            <Link to='/assign_device' className="card">
                                <div className="description">
                                    <div className="icon fa fa-user-plus description-icon"></div>
                                    <div className="description-text">Asignar</div>
                                </div>
                            </Link>
                            <Link to='/device_form' className="card">
                                <div className="description">
                                    <div className="icon fa fa-plus-square-o description-icon"></div>
                                    <div className="description-text">Registrar Dispositivo</div>
                                </div>
                            </Link>
                            <Link to='/device_list' className="card este">
                                <div className="description">
                                    <div className="icon fa fa-map-o description-icon"></div>
                                    <div className="description-text">Dispositivos</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;
