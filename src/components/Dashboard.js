import React from 'react';
import { Link } from 'react-router';

const Dashboard = () => {
    return (
        <section className="container dashboard">
            <article className="card">
                <Link to='/assign_device'>
                    <div className="description">
                        <div className="icon fa fa-user-plus icon"></div>
                        <div className="text">Asignar</div>
                    </div>
                </Link>
            </article>
            <article className="card">
                <Link to='/device_form' className="card">
                    <div className="description">
                        <div className="fa fa-plus-square-o icon"></div>
                        <div className="text">Registrar Dispositivo</div>
                    </div>
                </Link>
            </article>
            <article className="card">
                <Link to='/device_list' className="card">
                    <div className="description">
                        <div className="fa fa-desktop icon"></div>
                        <div className="text">Dispositivos</div>
                    </div>
                </Link>
            </article>
            <article className="card">
                <Link to='/assigned_device_list' className="card">
                    <div className="description">
                        <div className="fa fa-th-list icon"></div>
                        <div className="text">Dispositivos Asignados</div>
                    </div>
                </Link>
            </article>
            
        </section>
    )
}

export default Dashboard;
