import { useState } from 'react';

const useWorkouts = (form) => {
    const [ workouts, setWorkouts ] = useState(form);

    const handleChange = (name, value) => {
        setForm({...form, [name]: value})
    }
    
    return { 
        workouts, 
        handleChange, 
    }
}

export default useWorkouts