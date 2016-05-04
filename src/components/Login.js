import React from 'react';
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
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="tw-brand">
                            ThoughtWorks <Icon icon="registered"/>
                        </span>
                        <span className="country-name">
                            Ecuador
                        </span>
                    </div>
                </div>
                <div className="row margin">
                    <div className="col-md-4">
                        <label>Usuario</label>
                    </div>
                    <div className="col-md-8">
                        <input type='text'  className="input-sm form-control" name="login" value={this.state.login} onChange={this.validField}/>
                    </div>
                </div>
                <div className="row margin">
                    <div className="col-md-4">
                        <label>Contraseña</label>
                    </div>
                    <div className="col-md-8">
                        <input type='password' className="input-sm form-control" name='password'/>
                    </div>
                </div>
                <div className="row margin">
                    <div className="col-md-3 col-md-offset-9 text-right" >
                        <button type="submit" value="entrar" className="btn btn-success btn-sm">
                            <Icon icon="unlock"/> Entrar
                        </button>
                    </div>
                </div>
            </div>
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