class EmployeePayrollData {
    //constructor
    constructor(...params) {
        this.id = params[0];
        this.name = params[1];
        this.salary = params[2];
        this.gender = params[3];
        this.startDate = params[4];
    }

    //getter and setters
    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw 'Name is incorrect';
    }

    get id() {
        return this._id;
    }
    set id(id) {
        if (id > 0)
            this._id = id;
        else throw 'Employee ID has to be positive';
    }

    get gender() {
        return this._gender;
    }
    set gender(gender) {
        let genderRegex = RegExp('[M][F]');
        if (genderRegex.test(gender))
            this._gender = gender;
        else throw 'Gender has to be M or F';
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        if (startDate < Date.now())
            this._startDate = startDate;
        else throw 'Start date is after today';
    }

    //method
    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = this.startDate === undefined ? "undefined" :
            this.startDate.toLocaleDateString("en-US", options);
        return "id=" + this.id + ", name= " + this.name + ", salary=" + this.salary + ", gender=" +
            this.gender + ", startDate=" + empDate;
    }
}

let employeePayrollData = new EmployeePayrollData(1, "Mark", 30000);
console.log(employeePayrollData.toString());
try {
    employeePayrollData.id = -1;
    console.log(employeePayrollData.toString());
} catch (e) {
    console.error(e);
}
try {
    employeePayrollData.name = "john";
    console.log(employeePayrollData.toString());
} catch (e) {
    console.error(e);
}

try {
    employeePayrollData.gender = 'H';
    console.log(employeePayrollData.toString());
} catch (e) {
    console.error(e);
}

try {
    employeePayrollData.startDate = new Date();
    console.log(employeePayrollData.toString());
} catch (e) {
    console.error(e);
}

let newEmployeePayrollData = new EmployeePayrollData(1, "Terrisa", 30000, "F", new Date());
console.log(newEmployeePayrollData.toString());