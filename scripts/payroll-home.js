var isUpdate = false;
var empPayrollList = [];

window.addEventListener('DOMContentLoaded', function () {
    if (site_properties.use_local_storage.match("true")) {
        getEmpPayrollListFromStorage();
    } else {
        getEmployeePayrollListFromServer();
    }
    createInnerHtml();
});

const processEmployeePayrollDataResponse = () => {
    document.querySelector('.emp-count').textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem("editEmp");
    console.warn("list:" + empPayrollList);
};

const getEmpPayrollListFromStorage = () => {
    let empPayrollListJson = localStorage.getItem('EmployeePayrollList');
    empPayrollList = empPayrollListJson ? JSON.parse(empPayrollListJson) : [];
    processEmployeePayrollDataResponse();
};

const getEmployeePayrollListFromServer = () => {
    makePromiseCall("GET", site_properties.server_url, false).then(responseText => {
        empPayrollList = JSON.parse(responseText);
        processEmployeePayrollDataResponse();
    }).catch(error => {
        console.warn("Get error status: " + JSON.stringify(error));
    });
};

const createInnerHtml = () => {
    const headerHtml = `<th></th>
                <th>Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Start Date</th>
                <th>Actions</th>`;

    let innerHtml = `${headerHtml}`;

    for (let empPayrollData of empPayrollList) {
        innerHtml = `
                    ${innerHtml}
                    <tr>
                        <td><img class="profile" alt="" src="${empPayrollData._profilePic}"></td>
                        <td>${empPayrollData._name}</td>
                        <td>${empPayrollData._gender}</td>
                        <td>${getDeptHtml(empPayrollData._department)}</td>
                        <td>${empPayrollData._salary}</td>
                        <td>${stringifyDate(empPayrollData._startDate)}</td>
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

// Update employee details in payroll
const update = (node) => {
    isUpdate = true;
    console.log("For update: " + node.id.toString());

    let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
    if (!empPayrollData) return;
    localStorage.setItem("editEmp", JSON.stringify(empPayrollData));
    window.location.href = "../pages/payroll-form.html";

    isUpdate = false;
};

// Delete employee details from payroll
const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
    if (!empPayrollData) return;
    if(!confirm("Confirm delete?")) return;
    const index = empPayrollList.map(empData => empData.id)
        .indexOf(empPayrollData.id);
    empPayrollList.splice(index, 1);
    if (site_properties.use_local_storage.match("true")) {
        localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
        createInnerHtml();
    } else {
        const deleteURL = site_properties.server_url + empPayrollData.id.toString();
        makePromiseCall("DELETE", deleteURL, false).then(responseText => {
            createInnerHtml();
        }).catch(error => {
            console.log("DELETE error status: " + error.toString());
        });
    }
};