import React from 'react'
import Login from './Login'
import About from './About'

class Home extends React.Component{
    render(){
        return(
            <div className="container">
                <div className='row banner'>
                    <div className="col-md-5 ">
                        <Login/>
                    </div>
                </div>
                <About/>
            </div>
        )
    }
}

export default Home;