window.addEventListener('DOMContentLoaded', function () {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }

        try {
            (new EmployeePayrollData())._name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });

});

const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
    } catch (error) {
        return;
    }
};

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData._name = getInputValueById('#name');
    } catch (error) {
        setTextValue('.text-error', error);
        throw error;
    }
    employeePayrollData._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData._department = getSelectedValues('[name=department]');
    employeePayrollData._salary = getInputValueById('#salary');
    employeePayrollData._note = getInputValueById('#notes');
    employeePayrollData._date = getInputValueById('#startDate');
    alert(employeePayrollData.toString());
    return employeePayrollData;
};

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) selItems.push(item.value);
    });
};

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
};

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
};