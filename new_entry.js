document.addEventListener('DOMContentLoaded',()=>{

function updateentryTable(entryindex){
    let entryTable = document.getElementById('entrytable-body');
    let entries = getEntries();
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
    if(entries[entryindex].monthtrip>75||entries[entryindex].todaytrip>3||entries[entryindex].eweight>60){
        c6.innerText="OverWorked";
        c6.classList.remove('green');
        c6.classList.add('red');
    }
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

eform.addEventListener('submit',(e)=>{
e.preventDefault();   
const ename = document.querySelector('#ename').value;
const eweight = document.querySelector('#eweight').value;
const datetime = document.querySelector('#edate').value;
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
    var todaytrip=0,todayweight=0;
    if (   entryDate.getDate() === today.getDate() && entryDate.getMonth() === today.getMonth() &&  entryDate.getFullYear() === today.getFullYear()) 
        {
        todaytrip++;
        todayweight += parseFloat(eweight);
    }
    var monthtrip=0,monthweight=0;
     if (entryDate.getMonth() === today.getMonth() && entryDate.getFullYear() === today.getFullYear()) {
        monthtrip++;
        monthweight += parseFloat(eweight);

    }
    const entry = new Entry(ename, eweight,datetime,todaytrip,todayweight,monthtrip,monthweight);
 //Success Validation
 evalidation.classList.add('showItem', 'bggreen');
 evalidation.innerText = "Data Successfully Added";
 setTimeout(() => {
     evalidation.classList.remove('showItem', 'bggreen');
 }, 3000);
//Clear fields
document.querySelector("#ename").value = "";
document.querySelector("#eweight").value = "";
document.querySelector("#edate").value = "";
 /**change made - author Het */
 const entriesInLocalStorage = JSON.parse(localStorage.getItem('entries')) || [];
 const indexInLocalStorage = getIndexInLocalStorage(entriesInLocalStorage, entry.ename);

 if (indexInLocalStorage >= 0) {
    const pastEntry = entriesInLocalStorage[indexInLocalStorage];
    const newEntry = new Entry(
        entry.ename,
        entry.eweight,
        entry.datetime,
        parseInt(entry.todaytrip) +parseInt(pastEntry.todaytrip),
        parseFloat(entry.todayweight) +parseFloat(pastEntry.todayweight),
        parseInt(entry.monthtrip) +parseInt(pastEntry.monthtrip),
        parseFloat(entry.monthweight) +parseFloat(pastEntry.monthweight)
    )
   
    entriesInLocalStorage[indexInLocalStorage] = newEntry;
    localStorage.setItem("entries", JSON.stringify(entriesInLocalStorage));    
    
 } 
 else {
    entriesInLocalStorage.push(entry);
    localStorage.setItem("entries", JSON.stringify(entriesInLocalStorage));

  
 }
 let entryindex=0;
 while(entryindex<entriesInLocalStorage.length)
 { 
    updateentryTable(entryindex);
    entryindex++;
 }
 /**change end */


}
});

/**change made author Het */
function getIndexInLocalStorage(entries, id) {
return entries.findIndex((entry) => entry.ename == id);
}
/**change end */

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
});
