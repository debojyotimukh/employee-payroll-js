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
};

const getEmpPayrollListFromStorage = () => {
    let empPayrollListJson = localStorage.getItem('EmployeePayrollList');
    empPayrollList = empPayrollListJson ? JSON.parse(empPayrollListJson) : [];
    processEmployeePayrollDataResponse();
};

const getEmployeePayrollListFromServer = () => {
    makePromiseCall("GET", site_properties.server_url, false).then(responseText => {
        let empPayrollResponse = JSON.parse(responseText);
        empPayrollList = empPayrollResponse.data;

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
                        <td><img class="profile" alt="" src="${empPayrollData.profilePic}"></td>
                        <td>${empPayrollData.name}</td>
                        <td>${empPayrollData.gender}</td>
                        <td>${getDeptHtml(empPayrollData.department)}</td>
                        <td>${empPayrollData.salary}</td>
                        <td>${stringifyDate(empPayrollData.startDate)}</td>
                        <td>
                            <img id="${empPayrollData.employeeId}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                            <img id="${empPayrollData.employeeId}" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
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

    let empPayrollData = empPayrollList.find(empData => empData.employeeId == node.id);
    if (!empPayrollData) return;
    localStorage.setItem("editEmp", JSON.stringify(empPayrollData));
    window.location.href = "../pages/payroll-form.html";

    isUpdate = false;
};

// Delete employee details from payroll
const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData.employeeId == node.id);
    if (!empPayrollData) return;
    if (!confirm("Confirm delete?")) return;
    const index = empPayrollList.map(empData => empData.employeeId)
        .indexOf(empPayrollData.employeeId);
    empPayrollList.splice(index, 1);
    if (site_properties.use_local_storage.match("true")) {
        localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
        createInnerHtml();
    } else {
        const deleteURL = site_properties.server_url + "delete/" + empPayrollData.employeeId.toString();
        makePromiseCall("DELETE", deleteURL, false).then(responseText => {
            createInnerHtml();
        }).catch(error => {
            console.log("DELETE error status: " + error.toString());
        });
    }

    document.querySelector('.emp-count').textContent = empPayrollList.length;
};