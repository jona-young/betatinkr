import { API_URL } from '@env'
import { createTrainingCycles } from '../components/helpers/createTrainingCycles'

export const getTrainingPlans =  async (setTrainingPlans) => {
    try {
        const data = await fetch(`${API_URL}all-training-plans/`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        
        const json = await data.json();

        setTrainingPlans(json)
    } catch(e) {
        console.log(e)
    }
}

export const postTrainingPlan = async (form, navigation, route) => {
    try {
        const cycles = await createTrainingCycles(form.startDate, form.endDate, form.weeksPerBlock, true, form.workoutsPerWeek)

        if (cycles.result == true){

            form.blocks = cycles.blocks
        }

        const data = await fetch(`${API_URL}training-plan/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form),
        })

        const json = await data.json();

        if (json) {
            navigation.navigate(route)
        }

    } catch(e) {
        console.log(e)
    }
}

export const putTrainingPlan = async (form, navigation, route) => {
    try {
        const data = await fetch(`${API_URL}training-plan/` + form._id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form),
        })


        const json = await data.json();

        if (json) {
            navigation.navigate(route)
        }

    } catch(e) {
        console.log(e)
    }

}