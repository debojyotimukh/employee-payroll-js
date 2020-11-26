let isUpdate = false;
//let empPayrollList;

window.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem("editEmp");
    return createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = `<th></th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Start Date</th>
                    <th>Actions</th>`;

    //const empPayrollList = getEmpPayrollListFromStorage();
    //const empPayrollList =
    //getEmpPayrollListFromServer();
    let empPayrollList=[];
    makePromiseCall('GET', site_properties.server_url, true).then(responseText => {
        empPayrollList = JSON.parse(responseText);
        document.querySelector('#emp-count').textContent = empPayrollList.length;

        console.log("list"+empPayrollList);
        
    }).catch(error => {
        console.log("GET error status: " + JSON.stringify(error));
        //empPayrollList=[];
    });
    
    console.log(empPayrollList);
    console.warn("Received: " + empPayrollList);
    //document.querySelector('#emp-count').textContent = empPayrollList.length;
    let innerHtml = `${headerHtml}`;

    for (const empPayrollData of empPayrollList) {
        innerHtml = `
        ${innerHtml}
        <tr>
            <td><img class="profile" alt="" src="${empPayrollData._profilePic}"></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>            
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
                <img id="${empPayrollData.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                <img id="${empPayrollData.id}" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
            </td>
        </tr>`;
    }


    document.querySelector('#table-display').innerHTML = innerHtml;
};

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
    }
    return deptHtml;
};

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Narayan',
            _gender: 'male',
            _department: [
                'Engineering',
                'Finance'
            ],
            _salary: '500000',
            _startDate: '29 Oct 2019',
            _note: '',
            id: 10,
            _profilePic: '../assets/profile-images/Ellipse -2.png'
        },
        {
            _name: 'Aparna',
            _gender: 'Female',
            _department: [
                'Sales'
            ],
            _salary: '400000',
            _startDate: '29 Oct 2019',
            _note: '',
            id: 11,
            _profilePic: '../assets/profile-images/Ellipse -1.png'
        }
    ];
    return empPayrollListLocal;
};

const getEmpPayrollListFromStorage = () => {
    let empPayrollList = localStorage.getItem('EmployeePayrollList');
    return empPayrollList ? JSON.parse(empPayrollList) : [];
};

const processEmployeePayrollDataResponse = (payrollList) => {
    document.querySelector('.emp-count').textContent = payrollList.length;
    createInnerHtml();
    localStorage.removeItem("editEmp");

};

var getEmpPayrollListFromServer = () => {
    makePromiseCall('GET', site_properties.server_url, true).then(responseText => {
        empPayrollList = JSON.parse(responseText);
        console.log("list"+empPayrollList);
        
    }).catch(error => {
        console.log("GET error status: " + JSON.stringify(error));
        empPayrollList=[];
    });
    
    console.log(empPayrollList);
};

// Remove employee from payroll details
const remove = (node) => {
    let empPayrollList = getEmpPayrollListFromStorage();
    let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
    alert(empPayrollData.toString());
    alert(empPayrollData.id);
    if (!empPayrollData) return;
    const index = empPayrollList.map(empData => empData.id)
        .indexOf(empPayrollData.id);
    empPayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    createInnerHtml();
};


// Update employee details in payroll
const update = (node) => {
    isUpdate = true;

    let empPayrollList = getEmpPayrollListFromStorage();
    let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
    alert(empPayrollData.toString());
    alert(empPayrollData.id);
    if (!empPayrollData) return;
    localStorage.setItem("editEmp", JSON.stringify(empPayrollData));
    window.location.href = "../pages/payroll-form.html";

    isUpdate = false;
};


