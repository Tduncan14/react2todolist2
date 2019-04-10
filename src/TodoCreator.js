import React,{Component} from 'react';


class TodoCreator extends Component {

    constructor(props){
       super(props)

       this.state ={
           newItemText:" "
       }
       
    }

    createNewTodo = () =>{
       
        this.props.callback(this.state.newItemText)
        this.setState({
            newItemText:""
        })
    
       }

  updateNewTextValue = (event) =>{

    this.setState({newItemText:event.target.value})
  }

 


   render () {

    return(
        <div className="my-1">
        <input className="form-control"
        value={this.state.newItemText} onChange={this.updateNewTextValue} />
        <button   onClick={this.createNewTodo}className = 'btn btn-primary mt-1'>
         Add
        </button>
        </div>


    )
   }
       


}

export default TodoCreator