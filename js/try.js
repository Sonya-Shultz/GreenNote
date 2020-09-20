const add_btn=document.getElementById('add_btn');
const del_btn = document.getElementById('del_btn');
let all_notes = [];
const inner_text=document.getElementById('inner_text');
const note_list=document.getElementById('note_list');
const dataStorage = window.localStorage;
let currentLocation = window.location;

console.log(123);

add_btn.addEventListener('click', ()=>{
    const oneNote = document.createElement ('LI');
    const someNote = new Note(Date.now(),'New','NEW', false, oneNote, dateToStr());
    all_notes.push(someNote);
    oneNote.className='my_note';
    oneNote.textContent= someNote.name +"\n"+ someNote.time;
    //oneNote.innerHTML=someNote.name +'<br>'+ someNote.time;
    oneNote.setAttribute('id', someNote.id);
    const selNoteId = someNote.id;
    note_list.insertBefore(oneNote, note_list.firstChild);
    all_notes.forEach(element => {
        const unSelNote = document.getElementById(element.id);
        if (element.id == selNoteId) {
            unSelNote.setAttribute('select', true);
            inner_text.value=element.text;
            element.isHold=true;
            currentLocation.hash=element.id+"/"+element.name;
        }
        else {unSelNote.setAttribute('select', false); 
            element.isHold=false;}
    });
    dataStorage.setItem("notes", JSON.stringify( all_notes));
})

window.onclick= function (event) {
    if (event.target.tagName === 'LI')
    {
        const selNote = document.getElementById(event.target.id);
        all_notes.forEach(element => {
            const unSelNote = document.getElementById(element.id);
            if (element.id != selNote.id) {unSelNote.setAttribute('select', false);  element.isHold=false;}
            else {unSelNote.setAttribute('select', true);
                currentLocation.hash=element.id+"/"+element.name;
                let text = element.text;
                inner_text.value=text;
                element.isHold=true;  
            }
        });
    }
    dataStorage.setItem("notes", JSON.stringify( all_notes));
};

window.addEventListener('load', () =>{
    let help = dataStorage.getItem("notes");
    if (help!=null && all_notes != null){
        all_notes=JSON.parse(help);
        all_notes.forEach(element => {
            element.__proto__=Note.prototype;
            const oneNote = document.createElement ('LI');
            oneNote.className='my_note';
            oneNote.textContent= element.name +"\n"+ element.time;
            oneNote.setAttribute('id', element.id);
            note_list.insertBefore(oneNote, note_list.firstChild);
        })
        all_notes.forEach(element => {
            const unSelNote = document.getElementById(element.id);
            unSelNote.setAttribute('select', false); 
            element.isHold=false;
        });
        let link = currentLocation.hash;
        if (link.length>0){
            const selNote = document.getElementById(link.substring(1,14));
            selNote.setAttribute('select', true);
            all_notes.forEach(element => {
                if (element.id==link.substring(1,14)){
                    element.isHold=true;
                    inner_text.value=element.text;
                }
            })
        }
    }
    else {all_notes=[]; dataStorage.setItem("notes", JSON.stringify( all_notes));}
})

window.onhashchange = function() {
    let link = currentLocation.hash;
    if (link.length>0) {
        const selNote = document.getElementById(link.substring(1,14));
        selNote.setAttribute('select', true);
        all_notes.forEach(element => {
            if (element.id==link.substring(1,14)){
                element.isHold=true;
                inner_text.value=element.text;
            }
            else {element.isHold=false;
                const unSelNote = document.getElementById(element.id);
                unSelNote.setAttribute('select', false);
            }
        })
    } 
    else {
        inner_text.value= "";
        all_notes.forEach(element => {
            element.isHold=false;
            const unSelNote = document.getElementById(element.id);
            unSelNote.setAttribute('select', false);
        })
    }  
}

del_btn.addEventListener('click', ()=>{
    let counter = 0;
    for (let i=0; i<all_notes.length; i++)
    {
        if (all_notes[i].isHold === true){
            counter=i;
        }
    }
    if (all_notes[counter].isHold === true)
    {
        inner_text.value='';
        const liToDel = document.getElementById(all_notes[counter].id);
        all_notes.splice(counter, 1);
        note_list.removeChild(liToDel);
    }
    currentLocation.hash='';
    dataStorage.setItem("notes", JSON.stringify( all_notes));
})

inner_text.addEventListener('input', ()=>{
    let text = inner_text.value;
    all_notes.forEach(element => {
        if (element.isHold == true){
            element.text=text;
            element.time=dateToStr();
            element.name=text.split('\n')[0].substring(0,20);
            const liToShow = document.getElementById(element.id);
            liToShow.textContent=element.name +"\n"+  element.time;
            currentLocation.hash=element.id+"/"+element.name;
            //liToShow.innerHTML=element.name +'<br>'+ element.time;
        }
    })
    dataStorage.setItem("notes", JSON.stringify( all_notes));
})
