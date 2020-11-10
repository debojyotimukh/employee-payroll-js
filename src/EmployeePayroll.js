//uc6 arrays

const IS_PART_TIME = 1;
const IS_FULL_TIME = 2;
const PART_TIME_HOURS = 4;
const FULL_TIME_HOURS = 8;
const WAGE_PER_HOUR = 20;
const MAX_HRS_IN_MONTH = 100;
const NUM_OF_WORKING_DAYS = 20;

function getWorkingHours(empCheck) {
    switch (empCheck) {
        case IS_PART_TIME:
            return PART_TIME_HOURS;
            break;
        case IS_FULL_TIME:
            return FULL_TIME_HOURS;
            break;
        default:
            return 0;
    }
}

function calcDailyWages(empHrs) {
    return empHrs * WAGE_PER_HOUR;
}

let totalEmpHrs = 0;
let totalWorkingDays = 0;
let empDailyWageArray = new Array();
let empDailyWageMap = new Map();
let empDailyHrsMap = new Map();

while (totalEmpHrs <= MAX_HRS_IN_MONTH && totalWorkingDays <= NUM_OF_WORKING_DAYS) {
    totalWorkingDays++;
    let empCheck = Math.floor(Math.random() * 10) % 3;
    let empHrs = getWorkingHours(empCheck);
    totalEmpHrs += empHrs;
    empDailyWageArray.push(calcDailyWages(empHrs));
    empDailyWageMap.set(totalWorkingDays, calcDailyWages(empHrs));
    empDailyHrsMap.set(totalWorkingDays, empHrs);
}

//UC7A-- calculate total wage using Array forEach traversal or reduce method
let totEmpWage = 0;
function sum(dailywage) {
    totEmpWage += dailywage;
}

empDailyWageArray.forEach(sum);

console.log("UC6-- Total days: " + totalWorkingDays + " Total Hrs: " + totalEmpHrs + " Emp Wages: " + totEmpWage);

function totalWages(totslWage, dailyWage) {
    return totslWage + dailyWage;

}

console.log("UC7A--Emp wage with reduce: " + Array.from(empDailyWageMap.values()).reduce(totalWages, 0));

//UC7B-- show the day along with daily wage using array map helper function
let dailyCntr = 0;
function mapDayWithWage(dailyWage) {
    dailyCntr++;
    return dailyCntr + "=" + dailyWage;
}

let mapDayWithWageArr = empDailyWageArray.map(mapDayWithWage);
console.log("UC7B--Daily Wage Map");
console.log(mapDayWithWageArr);

//UC7C-- show days when full time wage of 160 was earned
function fulltimewage(dailyWage) {
    return dailyWage.includes("160");
}

let fullDayWageArr = mapDayWithWageArr.filter(fulltimewage);
console.log("UC7-- Daily wage filter when fulltime wage earned");
console.log(fullDayWageArr);


//UC7D-- First occurance of a full time wage using find function
console.log("UC7D--First full time wage was earned on day: " + mapDayWithWageArr.find(fulltimewage));

//UC7E-- check if every element of full time wage is truely holding full time wage
console.log("UC7E-- check all element truly have full time wage: " + fullDayWageArr.every(fulltimewage));

function partTimeWage(dailyWage) {
    return dailyWage.includes("80");
}

//UC7F-- check if any part time wage
console.log("UC7F-- Check if any part time wage: " + mapDayWithWageArr.some(partTimeWage));

//UC7G-- find the number of days the employee worked
function totalDaysWorked(numOfDays, dailyWage) {
    if (dailyWage > 0) return numOfDays + 1;
    return numOfDays;
}

console.log("UC 7G-- Number of days Emp Worked: " + empDailyWageArray.reduce(totalDaysWorked, 0));

//UC9 Arrow functions

const findTotal = (totalVal, dailyVal) => {
    return totalVal + dailyVal;
}

let count = 0;
let totalHours = Array.from(empDailyHrsMap.values()).reduce(findTotal, 0);
let totalSalary = empDailyWageArray.filter(dailywage => dailywage > 0).reduce(findTotal, 0);
console.log("UC9A-- Emp wage with arrow:" + " Total Hours: " + totalHours + " Total wages: " + totalSalary);

let nonWorkingDays = new Array();
let partWorkingDays = new Array();
let fullWorkingDays = new Array();
empDailyHrsMap.forEach((value, key, map) => {
    if (value == 8) fullWorkingDays.push(key);
    else if (value == 4) partWorkingDays.push(key);
    else nonWorkingDays.push(key);
});
console.log("Full working days: " + fullWorkingDays);
console.log("Part working days: " + partWorkingDays);
console.log("Non working days: " + nonWorkingDays);
