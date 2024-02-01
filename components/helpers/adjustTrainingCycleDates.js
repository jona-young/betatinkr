import { format, addWeeks, subWeeks, subDays } from 'date-fns';

export const selectedDateParse = (dateStr, deload) => {
    const parsedDate = parseDate(dateStr)
    // update the end date of the training cycle/block by 1 week depending on add/remove of deload
    if (deload) {
        return formatDateAdd(parsedDate, 1)
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

export const selectedDateDiffParse = (dateStr, weekDiff) => {
    const parsedDate = parseDate(dateStr)

    if (weekDiff > 0) {
        return formatDateAdd(parsedDate, weekDiff)
    } else if (weekDiff < 0) {
        return formatDateSubtract(parsedDate, (weekDiff * -1))
    } else {
        //weekDiff == 0
        return format(parsedDate, 'yyyy-MM-dd')
    }
}

export const followingDatesDiffParse = (dateStartStr, dateEndStr, weekDiff) => {
    const parsedStart = parseDate(dateStartStr)
    const parsedEnd = parseDate(dateEndStr)

    if (weekDiff > 0) {
        return [formatDateAdd(parsedStart, weekDiff), formatDateAdd(parsedEnd, weekDiff)]
    } else if (weekDiff < 0) {
        return [formatDateSubtract(parsedStart, (weekDiff * -1)), formatDateSubtract(parsedEnd, (weekDiff * -1))]
    } else {
        //weekDiff == 0
        return [format(parsedStart, 'yyyy-MM-dd'), format(parsedEnd, 'yyyy-MM-dd')]
    }
}

export const parseDate = (dateString) => {
    const dateToParse = new Date(dateString)
    const parsedDate = new Date(dateToParse.getTime() + Math.abs(dateToParse.getTimezoneOffset() * 60000))

    return parsedDate
}

export const formatDateAdd =  (dateObj, weekShift) => {
    return format(addWeeks(dateObj, weekShift), 'yyyy-MM-dd')
}

export const formatDateSubtract =  (dateObj, weekShift) => {
    return format(subWeeks(dateObj, weekShift), 'yyyy-MM-dd')
}

export const formatDateAddEnd =  (dateObj, weekShift) => {
    return format(subDays(addWeeks(dateObj, weekShift), 1), 'yyyy-MM-dd')
}
