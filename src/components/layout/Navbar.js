import React from 'react';
import { Link } from 'react-router';
import Icon from './../helpers/Icon';

let activeClassName = 'nav-active';

class Navbar extends React.Component {
    render(){
        return(
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to='/' className="navbar-brand navigation">
                            <img src='./../../assets/images/twlogosm.png' height="100%" className="nav-img"/>
                            Selene
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="js-navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className="navigation">
                                <Link to='devices' activeClassName={activeClassName}><Icon icon="desktop"/> Dispositivos</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;
