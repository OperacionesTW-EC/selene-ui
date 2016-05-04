import React from 'react';
import { Link } from 'react-router';

let active = {color: 'red'};

class Navbar extends React.Component {
    render(){
        return(
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to='/' className="navbar-brand">
                            Selene TW

                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="js-navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li >
                                <Link to='devices' activeStyle={active}> <i class="fa fa-desktop"></i> Dispositivos</Link>
                            </li>
                            <li >
                                <a href="#/"> <i class="fa fa-print"></i> Reportes</a>
                            </li>
                            <li >
                                <a href="#/"> <i class="fa fa-question"></i> Ayuda </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;
