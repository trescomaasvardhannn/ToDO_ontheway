import React from 'react';
function handleCompleteTodo(todo){
    console.log(todo._id);
     const response = fetch (`http://localhost:3000/completed/${todo._id}`,{
       method:"PUT",
       headers: {
           'Content-Type': 'application/json',
           },
       body: JSON.stringify({ completed: true })
       
    });
    console.log(response)
    // if(!response.ok){
    //    throw new Error('Failed to mark todo as completed');
    // }
    // else{
    //    console.log("todo updated");
    // }
   
}
function deleteTodo(todo){
    const response = fetch(`http://localhost:3000/delete/${todo._id}`,{
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json',
            },
    })
    console.log(response);
}
export function Todos(props) {
    if (!props.todos ) {
        // console.log(props.todo)
        return <div>No todos available</div>;
    }
    const myStyle={
        border: '3px solid black',
        padding:30
      }
    
    return (
        <div>
            {
                props.todos.map(function (todo, index) {
                   
                    return (
                        <>
                        
                        <div key={index} style={myStyle}>
                            <h2>{todo.title}</h2>
                            <h3>{todo.description}</h3>
                            <button onClick={() => handleCompleteTodo(todo)}>
                                {todo.completed ? "Completed" : "Mark as Complete"}
                            </button>
                            <button onClick={()=> deleteTodo(todo)}>Delete</button>
                            
                        </div>
                        <br></br>
                        </>
                    )
                })
            }
        </div>
    )
}

// const handleCompleteTodo = async (req,res) => {
//     try {
//         const response = await fetch(`http://localhost:3000/completed`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ completed: true })
//         });
//         if (!response.ok) {
//             throw new Error('Failed to mark todo as completed');
//         }
//         // Assuming the PUT request is successful, update the todos state or trigger a reload of todos data
//     } catch (error) {
//         console.error('Error completing todo:', error);
//     }
// };
