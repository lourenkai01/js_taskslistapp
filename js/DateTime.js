class DateTime 
{
    constructor() {

        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 
        'November', 'December'];

    }

    getMonthString(monthIndex) {

        if(monthIndex < 0 || monthIndex >= this.months.length) 
            return 'No Mounth Found!';
        
        return this.months[monthIndex];
    }

    getDateString() {

        const currentDate = new Date();

        return `${this.getMonthString(currentDate.getMonth())} ${currentDate.getDate().toString()}, 
        ${currentDate.getFullYear()}`;
    }
}