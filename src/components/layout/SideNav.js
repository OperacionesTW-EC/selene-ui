import React from 'react';
import { Link } from 'react-router';
import Footer from './Footer';
import Icon from './../helpers/Icon';

let activeClassName = 'active';

const SideNav = () => {
    return(
        <section className="sidebar">
            <div className="logo">
                <a href="#" className="logo-text">
                    SELENE
                </a>
            </div>

            <div className="sidebar-wrapper">
                <div className="user">
                    <div className="photo">
                        <img src="https://api.adorable.io/avatars/285/freddy%40adorable.io" />
                    </div>
                    <div className="info">
                        <a data-toggle="collapse" href="#" className="collapsed" aria-expanded="false">
                            Samuel Jabón
                        </a>
                    </div>
                </div>
                <ul className="nav">
                    <li>
                        <Link to='/assign_device' activeClassName={activeClassName}>
                            <Icon icon='user-plus icon' />
                            <p>Asignar</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/device_form' activeClassName={activeClassName}>
                            <Icon icon='plus-square-o icon' />
                            <p>Registrar</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/device_list' activeClassName={activeClassName}>
                            <Icon icon='desktop icon' />
                            <p>Dispositivos</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/assigned_device_list' activeClassName={activeClassName}>
                            <Icon icon='th-list icon' />
                            <p>Asignados</p>
                        </Link>
                    </li>
                </ul>
                <Footer />
            </div>
        </section>
    )
}

export default SideNav;
