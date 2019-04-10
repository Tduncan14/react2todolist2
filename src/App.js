import React, {Component} from 'react';
import TodoBanner from './TodoBanner';
import TodoCreator from './TodoCreator';
import TodoRow from './TodoRow';
import VisibilityControl from './Visibility';

class App extends Component {
    constructor(props){
      super(props)

      this.state = {
        userName:"Treek",
        todoItems:[{action:"Become a great coder", done:false},
                   {action:"Finish the books you have read",done:false},
                   {action:"Find a computer job",done:false},
                   {action:"Always keep moving forward",done:false}],
       // newItemText:""
           showCompleted:true
      }
    }
    updateNewTextValue = (event) =>{
         this.setState({
           newItemText:event.target.value
         })
      }

   createNewTodo = (task) =>{
         if(!this.state.todoItems.find(
           item => item.action === task)){
             this.setState({todoItems:[...this.state.todoItems,{action:task,done:false}],
              newItemText:''
             }, () => localStorage.setItem("todos",JSON.stringify(this.state)))
           } 
      }

   toggleTodo = (todo) => this.setState({ todoItems:this.state.todoItems.map(item => item.action === todo.action ?{...item, done:!item.done}:item)});

  todoTableRows = (doneValue) => this.state.todoItems.filter(item => item.done === doneValue).map(item =>
       <TodoRow key={item} item={item} callback={this.toggleTodo} />)

      // https://github.com/Tduncan14/react2dolist2.git

  componentDidMount =() =>{
    let data = localStorage.getItem("todos");

    this.setState(data !=null ? JSON.parse(data) :{
      userName:"Treek",
      todoItems:[{
        action:"Buy Flowers", done:false},
       { action:"Get Shoes",done:false},
       {action:"Collect Ticket",done:false}, 
       {action:"Get a Software Engineer Job",done:false}
      ],
      showCompleted:true
    });
  }
    
     
  render(){

  return (

    <div>
    <TodoBanner name={this.state.userName} tasks={this.state.todoItems}></TodoBanner>
     <div className ="container-fluid">
  <TodoCreator callback ={this.createNewTodo}></TodoCreator>
       <table className="table table-striped table-bordered">
       <thead>
        <tr><th>Description</th><th>Done</th></tr>
       </thead>
       <tbody>{this.todoTableRows(false)}</tbody>
       </table>
     </div>
     <div className ="bg-secondary text-white text-center p-2">
      <VisibilityControl description="Completed Tasks"
        isChecked={this.state.showCompleted}
        callback={ (checked) => this.setState({showCompleted:checked})} />
     </div> 
     {
       this.state.showCompleted &&
       <table className ="table table-striped table-bordered">
        <thead>
          <tr><th>Description</th><th>Done</th></tr>
          </thead>
          <tbody>{this.todoTableRows(true)}</tbody>
       </table>
     }
   </div>
)

  }
}

export default App 