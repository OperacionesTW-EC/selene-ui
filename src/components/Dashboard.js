import React from 'react';
import { Link } from 'react-router';
import Icon from './helpers/Icon';
import PageTitle from './layout/PageTitle';

const Dashboard = () => {
    return (
        <div>
            <PageTitle content='Dashboard' />
            <section className='container-fluid paper'>
                <article className='card'>
                    <div className='description'>
                        <p className='title'>Usuarios</p>
                        <p className="number">65</p>
                        <Icon icon='users icon' />
                    </div>
                </article>
                <article className='card'>
                    <div className='description'>
                        <p className='title'>Pedidos</p>
                        <p className="number">7</p>
                        <Icon icon='send icon' />
                    </div>
                </article>
                <article className='card half'>
                    <div className='description'>
                        <p className='title'>Proyectos</p>
                        <p className="number">8</p>
                        <Icon icon='industry icon' />
                    </div>
                </article>
                <article className='card'>
                    <div className='description'>
                        <p className='title'>Dispositivos</p>
                        <p className="number">208</p>
                        <Icon icon='desktop icon' />
                    </div>
                </article>
                <article className='card'>
                    <div className='description'>
                        <p className='title'>Disponibles</p>
                        <p className="number">11</p>
                        <Icon icon='share-alt icon' />
                    </div>
                </article>
                <article className='card'>
                    <div className='description'>
                        <p className='title'>Mantenimiento</p>
                        <p className="number">4</p>
                        <Icon icon='recycle icon' />
                    </div>
                </article>
                <article className='card'>
                    <div className='description'>
                        <p className='title'>De baja (este mes)</p>
                        <p className="number">2</p>
                        <Icon icon='fire icon' />
                    </div>
                </article>
                <article className='card wide'>
                    <div className='description'>
                        <p className='title'>Cualquier otra cosa</p>
                        <p className="number">8</p>
                        <Icon icon='rocket icon' />
                    </div>
                </article>

            </section>
        </div>
    )
}

export default Dashboard;
