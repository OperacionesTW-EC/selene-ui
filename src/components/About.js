import React from 'react'

class About extends React.Component{
    render(){
        return(
            <div className="row margin">
                <div className="col-md-4 text-justify"  >
                    <h1>Selene</h1>
                    <p>
                        Es una herramienta que centraliza la información y facilita la
                        toma de decisiones del equipo de Techops. Controla el
                        inventario registrando dispositivos y llevando un historial de su estado.<br/>
                        Selene fue construido para facilitar la
                        gestión del equipo de Techops y Opex de la oficina de ThoughtWorks Quito.
                    </p>
                </div>
                <div className="col-md-4 text-justify"  >
                    <h1>Techops team</h1>
                    <p> Es el equipo encargado de, entre otras cosas, llevar el control sobre el
                        hardware e infraestructura necesaria para el funcionamiento de ThoughtWorks.<br/>
                        El respondable en la oficina de Quito es Freddy Escobar.
                    </p>
                </div>
                <div className="col-md-4 text-justify"  >
                    <h1>Soporte</h1>
                    <p>
                        <b>Techops: </b><a href="mailto:fescobar@thoughtworks.com">fescobar@thoughtworks.com</a>
                    </p>
                    <p>
                        <b>Thoughtworks: </b><a href="#">thoughtworks.com</a>
                    </p>
                    <p>
                        <b>¿Olvidaste tu contraseña?</b> ¡Haz click <a href="mailito:fescobar@thoughtworks.com">aquí</a>!
                    </p>
                </div>
            </div>
        )
    }
}

export default About;