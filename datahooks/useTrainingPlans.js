import { API_URL } from '@env'

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