class EmployeePayrollData {

    //getter and setters
    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^([A-Z]{1}[a-z]{3,})+(\\s)+([A-Z]{1}[a-z]{3,})$');
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
        let genderRegex = RegExp('^[MF]$');
        if (genderRegex.test(gender))
            this._gender = gender;
        else throw 'Gender has to be M or F';
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        const date = new Date(startDate);
        if (date < Date.now())
            this._startDate = startDate;
        else throw 'Start date is after today';
    }

    get profilePic() {
        return this._profilePic;
    }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }

    get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }

    get salary() {
        return this._salary;
    }
    set salary(salary) {
        this._salary = salary;
    }

    get note() {
        return this._note;
    }
    set note(note) {
        this._note = note;
    }
    //method 
    // toString() {
    //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //     const empDate = this.startDate === undefined ? "undefined" :
    //         this.startDate.toLocaleDateString("en-US", options);
    //     return "id=" + this.id + ", name= " + this.name + ", salary=" + this.salary + ", gender=" +
    //         this.gender + ", department= " + this.department + ", profilePic= " + this.profilePic + ", startDate=" + empDate + ", note= " + this.note;
    // }
}
