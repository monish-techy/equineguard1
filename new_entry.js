document.addEventListener('DOMContentLoaded',()=>{
 
    });
    let entryindex = 0;
    function updateentryTable(entryindex)
    {
    let entryTable = document.getElementById('entrytable-body');
    entries = getEntries();
    let entryId = entries[entryindex].ename;
    let existingRow = document.querySelector(`#entrytable-body [data-name="${entryId}"]`);
    if (existingRow) {
        const today = new Date();
        let existingDatetime = new Date(existingRow.children[2].innerText);
        if ( existingDatetime.getDate() === today.getDate() && existingDatetime.getMonth() === today.getMonth() &&  existingDatetime.getFullYear() === today.getFullYear()) 
            {
            entries[entryindex].todaytrip++;
            entries[entryindex].todayweight += eweight;
        }
         if (existingDatetime.getMonth() === today.getMonth() && existingDatetime.getFullYear() === today.getFullYear()) {
            entries[entryindex].monthtrip++;
            entries[entryindex].monthweight += eweight;
        }
        existingRow.children[1].innerText = entries[entryindex].eweight;
        existingRow.children[2].innerText = entries[entryindex].existingDatetime;
        existingRow.children[3].innerText = "Trips this month: " + entries[entryindex].monthtrip + " (Today: " + entries[entryindex].todaytrip + ")";
        existingRow.children[4].innerText = "Total weight this month:" + entries[entryindex].monthweight + "(Today:" + entries[entryindex].todayweight + ")";
        if(todaytrip>3||monthtrip>75){
        existingRow.children[5].innerText= 'OverWorked';
        existingRow.children[5].classList.add('red') ;
        }

        return;
    }
    let row = document.createElement('tr');
    let c1 = document.createElement('td');
    let c2 = document.createElement('td');
    let c3 = document.createElement('td');
    let c4 = document.createElement('td');
    let c5 = document.createElement('td');
    let c6 = document.createElement('td');
    c1.innerText=entries[entryindex].ename;
    c2.innerText=entries[entryindex].eweight;
    c3.innerText=entries[entryindex].datetime;
    c4.innerText= "Trips this month: " + entries[entryindex].monthtrip + " (Today: " + entries[entryindex].todaytrip + ")";
    c5.innerText="Total weight this month:"+entries[entryindex].monthweight+"(Today:"+entries[entryindex].todayweight+")";
    c6.innerText= "Okay";
    c6.classList.add('green');
    row.appendChild(c1);
    row.appendChild(c2);
    row.appendChild(c3);
    row.appendChild(c4);
    row.appendChild(c5);
    row.appendChild(c6);
    
    entryTable.appendChild(row);
    
    }


//Entry Class 
class Entry {
    constructor(ename, eweight,datetime,todaytrip,todayweight,monthtrip,monthweight) {
        this.ename = ename;
        this.eweight = eweight;
        this.datetime = datetime;
        this.todaytrip = todaytrip;
        this.todayweight = todayweight;
        this.monthtrip = monthtrip;
        this.monthweight = monthweight;
    }
    
}

let eform = document.getElementById('entryForm');
let evalidation = document.querySelector(".evalidation");
let todaytrip,monthtrip,todayweight,monthweight=0;
eform.addEventListener('submit',(e)=>{
e.preventDefault();   
const ename = document.querySelector('#ename').value;
const eweight = document.querySelector('#eweight').value;
const datetime = document.querySelector('#edate').value;
console.log(datetime);
 //Validation for empty
 let equines = getEquine();
    const enteredId = parseInt(document.querySelector('#ename').value); 
    const idExists = equines.some(equine => equine.id === enteredId);
 if (ename == "" || eweight == "" || datetime=="") {
    evalidation.classList.add('showItem');
    evalidation.innerText = "Please fill all the values!!!";
    setTimeout(() => {
        evalidation.classList.remove('showItem');
    }, 3000);
}
 //Validation for Id
   else if(!idExists){
        evalidation.classList.add('showItem');
        evalidation.innerText = "Please fill proper id!!!";
        setTimeout(() => {
            evalidation.classList.remove('showItem');
        }, 3000);
    }
    else{
        const today = new Date();
        const entryDate = new Date(datetime);
        
        if (   entryDate.getDate() === today.getDate() && entryDate.getMonth() === today.getMonth() &&  entryDate.getFullYear() === today.getFullYear()) 
            {
            todaytrip++;
            todayweight += eweight;
        }
         if (entryDate.getMonth() === today.getMonth() && entryDate.getFullYear() === today.getFullYear()) {
            monthtrip++;
            monthweight += eweight;
        }
        const entry = new Entry(ename, eweight,datetime,todaytrip,todayweight,monthtrip,monthweight);
     //Success Validation
     evalidation.classList.add('showItem', 'bggreen');
     evalidation.innerText = "Data Successfully Added";
     setTimeout(() => {
         evalidation.classList.remove('showItem', 'bggreen');
     }, 3000);
     let entries = JSON.parse(localStorage.getItem('entries'))|| [];
     entries.push(entry);
     localStorage.setItem('entries',JSON.stringify(entries));
     while(entryindex<entries.length)
     {
     updateentryTable(entryindex);
    entryindex++;
     }
    }
    
     

});

function getEquine()
 {
    let equines = JSON.parse(localStorage.getItem('equines'))||[];
    return equines;
 }
 function getEntries()
 {
    let entries = JSON.parse(localStorage.getItem('entries'))||[];
    return entries;
 }