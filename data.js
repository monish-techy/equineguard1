document.addEventListener('DOMContentLoaded',()=>{
let equines = getEquine();
  while(equineindex<equines.length){
 updateTable(equineindex);
 equineindex++;
  }
});
let equineindex = 0;
function updateTable(equineindex)
{
let dataTable = document.getElementById('datatable-body');
equines = getEquine();
console.log(equines);
let row = document.createElement('tr');
let c1 = document.createElement('td');
let c2 = document.createElement('td');
let c3 = document.createElement('td');
let c4 = document.createElement('td');
let c5 = document.createElement('td');
let c6 = document.createElement('td');
let c7 = document.createElement('td');
console.log(equineindex);
c1.innerText=equines[equineindex].name;
c2.innerText=equines[equineindex].type;
c3.innerText=equines[equineindex].breed;
c4.innerText=equines[equineindex].gender;
c5.innerText=equines[equineindex].age;
c6.innerText=equines[equineindex].weight;
c7.innerText=equines[equineindex].id;

row.appendChild(c1);
row.appendChild(c2);
row.appendChild(c3);
row.appendChild(c4);
row.appendChild(c5);
row.appendChild(c6);
row.appendChild(c7);

dataTable.appendChild(row);

}
function getEquine()
 {
    let equines = JSON.parse(localStorage.getItem('equines'))||[];
    return equines;
 }
