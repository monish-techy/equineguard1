let form = document.getElementById("form");
let validationBox = document.querySelector(".validation-box");


//Equine Class 
class Equine {
    constructor(name, type, breed, gender, age, weight,id) {
        this.name = name;
        this.type = type;
        this.breed = breed;
        this.gender = gender;
        this.age = age;
        this.weight = weight;
        this.id = id;
    }
    
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
            const id = (Math.floor(Date.now()/(Math.random()*1000000)));
            let equine = new Equine(name, type, breed, gender, age, weight,id);
            //Clear fields
            document.querySelector("#name").value = "";
            const typeRadio = document.querySelectorAll("input[name='type']")
            typeRadio.forEach(radio => {
                radio.checked = false
            });
            document.querySelector("#breed").value = "";
            const genderRadio = document.querySelectorAll("input[name='gend']")
            genderRadio.forEach(radio => {
                radio.checked = false
            });
            document.querySelector("#age").value = "";
            document.querySelector("#weight").value = "";
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
            

            

             

        }
    }
    );
}
);