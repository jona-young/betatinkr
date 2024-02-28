import { useState, useEffect } from 'react'
import { parseDate, formatDateAddStartDate, formatDateAddStartDatePlusOne } from '../components/helpers/adjustTrainingCycleDates'

const useWeekDates = (startDate, weekShift) => {
    console.log('hoho: ', startDate)
    const [ dates, setDates ] = useState({ 
        start: '',
        end: '',
    });

    useEffect(() => {
        setDates({
            start: formatDateAddStartDatePlusOne(parseDate(startDate), weekShift),
            end: formatDateAddStartDate(parseDate(startDate), weekShift + 1)
        })
    },[])

    return dates
}

export default useWeekDates;