import { format, addWeeks, subWeeks, addDays, subDays, differenceInDays } from 'date-fns';

export const selectedDateParse = (dateStr, deload) => {
    const parsedDate = parseDate(dateStr)
    // update the end date of the training cycle/block by 1 week depending on add/remove of deload
    if (deload) {
        return formatDateAddStartDate(parsedDate, 1)
    } else {
        return formatDateSubtract(parsedDate, 1)
    }
}

export const followingDatesParse = (dateStartStr, dateEndStr, deload) => {
    const parsedStart = parseDate(dateStartStr)
    const parsedEnd = parseDate(dateEndStr)

    // update the rest of the training cycle/blocks by 1 week depending on add/remove of the initial deload
    if (deload) {
        // move forward 1 week
        return [formatDateAdd(parsedStart, 1), formatDateAdd(parsedEnd, 1)]
    } else {
        // move backward 1 week
        return [formatDateSubtract(parsedStart, 1), formatDateSubtract(parsedEnd, 1)]
    }
}

export const parseDate = (dateString) => {
    const dateToParse = new Date(dateString)
    const parsedDate = new Date(dateToParse.getTime() - Math.abs(dateToParse.getTimezoneOffset() * 60000))

    return parsedDate
}

export const formatDateSubtract =  (dateObj, weekShift) => {
    return format(subWeeks(dateObj, weekShift), 'yyyy-MM-dd')
}

export const formatDateAddStartDate = (dateObj, weekShift) => {
    return format(addWeeks(dateObj, weekShift), 'yyyy-MM-dd')
}

export const formatDateAddStartDatePlusOne = (dateObj, weekShift) => {
    return format(addDays(addWeeks(dateObj, weekShift), 1), 'yyyy-MM-dd')
}

export const formatDateAddEndDate = (dateObj, weekShift) => {
    return format(subDays(addWeeks(dateObj, weekShift), 1), 'yyyy-MM-dd')
}

export const checkWeekDifferencePerBlock = (startDate, endDate, weeksPerBlock) => {
    const weekDifference = parseInt((differenceInDays(endDate, startDate) + 1) / 7)

    return weeksPerBlock <= weekDifference ? true : false
}