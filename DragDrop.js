

var btn = document.querySelector('.add');
var remove = document.querySelector('.draggable');
var nodeList = document.querySelectorAll(".content-entities")


//check attributes cua element tab
const checkNode = (nodeList,checkAttrData) =>
{ 
  var node
  for(let i =0;i<nodeList.length;i++)
  {
    if(nodeList[i].attributes[0].value == checkAttrData)
    {
      return node=nodeList[i]
    }
  }
}

//add new card
const handleOnclickaddCard = (event) =>{

  const attrData = event.target.attributes[0].value
  var nodelist = document.querySelectorAll(".content-entities")

  node = checkNode(nodelist,attrData)

  var inputCard = document.querySelectorAll(".inputCard")

  nodeInput= checkNode(inputCard,attrData)

  console.log(nodeInput.value)
  if(nodeInput.value !='' && nodeInput !=" ")
 {   console.log(nodeInput.value)
  
  var creLi= document.createElement('li')
  creLi.setAttribute('data',`${attrData}`)
  creLi.setAttribute('ondblclick',`handleEditCard(event)`)
  creLi.classList.add('draggable')

  creLi.draggable=true
  creLi.innerHTML = `${nodeInput.value}<button onclick="handleDelete(event)" class="btn-delete">X</button>`

  node.appendChild(creLi)

  nodeInput.value=''
  var listItens = document.querySelectorAll('.draggable');
[].forEach.call(listItens, function(item) {
  addEventsDragAndDrop(item);
});}
} 

function dragStart(e) {
  if(e.target.className != 'apptrello')
  {
    e.stopPropagation();
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }else if(e.target.className === 'apptrello'){
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    
  }
};


function dragEnter(e) {
  e.stopPropagation();
    this.classList.add('over');
}

function dragLeave(e) {
 e.stopPropagation();
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

// Drop aPP
const dropTask = (e)=>{
    var cur = dragSrcEl
    var targetE = e.target
   var dropBody = document.querySelector('.dropTask')
      var newE = cur
      
      var classNamePareE= e.target.parentElement.parentElement
     
   if(newE.className == 'apptrello' && targetE.className=="dropTask")
   {
     dropBody.appendChild(newE)
     var listItens = document.querySelectorAll('.draggable');
     [].forEach.call(listItens, function(item) {
       addEventsDragAndDrop(item);
     });
    }
     else if(newE.className == 'apptrello' && classNamePareE.className=='apptrello')
     {
      if(classNamePareE.attributes[0].value != newE.attributes[0].value)
      {
        var temp = newE.innerHTML
        newE.innerHTML=classNamePareE.innerHTML
        classNamePareE.innerHTML=temp 

        var listItens = document.querySelectorAll('.draggable');
        [].forEach.call(listItens, function(item) {
          addEventsDragAndDrop(item);
        });
      }

     }
}

//DROP card
const dropul = (e) =>{
    var newE = dragSrcEl
   var cur = e.target
   console.log(newE,cur)
   if(newE.attributes[0].value == cur.attributes[0].value && newE.className=="draggable" && cur.className=="draggable over")
   {
      
        let temp = newE.innerHTML
        newE.innerHTML = cur.innerHTML
        cur.innerHTML = temp
 //       console.log(newE.attributes[0].value)
        e.stopPropagation();
   }else if(cur.className==='content-entities' && newE.className == 'draggable')
    {
     
        newE.attributes[0].value =  cur.attributes[0].value
 
     cur.appendChild(newE)
     e.stopPropagation();
     }else if(cur.className==='draggable over' && newE.className != 'apptrello')   
     {
      console.log(newE.className,cur.className)
      newE.attributes[0].value =  cur.attributes[0].value
         cur.parentElement.appendChild(newE)
         e.stopPropagation();
     }else if(newE.className == 'draggable' && e.target ==null){
        console.log(newE.className,"ok")
     }
     else{
      e.stopPropagation();
      e.preventDefault();
     }
}
function allowDrop(event) {
    event.preventDefault();
  }


function dragEnd(e) {
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    item.classList.remove('over');
  });
  this.style.opacity = '1';
}



function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('dragend', dragEnd, false);
  
}

function addEventsTaskDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('dragend', dragEnd, false);
}



var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    addEventsDragAndDrop(item);
  });

const addEventCard = ()=>{
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    addEventsDragAndDrop(item);
  });
}

const addEventApp= () =>{
  var listTask = document.querySelectorAll(".apptrello");
  [].forEach.call(listTask, function(item) {
      addEventsTaskDragAndDrop(item)
  });
  
}
// app 


function addNewItem() {
  var newItem = document.querySelector('.input').value;
  if (newItem != '') {
    document.querySelector('.input').value = '';
    var li = document.createElement('li');
    var attr = document.createAttribute('draggable');
    var ul = document.querySelector('ul');
    li.className = 'draggable';
    attr.value = 'true';
    li.setAttributeNode(attr);
    li.appendChild(document.createTextNode(newItem));
    ul.appendChild(li);
    addEventsDragAndDrop(li);
  }
}

//Edit card (Enterkey = update)
const handleEditCard = (e) =>{

  const dataAttr = e.target.attributes[0].value
  console.log(dataAttr)
  var inputCard = document.createElement("INPUT");
  inputCard.setAttribute("data", dataAttr);
  inputCard.setAttribute("type", "text");
  inputCard.classList.add('inputEdit')
  e.target.replaceWith(inputCard);
  inputCard.addEventListener("keypress", function(event) {
    
    if (event.key === "Enter") {
      
      var creLi= document.createElement('li')
      creLi.setAttribute('data',`${dataAttr}`)
      creLi.setAttribute('ondblclick',`handleEditCard(event)`)
      creLi.classList.add('draggable')

      creLi.draggable=true
      creLi.innerHTML = `${inputCard.value}<button onclick="handleDelete(event)" class="btn-delete">X</button>`
      addEventCard()

      inputCard.replaceWith(creLi)
      event.preventDefault();
      
    }
  });
  
 
}


const handleDelete = (event) =>{
  console.log(event.target.parentElement)
  event.target.parentElement.remove();
  event.preventDefault();
}

// const searchCard  = (event) =>{
//   const task = event.target.parentElement.parentElement.attributes[0].value
//   var nodelist = document.querySelectorAll('.content-entities')
//   var node
//    for(let i=0;i<nodelist.length;i++)
//    {
//       const data = []
//       var check;
//       if(nodelist[i].attributes[0].value==task)
//       {
//          node = nodelist[i]
       
//          for(let j=0;j<node.getElementsByTagName("li").length;j++)
//          {
          
//            data.push(node.getElementsByTagName("li")[j].innerText)
//          }

//          data.map(item =>{
//           check = item.includes(event.target.value)
//           if(check=true)
//           {
//             var creLi= document.createElement('li')
//           creLi.setAttribute('data',`${node.attributes[0].value}`)
//           creLi.classList.add('draggable')
          
//           creLi.draggable=true
//           creLi.innerHTML = `${item}  <button onclick="handleDelete(event)" class="btn-delete">X</button>`
        
//           node.appendChild(creLi)
//           }
//          })
//          }
//       }
//    }
  
    // const data = []
    // data.push(event.target.value)
    // const check = data.includes(event.target.value)
    // if(check=true)
    // {
    //   data.map(item =>{
    //     return(`<li data="task1" ondblclick="handleEditCard(event)"  class="draggable" draggable="true">${item}
    //     <button onclick="handleDelete(event)" class="btn-delete">X</button>
    //   </li>`)
    //   })
    // }

    

const checkNumberTab = () =>{
    var appE = document.querySelectorAll('.apptrello')
    return appE.length
}

const handleOnclickaddTab = (event) =>{
    const numberTab =checkNumberTab()+1
      const tab = document.createElement('div')
      tab.innerHTML = `  <div data="task${numberTab}" class="apptrello" draggable="true" >
      <div class="header">
        <div class="header-title">App ${numberTab}</div>
        <div class="body-img"><img class="size-img" width="100%" src="thum.jpg"/></div>
      </div>
      <div class="content">
      <ul data="task${numberTab}" id="Entites" ondrop="dropul(event)" ondragover="allowDrop(event)" class="content-entities">
        <li data="task${numberTab}" ondblclick="handleEditCard(event)"  class="draggable" draggable="true">Text 1
          <button onclick="handleDelete(event)" class="btn-delete" >X</button>
        </li>
        <li data="task${numberTab}" ondblclick="handleEditCard(event)"  class="draggable" draggable="true">Text 2
          <button onclick="handleDelete(event)" class="btn-delete" >X</button>
        </li>
      </ul>
      </div>
      <div data="task${numberTab}" class="footer"><button data="task${numberTab}" onclick="handleOnclickaddCard(event)" class="btn-addCard">+Card</button><input data="task${numberTab}" class="inputCard" type="text">
        <button onclick="handleOnclickaddTab(event)" class="btn-addTab">+Tab</button></div>
   </div>`

    const body = document.getElementById("main");
    body.appendChild(tab)
   
    addEventCard()
    addEventApp()
}