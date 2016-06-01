import React from 'react';
import { Link } from 'react-router';
import Icon from './../helpers/Icon';

const SubNav = () => {
    return (
        <section className="subnavbar">
            <div className="subnavbar-inner">
                <div className="container">
                    <ul className="mainnav">
                        <li>
                            <Link to='/assign_device'>
                                <Icon icon='user-plus icon' />
                                <div className='text'>Asignar</div>
                            </Link>
                        </li>
                        <li>
                            <Link to='/device_form'>
                                <Icon icon='plus-square-o icon' />
                                <div className='text'>Registrar</div>
                            </Link>
                        </li>
                        <li>
                            <Link to='/device_list'>
                                <Icon icon='desktop icon' />
                                <div className='text'>Dispositivos</div>
                            </Link>
                        </li>
                        <li>
                            <Link to='/assigned_device_list'>
                                <Icon icon='th-list icon' />
                                <div className='text'>Asignados</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default SubNav;
