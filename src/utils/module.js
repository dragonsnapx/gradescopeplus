// Takes str in the form of "OCT 24 AT 11:00PM").
// Returns datetime object, in UTC time.
export function strToDateObj(dateStr){
    const monthsLookup = {
        'JAN' : '00',
        'FEB' : '01',
        'MAR' : '02',
        'APR' : '03',
        'MAY' : '04',
        'JUN' : '05',
        'JUL' : '06',
        'AUG' : '07',
        'SEP' : '08',
        'OCT' : '09',
        'NOV' : '10',
        'DEC' : '11'
    }

    const year = (new Date()).getFullYear();
    dateStr.toLowerCase();

    let strElements = dateStr.split(" ");
    strElements.splice(2, 1);

    let monthIndex = monthsLookup[strElements[0]];
    let day = strElements[1];

    let lastElement = strElements[2];
    console.log(lastElement);
    isPM = (lastElement.slice(-2) == "PM");
    lastElement = lastElement.substring(0, lastElement.length - 2);
    let [hours, minutes] = lastElement.split(":");

    if (isPM){
        hours = parseInt(hours) + 12;
    }

    if (hours == 24){
        hours = 12;
    } else if (hours == 12){
        hours = 0;
    }

    console.log(year, monthIndex, day, hours, minutes, isPM);
    return (new Date(year, monthIndex, day, hours, minutes));
}
