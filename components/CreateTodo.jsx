import { useState } from "react"
let isClicked=false;
 function CreateTodo(){
    const [title,setTitle]=useState("");
    const [description,setDesc]=useState("");
    const myStyle = {
        fontSize: "16px",
        fontFamily: "inherit",
        padding: "0.25em 0.5em",
        backgroundColor: "#fff",
        border: "2px solid black",
        borderRadius: "4px",
        backgroundColor:"#d2e26a",
        
        
    };
    const buttonStyle = {
        display: "inline-block",
        padding: "5px 5px",
        fontSize: isClicked ? "28px" : "24px", // Change font size when clicked
        cursor: "pointer",
        textAlign: "center",
        textDecoration: "none",
        outline: "none",
        color: "#fff",
        backgroundColor: "#04AA6D",
        border: "none",
        borderRadius: "5px",
       
        transition: "font-size 0.3s ease, background-color 0.3s ease", // Add transitions
    };
    
    return(
        <div  >
            <input style={myStyle} type="text" placeholder="title" onChange={function(e){
                const value= e.target.value;
                setTitle(value);
                // console.log(value);
            }}></input>
            <input style={myStyle} type="text" placeholder="description" onChange={function(e){
                const value=e.target.value;
                setDesc(value);
                // console.log(value);
            }}></input>
            <button style={buttonStyle} onClick={()=>{
                isClicked=true;
                const requestData={
                    title:title,
                    description:description,
                    completed:false
                }
                if(!title.length || !description.length){
                    alert("add title and description properly")

                }
                else{
                    fetch("http://localhost:3000/todo",{
                        method:"POST",
                        headers: {
                            'Content-Type':'application/json',
                        },
                        body:JSON.stringify({
                                title:title,
                                description:description,
                                completed:false
                            })
                    })
                }
               
                
            }}> Add a todo</button>

            {/* todo.create({
        title: payload.title,
        description: payload.description,
        completed: false
    })
    res.json({
        msg:"new todo added"
    }) */}
        </div>
    )
}

export default CreateTodo