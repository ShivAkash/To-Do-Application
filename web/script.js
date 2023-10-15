const  task_input = document.getElementById("task-input");
const add_btn = document.getElementById("add-btn");
const table_body = document.getElementById("table-body");

eel.expose
function displayTodo(todo)
{
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.innerText = todo['title'];

    let td2 = document.createElement("td");
    
    let td3 = document.createElement("td")

    let editinput = document.createElement("input");
        editinput.setAttribute("class","form-control")
        editinput.setAttribute("type","text");
        editinput.style.width = "70%";
        editinput.style.display = "inline-block";
    let editbtn = document.createElement("button");
    editbtn.textContent= "Edit";
    editbtn.setAttribute("data-id",todo['id']);
    editbtn.setAttribute("class","btn btn-primary");
    editbtn.setAttribute("type","button");
    editbtn.style.marginLeft = "5px";
    editbtn.style.marginBottom = "4px";
    editbtn.addEventListener("click",(event)=>{
        let id = event.target.getAttribute("data-id");
        editinput.setAttribute("id","input"+id);
        let edittitle = document.getElementById("input"+id).value;
    if(edittitle != ""){
        eel.edit_todo(parseInt(id),edittitle);
        location.reload()
    }
    
    })
    var editdiv = document.createElement("div");
    editdiv.setAttribute("id","editdiv");
    editdiv.setAttribute("class","input-group mb-3");
    editdiv.appendChild(editinput);
    editdiv.appendChild(editbtn);
    


    let deletebtn = document.createElement("button");
    deletebtn.setAttribute("data-id",todo['id']);
    deletebtn.setAttribute("type","button");
    deletebtn.textContent = "Del";
    deletebtn.setAttribute("class","btn btn-primary");
    deletebtn.setAttribute("type","button");
    deletebtn.style.marginLeft = "5px";
    deletebtn.style.marginBottom = "4px";
    deletebtn.addEventListener("click",(event)=>{

        let id = event.target.getAttribute("data-id");
        eel.delete_todo(parseInt(id));
        tr.remove()

    });
    
    td2.appendChild(editinput);
    td2.appendChild(editbtn);
    td3.appendChild(deletebtn);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3)
    table_body.appendChild(tr);

    task_input.value = "";

}

eel.expose
function displayAllTodos(todos){
    for (let todo of todos["todos"]){
        displayTodo(todo);
    }
}

add_btn.addEventListener("click", (event)=>{
    let content = task_input.value;
    if(content != ""){
        eel.create_todo(content)(displayTodo);
    }
})

eel.list_todo()(displayAllTodos)

