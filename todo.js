let colour = document.querySelectorAll(`input[type="radio"]`);
function storetheme(theme){
    localStorage.setItem("theme",theme)
}


function applytheme(){
    let activetheme =localStorage.getItem("theme")
    colour.forEach((theme)=>{
        if(activetheme === theme.id){
            theme.checked = true
        }
    })
}


colour.forEach((theme)=>{
    theme.addEventListener("click",()=>{
       storetheme(theme.id)
    })
})

document.onload = applytheme()



let li = document.querySelectorAll(".elements")

let newel = document.querySelector("#box1")

let addbtn = document.getElementById("box2")

let filter = document.getElementById("inp")

let ul = document.getElementsByClassName("group")

let ulul = document.getElementById("grp")

addbtn.addEventListener("click",addelement)

ulul.addEventListener("click",remove)

filter.addEventListener("keyup",filtertask)



function filtertask(e){
    let text= e.target.value.toLowerCase();
    let items = document.getElementsByTagName("li")
    Array.from(items).forEach((item)=>{
        let searchedtask =item.childNodes[0].textContent
        if(searchedtask.toLowerCase().indexOf(text) != -1){
            item.style.display= "block"
        }
        else{
            item.style.display = "none"
        }

    })

}


function remove(e){
    if(e.target.classList.contains("del")){
        if(confirm("Do you want to delete this task?")){
            ulul.removeChild(e.target.parentElement)
        }
    }

}


function addelement(e){

    let newtask = document.createElement("li");
    newtask.className="elements";
    newtask.setAttribute("draggable","true")
    newtask.append(newel.value)

    let deletebtn = document.createElement("button")
    deletebtn.className="del"
    deletebtn.append("X")

    newtask.append(deletebtn)
    ul[0].append(newtask)
    newel.value=""

    let newli = document.querySelectorAll("li") 
    
    newli.forEach((item)=>{
        item.addEventListener("dragstart", dragstart)
        item.addEventListener("dragover", dragover)
        item.addEventListener("drop",handledrop)

    })}

let dragsrc = null

function dragstart(e){
    dragsrc =this;
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/html", this.childNodes[0].data)
}

function dragover(e){
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"
}


function handledrop(e){
    if(dragsrc != this){
        dragsrc.childNodes[0].data = this.childNodes[0].data
        this.childNodes[0].data = e.dataTransfer.getData("text/html")
    }
}


li.forEach((item)=>{
    item.addEventListener("dragstart", dragstart)
    item.addEventListener("dragover", dragover)
    item.addEventListener("drop",handledrop)

})