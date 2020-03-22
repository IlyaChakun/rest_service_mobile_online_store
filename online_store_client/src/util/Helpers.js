import {localizedStrings} from "./Localization";



export function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    const monthNames = [
        localizedStrings.january,
        localizedStrings.february,
        localizedStrings.march,
        localizedStrings.april,
        localizedStrings.may,
        localizedStrings.june,
        localizedStrings.july,
        localizedStrings.august,
        localizedStrings.september,
        localizedStrings.october,
        localizedStrings.november,
        localizedStrings.december
    ];

    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + date.getDate() + ',' + year;
}  