import React from 'react';
import Login from './Login';

class Home extends React.Component{
    render(){
        return(
            <div className="container-fluid">
                <div className='row'>
                    <div className="col-md-12">
                        <Login/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
