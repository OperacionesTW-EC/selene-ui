import React from 'react';
import { Link } from 'react-router';
import Icon from './../helpers/Icon';
import NavbarToggle from './NavbarToggle';

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
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to='/' className="navbar-brand navigation">
                            Panel de Control
                        </Link>
                        <NavbarToggle
                            setToggle={this.toggle}
                            collapsed={this.state.collapsed}
                        />
                    </div>
                    <form className="navbar-form navbar-left navbar-search-form" role="search">
                        <div className="input-group">
                            <input type="text" value="" className="form-control" placeholder="Buscar..." />
                            <span className="input-group-addon"><i className="fa fa-search"></i></span>
                        </div>
                    </form>
                    <div className={this.state.collapsed ? 'collapse navbar-collapse navbar-right' : 'navbar-right'}>
                        {/*content to collapse*/}
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;
