import React from 'react';
import { Link } from 'react-router';
import Icon from './helpers/Icon';
import $ from 'jquery';

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = { login: '', password: '' };
        this.validField = this.validField.bind(this);
    }

    render(){
        return(
            <section className="login-card paper white">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="brand text-center">
                            <img src='./../assets/images/twlogosm.png' height="25px;" className="nav-img"/>
                            Selene
                        </h2>
                        <p className="text-center">
                            <small className="trademark">Thoughtworks® - Ecuador</small>
                        </p>
                        <br/>
                        <div className="form">
                            <form className="login-form">
                                <input name="login" type="text" placeholder="Nombre de Usuario"/>
                                <input name="password" type="password" placeholder="Contraseña"/>

                                <Link to='devices' type='submit' className="btn btn-secondary btn-block">
                                    Ingresar
                                </Link>
                                <p className="login-info">No recuerdas tu clave? <a href="#">Recuperar clave.</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    validField(event){
        const inputValue = event.target.value
        this.setState({login: inputValue});
        if(inputValue.length<10 && inputValue!=''){
            $(event.target).addClass('invalid');
        }else{
            $(event.target).removeClass('invalid');
        }
    };
}

export default Login;
