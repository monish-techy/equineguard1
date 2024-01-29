let form = document.getElementById("form");
let validationBox = document.querySelector(".validation-box");
let equineindex = 0;

//Equine Class 
class Equine {
    constructor(name, type, breed, gender, age, weight) {
        this.name = name;
        this.type = type;
        this.breed = breed;
        this.gender = gender;
        this.age = age;
        this.weight = weight;
    }
    
}
//Functions
let t = document.getElementById('datatable-body');
console.log(t)
function updateTable(equineindex)
{
let dataTable = document.getElementById('datatable-body');
console.log(dataTable);
equines = getEquine();
console.log(equines);
let row = document.createElement('tr');
let c1 = document.createElement('td');
let c2 = document.createElement('td');
let c3 = document.createElement('td');
let c4 = document.createElement('td');
let c5 = document.createElement('td');
let c6 = document.createElement('td');
console.log(equineindex);
c1.innerText=equines[equineindex].name;
c2.innerText=equines[equineindex].type;
c3.innerText=equines[equineindex].breed;
c4.innerText=equines[equineindex].gender;
c5.innerText=equines[equineindex].age;
c6.innerText=equines[equineindex].weight;

row.appendChild(c1);
row.appendChild(c2);
row.appendChild(c3);
row.appendChild(c4);
row.appendChild(c5);
row.appendChild(c6);

dataTable.appendChild(row);
equineindex++;
console.log(dataTable);
}
function getEquine()
 {
    let equines = JSON.parse(localStorage.getItem('equines'))||[];
    return equines;
 }
//Form submit
document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector("#name").value;
        const typeRadio = document.querySelector("input[name='type']:checked");
        const type = typeRadio ? typeRadio.value : null;
        const breed = document.querySelector("#breed").value;
        const genderRadio = document.querySelector("input[name='gend']:checked");
        const gender = genderRadio ? genderRadio.value : null;
        const age = document.querySelector("#age").value;
        const weight = document.querySelector("#weight").value;
        //Validation
        if (name == "" || type == null || breed == "" || gender == null || age == "" || weight == "") {
            validationBox.classList.add('showItem');
            validationBox.innerText = "Please fill all the values!!!";
            setTimeout(() => {
                validationBox.classList.remove('showItem');
            }, 3000);
        }

        else {
            let equine = new Equine(name, type, breed, gender, age, weight);
            //Clear fields
            // document.querySelector("#name").value = "";
            // const typeRadio = document.querySelectorAll("input[name='type']")
            // typeRadio.forEach(radio => {
            //     radio.checked = false
            // });
            // document.querySelector("#breed").value = "";
            // const genderRadio = document.querySelectorAll("input[name='gend']")
            // genderRadio.forEach(radio => {
            //     radio.checked = false
            // });
            // document.querySelector("#age").value = "";
            // document.querySelector("#weight").value = "";
            //Success Validation
            validationBox.classList.add('showItem', 'green');
            validationBox.innerText = "Data Successfully Added";
            setTimeout(() => {
                validationBox.classList.remove('showItem', 'green');
            }, 3000);
            let equines = JSON.parse(localStorage.getItem('equines'))|| [];
            // console.log(equines);
            equines.push(equine);
            localStorage.setItem('equines',JSON.stringify(equines));
            updateTable(equineindex);

            

             

        }
    }
    );
}
);