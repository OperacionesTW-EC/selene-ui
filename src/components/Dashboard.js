import React from 'react';
import { Link } from 'react-router';
import Icon from './helpers/Icon';

const Dashboard = () => {
    return (
        <section className='container dashboard'>
            <article className='card'>
                <Link to='/assign_device'>
                    <div className='description'>
                        <Icon icon='user-plus icon' />
                        <div className='text'>Asignar</div>
                    </div>
                </Link>
            </article>
            <article className='card'>
                <Link to='/device_form'>
                    <div className='description'>
                        <Icon icon='plus-square-o icon' />
                        <div className='text'>Registrar Dispositivo</div>
                    </div>
                </Link>
            </article>
            <article className='card'>
                <Link to='/device_list'>
                    <div className='description'>
                        <Icon icon='desktop icon' />
                        <div className='text'>Dispositivos</div>
                    </div>
                </Link>
            </article>
            <article className='card'>
                <Link to='/assigned_device_list'>
                    <div className='description'>
                        <Icon icon='th-list icon' />
                        <div className='text'>Dispositivos Asignados</div>
                    </div>
                </Link>
            </article>
        </section>
    )
}

export default Dashboard;
