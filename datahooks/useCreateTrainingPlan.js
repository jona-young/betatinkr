import { useState } from 'react';
import { parseDate } from '../components/helpers/adjustTrainingCycleDates'

const useCreateTrainingPlan = (minimumDate) => {
    const [ form, setForm ] = useState({ 
        name: '',
        startDate: parseDate(new Date),
        endDate: parseDate(new Date(minimumDate)),
        activityType: '',
        weeksPerBlock: 0,
        deloadWeek: false,
        workoutsPerWeek: 0,
        blocks: []
    });

    const handleChange = (name, value) => {
        if (name == 'weeksPerBlock' || name == 'workoutsPerWeek') {
            if (Number.isNaN(parseFloat(value))) {
                setForm({...form, [name]: 0})
            } else {
                setForm({...form, [name]: parseInt(value)})
            }
        } else {
            setForm({...form, [name]: value})
        }
    }

    // Changes form on FormTrainingPlan which is a precursor to set deload weeks for all macrocycles
    const handleChangeDeloadWeek = () => {
        const newBool = !form.deloadWeek
        setForm({...form, ['deloadWeek']: newBool})
    }

    return { 
        form, 
        handleChange, 
        handleChangeDeloadWeek,
    }
}

export default useCreateTrainingPlan;