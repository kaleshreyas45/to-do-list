'use strict';

// All Selectors
const searchInp = document.getElementById('search');
const inp = document.getElementById('inp');
const textArea = document.getElementById('addTxt');
const addButton = document.querySelector('.add');
const row = document.querySelector('.row');
const heading = document.querySelector('.heading');



// Check if is there are any notes already in localStorage
let notesArr = JSON.parse(localStorage.getItem('notes'));
if (notesArr == null) {
    notesArr = [];
    console.log('There is no any note');
}


const displayItem = function () {
    if (notesArr.length == 0) {
        notesArr = [];
        row.innerHTML = `<p style="font-size:1.3rem;">There is no any note! Please add a nice note! Have a fun :)</p> `;
    }
    else {
        // console.log(notesArr);
        heading.innerHTML = ` <h1 style="font-weight:600;">Your notes</h1>`;
        let markup = "";
        notesArr.forEach((element, index) => {
            markup = markup + `<div class="col-sm-3">
    <div class="card mt-3"  style="border:2px solid #212529;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id = "${index}" class="btn btn-outline-dark delete" style="border-radius: 50%; border:2px solid #212529;" onclick = deleteNote(this.id)>&times;</button>
        </div>
    </div>
</div>`;
            
            row.innerHTML = markup;
           
            

        });
    }
}
displayItem();
const setItem = function () {
    if (!textArea.value) return;
    notesArr.push(textArea.value);

    localStorage.setItem('notes', JSON.stringify(notesArr));
    // console.log(notesArr);
    displayItem();
    textArea.value = '';

}
addButton.addEventListener('click', setItem);
const deleteNote = function (index) {
    notesArr.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesArr));
    displayItem();
}

searchInp.addEventListener('click', function (e) {
    // console.log(notesArr);
    if(!inp.value) return;
    else if(notesArr.length==0) {
        inp.value = '';
        return;
    }
    const searchRes = [];
    notesArr.forEach((element, index) => {
        // console.log(element,index);
        if (element.includes(inp.value, 0)) {
            searchRes.push(`${index}`+ notesArr[index]);        
        }
    })
    
    heading.innerHTML =  `<h1 style="font-weight:600;">Search results</h1>`;
    row.innerHTML = '';
    let html = '';
    if(searchRes.length==0){
        row.innerHTML = `<p style="font-size:1.3rem;">There is no any search result for "${inp.value}" :( Please try something else! Have a fun :)</p> `;
        return;
    }
    inp.value = '';
    searchRes.forEach((ele, i) => {
        html = html + `<div class="col-sm-3">
        <div class="card mt-3"  style="border:2px solid #212529;">
            <div class="card-body">
                <h5 class="card-title">Note ${Number(ele[0]) + 1}</h5>
                <p class="card-text">${ele.slice(1)}</p>
                <button id = "${ele[0]}" class="btn btn-outline-dark delete" style="border-radius: 50%; border:2px solid #212529;" onclick = deleteNote(this.id)>&times;</button>
            </div>
        </div>
    </div>`;
    row.innerHTML = html;
    
    })


})














