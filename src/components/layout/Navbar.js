import React from 'react';
import { Link } from 'react-router';
import Icon from './../helpers/Icon';
import NavbarToggle from './NavbarToggle';
import logo from './../../assets/images/twlogosm.png';

let activeClassName = 'active';

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = { collapsed: true };
        this.toggle = this.toggle.bind(this);
    }
    toggle () {
        this.setState({collapsed: !this.state.collapsed})
    }
    render(){
        return(
            <nav className="paper navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <Link to='/' className="navbar-brand navigation">
                            <img src={logo} height="100%" className="nav-img"/>
                            Selene
                        </Link>
                        <NavbarToggle
                            setToggle={this.toggle}
                            collapsed={this.state.collapsed}
                        />
                    </div>
                    <div className={this.state.collapsed ? 'collapse navbar-collapse navbar-right' : 'navbar-right'}>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="navigation">
                                <Link to='dashboard' className="raya after" activeClassName={activeClassName}>
                                    <Icon icon="th-large"/> Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;
