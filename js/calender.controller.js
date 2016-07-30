var app = angular.module('calenderApp', []) ;
app.controller('CalenderCntrl', CalenderCntrl);

function CalenderCntrl($scope) {
    var vm = this;
    vm.monthList = [
        {label: "January", value: 0},
        {label: "February", value: 1},
        {label: "March", value: 2},
        {label: "April", value: 3},
        {label: "May", value: 4},
        {label: "June", value: 5},
        {label: "July", value: 6},
        {label: "August", value: 7},
        {label: "September", value: 8},
        {label: "October", value: 9},
        {label: "November", value: 10},
        {label: "December", value: 11}
    ];
    vm.weekDaysList = [
        {label: "MON", value: 0},
        {label: "TUE", value: 1},
        {label: "WED", value: 2},
        {label: "THU", value: 3},
        {label: "FRI", value: 4},
        {label: "SAT", value: 5},
        {label: "SUN", value: 6}
    ];
    vm.list = [];
    vm.appointmentList = [
        {
            title: "Skype Call With Datta",
            description: "Discussion of Product design & Architectural view of the System",
            day: 20,
            month: 9,
            year: 2016
        },
        {
            title: "Lunch With Harvey Spectre ",
            description: "Legal Adivisory",
            day: 28,
            month: 6,
            year: 2016
        },
        {
            title: "Dinner With Chandller Bing",
            description: "Statistical analysis and data reconfiguration",
            day: 20,
            month: 6,
            year: 2016
        },
        {
            title: "Interview With Clark Kent",
            description: "Daily Planet Interview",
            day: 25,
            month: 4,
            year: 2016
        },
        {
            title: "Appointment With Mike Ross",
            description: "Banking Problems Discussion",
            day: 29,
            month: 8,
            year: 2016
        }
    ];
    vm.disableAdd = true;
    vm.selectedMonth = 0;
    vm.showEditModal = false;
    vm.selectedYear = 2016;
    vm.value = 0;

    vm.showAppointment =  function (item) {
        console.log(item.value, item.month, item.year);
        vm.selectedDate = item.value + ' ' + vm.setMonth(item.month) + ' ' + item.year;
        var appointment = vm.checkAppointmentList(item);
        if(appointment != 0) {
            vm.title = appointment.title;
            vm.description = appointment.description;
            vm.disableAdd = true;
        } else {
            vm.disableAdd = false;
            vm.title = '';
            vm.description = '';
        }
        vm.value = item.value;
        vm.showEditModal = true;
    }

    vm.saveAppointment = function () {
        vm.appointmentList.push({
            title: vm.title,
            description: vm.description,
            year: vm.selectedYear,
            month: vm.getMonth(vm.selectedMonth),
            day: vm.value
        });
        console.log(vm.appointmentList);
        vm.showEditModal = false;
        vm.displayCalendar(vm.getMonth(vm.selectedMonth), vm.selectedYear);
    }

    vm.editAppointment = function () {
        for (var i = 0; i < vm.appointmentList.length; i++) {
            if(vm.appointmentList[i].day === vm.value
                && vm.appointmentList[i].month === vm.getMonth(vm.selectedMonth)
                && vm.appointmentList[i].year === vm.selectedYear) {
                        vm.appointmentList[i].title = vm.title;
                        vm.appointmentList[i].description = vm.description;
                }
        }
        vm.showEditModal = false;
    }

    vm.deleteAppointment =  function () {
        for (var i = 0; i < vm.appointmentList.length; i++) {
            if(vm.appointmentList[i].day === vm.value
                && vm.appointmentList[i].month === vm.getMonth(vm.selectedMonth)
                && vm.appointmentList[i].year === vm.selectedYear) {
                        vm.appointmentList.splice(i, 1);
                }
        }
        vm.showEditModal = false;
        vm.displayCalendar(vm.getMonth(vm.selectedMonth), vm.selectedYear);
    }

    vm.closeModal = function () {
        vm.showEditModal = false;
    }

    vm.checkAppointmentList = function (item) {
        for (var i = 0; i < vm.appointmentList.length; i++) {
            if(vm.appointmentList[i].day === item.value
                && vm.appointmentList[i].month === item.month
                && vm.appointmentList[i].year === item.year) {
                        return vm.appointmentList[i];
                }
        }
        return 0;
    }

    vm.displayCalendar =  function (month, year) {
        month = parseInt(month);
        year = parseInt(year);
        vm.list =[];
        var i = 0;
        var days = vm.getDaysInMonth(month+1,year);
        var firstOfMonth = new Date (year, month, 1);
        var startingPos = firstOfMonth.getDay();
        days += startingPos;
        for (i = 0; i < startingPos; i++) {
            vm.list.push({value: 0, month: month, year: year});
        }
        for (i = startingPos; i < days; i++) {
            var appointment = vm.checkAppointmentList({
                value: (i-startingPos+1),
                month: month,
                year: year
            }),
            currentDate = new Date(),
            active = (i-startingPos+1) === currentDate.getDate() && month === currentDate.getMonth() && (year-1900) === currentDate.getYear();
            if(appointment != 0) {
                if(active){
                    vm.list.push({value: (i-startingPos+1), month: month, year: year, flag: "active", appointment: true});
                } else {
                    vm.list.push({value: (i-startingPos+1), month: month, year: year, appointment: true});
                }
            } else {
                if(active){
                    vm.list.push({value: (i-startingPos+1), month: month, year: year, flag: "active", appointment: false});
                } else {
                    vm.list.push({value: (i-startingPos+1), month: month, year: year, appointment: false});
                }
            }
        }
        for (i=days; i<42; i++)  {
            vm.list.push({value: 0, month: month, year: year});
        }
        document.calControl.Go.focus();
    }


    vm.getMonth = function (label) {
        for (var i = 0; i < vm.monthList.length; i++) {
            if (label === vm.monthList[i].label) {
                return vm.monthList[i].value;
            }
        }
    }

    vm.setMonth = function (month) {
        for (var i = 0; i < vm.monthList.length; i++) {
            if (month === vm.monthList[i].value) {
                return vm.monthList[i].label;
            }
        }
    }

    vm.setToday = function () {
        var now   = new Date();
        var day   = now.getDate();
        var month = now.getMonth();
        var year  = now.getYear();
        if (year < 2000)
            year = year + 1900;
        this.focusDay = day;
        vm.selectedMonth = vm.setMonth(month);
        vm.selectedYear = year;
        vm.displayCalendar(month, year);
    }

    vm.selectDate = function () {
        var year  = vm.selectedYear,
        day   = 0,
        month = vm.getMonth(vm.selectedMonth);
        vm.displayCalendar(month, year);
    }

    vm.setPreviousYear = function() {
        var year  = vm.selectedYear,
            day   = 0,
            month = vm.getMonth(vm.selectedMonth);
        year--;
        vm.selectedYear = year;
        vm.displayCalendar(month, year);
    }

    vm.setPreviousMonth = function () {
        var year  = vm.selectedYear,
            day   = 0,
            month = vm.getMonth(vm.selectedMonth);
        if (month == 0) {
            month = 11;
            if (year > 1000) {
                year--;
                vm.selectedYear = year;
            }
        } else { month--; }
        vm.selectedMonth = vm.setMonth(month);
        vm.displayCalendar(month, year);
    }

    vm.setNextMonth = function () {
        var year  = vm.selectedYear,
            day   = 0,
            month = vm.getMonth(vm.selectedMonth);
        if (month == 11) {
            month = 0;
            year++;
            vm.selectedYear = year;
        } else { month++; }
        vm.selectedMonth = vm.setMonth(month);
        vm.displayCalendar(month, year);
    }

    vm.setNextYear = function () {
        var year = vm.selectedYear,
            day = 0,
            month = vm.getMonth(vm.selectedMonth);
        year++;
        vm.selectedYear = year;
        vm.displayCalendar(month, year);
    }

    vm.getDaysInMonth = function (month,year)  {
        var days;
        if (month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12)  days=31;
        else if (month==4 || month==6 || month==9 || month==11) days=30;
        else if (month==2)  {
            if (isLeapYear(year)) { days=29; }
            else { days=28; }
        }
        return (days);

    }

    vm.isLeapYear = function (Year) {
        if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
        return (true);
        } else { return (false); }
    }
};
;
