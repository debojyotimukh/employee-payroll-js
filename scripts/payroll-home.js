var empPayrollList=[];
window.addEventListener('DOMContentLoaded', function () {
    if (site_properties.use_local_storage.match("true")) {
        getEmpPayrollListFromStorage();
    } else {
        getEmployeePayrollListFromServer();
    }
    //getEmployeePayrollListFromServer();
    createInnerHtml();
});

const processEmployeePayrollDataResponse = () => {
    document.querySelector('.emp-count').textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem("editEmp");
    console.warn("list:"+empPayrollList);
};

const getEmpPayrollListFromStorage = () => {
    let empPayrollList = localStorage.getItem('EmployeePayrollList');
    return empPayrollList ? JSON.parse(empPayrollList) : [];
};

const getEmployeePayrollListFromServer = () => {
    makePromiseCall("GET", site_properties.server_url, false).then(responseText => {
        empPayrollList = JSON.parse(responseText);
        processEmployeePayrollDataResponse();
    }).catch(error => {
        console.log("Get error status: " + JSON.stringify(error));
        console.warn("Error fetching"+error);
        //empPayrollList = [];
        //processEmployeePayrollDataResponse();
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