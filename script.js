'use strict';


let eName = document.getElementById('floatingInput');
let department = document.getElementById('floatingDepartment');
let salary = document.getElementById('floatingSalary');
let createRecBtn = document.getElementById('createRec');
let table = document.querySelector('.table');
let myForm = document.getElementById('myForm');

let isEdit = false;


let getEmpData = () => {
    return JSON.parse(localStorage.getItem('empDataArr')) || [];
}


let empDataArr = [];

let createRecord = () => {


    if (isEdit) {

        let updateEmpRec = {
            empId: parseInt(document.getElementById('editEmpId').value), 
            empName: eName.value,
            empDept: department.value,
            empSalary: salary.value
        }


        let records = getEmpData();
        records = records.map(ele => (ele.empId == updateEmpRec.empId) ? updateEmpRec : ele);
        localStorage.setItem('empDataArr', JSON.stringify(records));
        isEdit = false;
        empDataArr = getEmpData();


    } else {

        let empObj = {
            empId: empDataArr.length == 0 ? 1 : empDataArr.length + 1,
            empName: eName.value,
            empDept: department.value,
            empSalary: salary.value
        }

        empDataArr.push(empObj);
        localStorage.setItem('empDataArr', JSON.stringify(empDataArr));

    }



    myForm.reset();
    viewRec();

}

let deleteRec = (id) => {

    let records = getEmpData();
    let rec = records.filter(ele => ele.empId != id);
    localStorage.setItem('empDataArr', JSON.stringify(rec));
    empDataArr = getEmpData();
    viewRec();

}



let editRec = (id) => {
    isEdit = true;

    let empRec = getEmpData();
    let singleRecord = empRec.find(ele => ele.empId == id);

    document.getElementById('editEmpId').value = id; 
    eName.value = singleRecord.empName;
    department.value = singleRecord.empDept;
    salary.value = singleRecord.empSalary;
};




let viewRec = () => {

    let fetchedData = getEmpData();

    table.innerHTML = `
    <tr>
    <th>#</th><th>Name</th><th>Department</th><th>Salary</th><th>Operation</th>
    </tr>`;

    fetchedData.forEach((empRec, index) => {
        table.innerHTML += `
        <td>${index + 1}</td>
        <td>${empRec.empName}</td>
        <td>${empRec.empDept}</td>
        <td>${empRec.empSalary}</td>
        <td>
           <button class="btn btn-primary"  onclick="editRec(${empRec.empId})">Edit</button>
           <button class="btn btn-primary"  onclick="deleteRec(${empRec.empId})">Delete</button>
        </td>
        `;
    })
}

viewRec();