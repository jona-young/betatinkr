import { useState } from 'react';

const useCreateTrainingPlan = () => {
    const [ form, setForm ] = useState({ 
        name: '',
        startDate: new Date(),
        endDate: new Date(),
        activityType: '',
        weeksPerBlock: 4,
        deloadWeek: false,
        workoutsPerWeek: 3,
        blocks: []
    });

    const handleChange = (name, value) => {
        setForm({...form, [name]: value})
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