const stringifyDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const newDate = !date ? "undefined" :
        new Date(Date.parse(date)).toLocaleDateString("en-GB", options);

    return newDate;
};

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
};

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
};

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
};

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;
    });
};
const generateEmployeeId = () => {
    let empId = localStorage.getItem("RecentID");
    empId = !empId ? 1 : (parseInt(empId) + 1).toString();
    localStorage.setItem("RecentID", empId);

    return empId;
};

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) selItems.push(item.value);
    });
    return selItems;
};

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
};

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
};
