import React, { useState,useEffect } from "react";
import "./Todo.css";


const getLocalItems = () =>{
    let list = localStorage.getItem('list');
    console.log(list);
    if(list){
        return JSON.parse(localStorage.getItem('list'));
    }else{
        return[];
    }
}
const Todo = () =>{
    const [input,setInput] = useState();
    const[items,setItems] = useState(getLocalItems());
    const [toggleSubmit,setToggleSubmit] = useState(true);
    const [isEdit,setIsEdit ] = useState(null);

    const submit = (e) =>{
        if(!input){
             alert('plzz fill data');
        
            } else if(input && !toggleSubmit){
                setItems(
                    items.map((elem)=>{
                        if(elem.id === isEdit){
                            return{...elem,name:input}
     
                        }
                       return elem;
                    })
                )
                setToggleSubmit(true);
                setInput('');
                setIsEdit(null);
     
            }
            else{ 
            const allInputData = {id:new Date().getTime().toString(),name:input};
     e.preventDefault();
        setItems([...items,allInputData]);
        setInput("");
    }
    }

   
    const deleteItem=(ind)=>{
        console.log(ind);
        const updatedItems = items.filter((elem)=>{
            return elem.id !== ind;
        })
        setItems(updatedItems);
       
    }
    useEffect(()=>{
        localStorage.setItem('list',JSON.stringify(items))
       },[items])

    const EditItem = (id) =>{
        console.log(id);
        let newEditItem = items.find((elem)=>{

            return elem.id === id;
        })
        console.log( newEditItem);
        setInput( newEditItem.name);
        setToggleSubmit(false);
        setIsEdit(id);
       
        // setInput('');

    }
    return(<>
      <div className="main_div">

        <form onSubmit={submit}>
        <h1>Todo....</h1>
            <input className="todo_input"
             type="text" value={input}
             onChange={(e)=>setInput(e.target.value)}
             placeholder="Enter your todo"/>
           
        </form>
        <div className="showItem">
        {
            items.map((elem)=>{
             return(
                 <div className="eachItem" key={elem.id}>
                     <h3>{elem.name}</h3>
                     <div className="todo-btn">
                     <i className="fas fa-edit add_btn" title="Edit item" onClick={()=> EditItem(elem.id)} ></i>
                     <i className="fas fa-trash-alt add_btn" title="Delete item" onClick={()=>deleteItem(elem.id)}></i>
                 </div>
                 </div>
             )
            })
        }

        </div>
      </div>
    </>)
}
export default Todo