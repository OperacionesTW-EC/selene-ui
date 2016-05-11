import Message from './Message'

export default class MessageHelper{

    constructor(){
        this.message = undefined;
        this.DEFAULT_INFO_MESSAGE = 'No hay registros en el sistema';
        this.DEFAULT_ERROR_MESSAGE = 'Ha ocurrido un error, por favor intentelo mas tarde o comuniquese con el administrador del sistema';
        this.DEFAULT_SUCCESS_MESSAGE = 'Acción completada exitosamente';
    }

    buildInfoMessage(content){
        this.message = new Message({type:'info',content: content? content : this.DEFAULT_INFO_MESSAGE});
    }

    buildErrorMessage(content){
        this.message = new Message({type:'error',content: content? content : this.DEFAULT_ERROR_MESSAGE});
    }

    buildSuccessMessage(content){
        this.message = new Message({type:'success',content: content? content : this.DEFAULT_SUCCESS_MESSAGE});
    }

    renderMessage(){
        return this.message ?  this.message.render() : '';
    }

}