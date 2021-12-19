const form = document.querySelector('form');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const yearBirthday = document.querySelector('#yearBirthday');
const citizen = document.querySelector('#citizen');
const departments = document.querySelector('.departments');
const submitBtn = document.querySelector('button[type="submit"]');
const position = document.querySelector(`.position`);



const tbody = document.querySelector('tbody');
console.log(submitBtn);

const table = {
    allEmployeers: JSON.parse(localStorage.getItem('tableData')) || [],
    initTable() {
        tbody.innerHTML = '';
        this.allEmployeers.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.firstname}</td>
                <td>${item.lastname}</td>
                <td>${item.yearBirthday}</td>
                <td>${item.isCitizen ? "Да" : 'Нет'}</td>
                <td>${item.department.text}</td>
                <td>${item.position.text}</td>
                <td><button type="button" class="remove btn btn-danger">удалить</button></td>`;
            tr.addEventListener('click', (e) => {
                if(e.target.classList.contains('remove')) {
                    this.removeItem(item.id);
                }
            });
            tbody.append(tr);
        });
    },
    removeItem(id){
       this.allEmployeers = this.allEmployeers.filter(item => item.id !== id);
       localStorage.setItem('tableData', JSON.stringify(this.allEmployeers));
       this.initTable();
    }
};


class Employee {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.yearBirthday = null;
        this.isCitizen = false;
        this.departments = [{
            value: 'bookkeeping',
            text: "Бухгалтерия"
        }, {
            value: 'legal',
            text: "Юридический"
        }, {
            value: 'hr',
            text: "HR"
        }, {
            value: 'it',
            text: "IT"
        }];
        this.position = [{
                type: 'trainee',
                value: 'trainee',
                text: 'стажер'
            }, {
                type: 'bookkeeping',
                value: 'accountant',
                text: 'бухгалтер'
            }, {
                type: 'bookkeeping',
                value: 'auditor',
                text: 'аудитор'
            },
            {
                type: 'hr',
                value: 'hr-expert',
                text: 'hr-специалист'
            },
            {
                type: 'hr',
                value: 'head depertment',
                text: 'руководитель отдела'
            },
            {
                type: 'it',
                value: 'frontend-developer',
                text: 'фронтенд-разработчик'
            },
            {
                type: 'it',
                value: 'backend-developer',
                text: 'бэкенд-разработчик'
            },
            {
                type: 'it',
                value: 'fullstack-developer',
                text: 'фуллстек-разработчик'
            },
            {
                type: 'legal',
                value: 'lawyer',
                text: 'юрист'
            },
            {
                type: 'legal',
                value: 'advocate',
                text: 'адвокат'
            },
        ];
    }

    get _yearBirthday() {
        return this.yearBirthday;
    }

    set _yearBirthday(value) {
        this.yearBirthday = value;
    }

    get _isCitizen() {
        return this.isCitizen;
    }

    set _isCitizen(value) {
        this.isCitizen = value;
    }

    get _position() {
        return this.position;
    }

    getAllPosition(select, department) {
        const position = document.querySelector(`.${select}`);
        position.innerHTML = '<option selected>Выберите должность</option>';
        this.position.forEach(item => {
            if (item.type === department || item.type === 'trainee') {
                const option = document.createElement('option');
                option.value = item.value;
                option.textContent = item.text;
                position.append(option);
            }
        });
        position.classList.remove('d-none');
    }

    createEmployer() {

        table.allEmployeers.push({
            id: table.allEmployeers.length ? table.allEmployeers[table.allEmployeers.length -1].id + 1 : 0,
            firstname: firstName.value.trim(),
            lastname: lastName.value.trim(),
            yearBirthday: yearBirthday.value,
            isCitizen: citizen.checked,
            department: this.departments.find(item => item.value === departments.value),
            position: this.position.find(item => item.value === position.value),
        });
        localStorage.setItem('tableData', JSON.stringify(table.allEmployeers));
        form.reset();
        position.classList.add('d-none');
    }
}

class Accountant extends Employee {
    constructor(firstname, lastname, yearBirthday, isCitizen) {
        super(firstname, lastname, yearBirthday, isCitizen);
    }
}


class HR extends Employee {
    constructor(firstname, lastname, yearBirthday, isCitizen) {
        super(firstname, lastname, yearBirthday, isCitizen);
    }
}

class IT extends Employee {
    constructor(firstname, lastname, yearBirthday, isCitizen) {
        super(firstname, lastname, yearBirthday, isCitizen);

    }
}


class Lawyer extends Employee {
    constructor(firstname, lastname, yearBirthday, isCitizen) {
        super(firstname, lastname, yearBirthday, isCitizen);
        this.experience = null;
    }
}



departments.addEventListener('change', (e) => {
    let newEmplyer = new Employee();
    newEmplyer.getAllPosition('position', e.target.value);
});


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switch (true) {
        case departments.value === 'bookkeeping':
            const newAccountant = new Accountant();
            newAccountant.createEmployer();
            table.initTable();
            break;
        case departments.value === 'legal':
            const newLawyer = new Lawyer();
            newLawyer.createEmployer();
            table.initTable();
            break;
        case departments.value === 'hr':
            const newHR = new HR();
            newHR.createEmployer();
            table.initTable();
            break;
        case departments.value === 'it':
            const newIT = new IT();
            newIT.createEmployer();
            table.initTable();
            break;
    }
});

table.initTable();