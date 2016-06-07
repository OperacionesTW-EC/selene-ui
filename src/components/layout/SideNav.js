import React from 'react';
import { Link } from 'react-router';
import Footer from './Footer';
import Icon from './../helpers/Icon';
import avatar from './../../assets/images/avatar.png';

let activeClassName = 'active';

const SideNav = () => {
    return(
        <section className='sidenav'>
            <div className='logo'>
                <a href='#'>
                    <span>TW•</span>SELENE
                </a>
            </div>
            <div className='user'>
                <div className='photo'>
                    <img src={avatar} />
                </div>
                <a data-toggle='collapse' href='#' className='collapsed' aria-expanded='false'>
                    Samuel L. Jabón
                </a>
            </div>
            <ul className='actions'>
                <li>
                    <Link to='/dashboard' activeClassName={activeClassName}>
                        <Icon icon='cubes icon' />
                        <p>Dashboard</p>
                    </Link>
                </li>
                <li>
                    <Link to='/assign_device' activeClassName={activeClassName}>
                        <Icon icon='user-plus icon' />
                        <p>Asignar</p>
                    </Link>
                </li>
                <li>
                    <Link to='/device_form' activeClassName={activeClassName}>
                        <Icon icon='plus-square icon' />
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
        </section>
    )
}

export default SideNav;
