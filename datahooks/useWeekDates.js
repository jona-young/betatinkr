import { useState, useEffect } from 'react'
import { parseDate, formatDateAddEnd } from '../components/helpers/adjustTrainingCycleDates'

const useWeekDates = (startDate, weekShift) => {
    const [ dates, setDates ] = useState({ 
        start: '',
        end: '',
    });

    useEffect(() => {
        setDates({
            start: formatDateAddEnd(parseDate(startDate), weekShift),
            end: formatDateAddEnd(parseDate(startDate), weekShift + 1)
        })
    },[])

    return dates
}

export default useWeekDates;