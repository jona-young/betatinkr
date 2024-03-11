import { useContext, createContext } from 'react'
import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import * as Keychain from 'react-native-keychain'
import { API_URL } from '@env'
import { AuthContext } from './AuthContext'
import { createTrainingCycles } from '../components/helpers/createTrainingCycles'
import { checkWeekDifferencePerBlock } from '../components/helpers/adjustTrainingCycleDates.js'


const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({children}) => {
    const authContext = useContext(AuthContext)

    const authAxios = axios.create({
        baseURL: API_URL
    })

    const publicAxios = axios.create({
        baseURL: API_URL
    })
    authAxios.interceptors.request.use(
        config => {
          if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
          }
    
          return config;
        },
        error => {
          return Promise.reject(error);
        },
    );

    const refreshAuthLogic = (failedRequest) => {
        const data = {
            refreshToken: authContext.authData.refreshToken
        }
        
        const options = {
            method: 'POST',
            data,
            url: `${API_URL}refresh-token/`
        }

        return axios(options)
        .then(async tokenRefreshResponse => {
          failedRequest.response.config.headers.Authorization =
            'Bearer ' + tokenRefreshResponse.data.accessToken;

            authContext.setAccessToken(tokenRefreshResponse.data.accessToken)

            await Keychain.setGenericPassword(
                'token',
                JSON.stringify({
                accessToken: tokenRefreshResponse.data.accessToken,
                refreshToken: authContext.authData.refreshToken,
                }),
            );
    
            return Promise.resolve();
        })
        .catch((error) => {
            authContext.resetTokens()
        });
    }

    createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {})

    const getUserTrainingPlans =  async (setTrainingPlans) => {
        try {
            const response = await authAxios.get('user-training-plans')

            setTrainingPlans(response.data)
        } catch(e) {
            console.log(e)
        }
    }

    const postTrainingPlan = async (form, navigation, route, setErrors) => {
        setErrors({})
        try {
            if (!checkWeekDifferencePerBlock(form.startDate, form.endDate, form.weeksPerBlock, form.deload)) {
                setErrors({weeksPerBlock: 'Not enough weeks between the start and end dates for a training block of this many weeks!'})
                return 
            }

            if (form.weeksPerBlock == 0) {
                setErrors({weeksPerBlock: 'Weeks per Block cannot be set to 0!'})
                return
            } 

            if (form.workoutsPerWeek == 0) {
                setErrors({workoutsPerWeek: 'Workouts per Week cannot be set to 0!'})
                return
            }

            const cycles = await createTrainingCycles(form.startDate, form.endDate, form.weeksPerBlock, true, form.workoutsPerWeek)

            if (cycles.result == true){
                form.blocks = cycles.blocks
            }

            const response = await authAxios.post('training-plan', form)

            if (response) {
                navigation.navigate(route)
            }
        } catch(e) {
            setErrors(e.response.data.errors)
        }
    }

    const putTrainingPlan = async (form, navigation, route) => {
        try {
            const response = await authAxios.put('training-plan/' + form._id, form)
    
            if (response) {
                navigation.navigate(route)
            }
        } catch(e) {
            console.log(e)
        }
    }

    const deleteTrainingPlan = async (id, navigation, route, setTrainingPlans) => {
        try {
            const response = await authAxios.delete('training-plan/' + id)
    
            if (response) {
                setTrainingPlans(response.data)
                navigation.navigate(route)
            }
        } catch(e) {
            console.log(e)
        }
    }

    const postActivityTemplate = async (form, navigation, route, setErrors, setActivityTemplates) => {
        setErrors({})
        try {
            //error checking logic

            const response = await authAxios.post('activity-template', form)

            if (response) {
                setActivityTemplates(response.data)
                console.log(route)
                navigation.navigate(route)
            }
        } catch(e) {
            setErrors(e.response.data.errors)
        }
    }

    const getActivityTemplates = async (setActivityTemplates) => {
        try {
            const response = await authAxios.get('user-activity-templates')

            setActivityTemplates(response.data)
        } catch(e) {
            console.log(e)
        }
    }


    const putActivityTemplate = async (updatedActivity, activityIndex, navigation, route) => {
        try {
            const response = await authAxios.put('activity-template/' + activityIndex, updatedActivity)
    
            if (response) {
                navigation.navigate(route)
            }
        } catch(e) {
            console.log(e)
        }
    }

    const deleteActivityTemplate = async (id, navigation, route, setActivityTemplates) => {
        try {
            const response = await authAxios.put('delete-activity-template/' + id, {})
            
            if (response) {
                setActivityTemplates(response.data)
                navigation.navigate(route)
            }
        } catch(e) {
            console.log(e.response)
        }
    }

    const getProfileInformation = async (setProfileInfo) => {
        try {
            const response = await authAxios.get('user')

            setProfileInfo(response.data)
        } catch(e) {
            console.log(e)
        }
    }

    const deleteAccount = async (authContext, navigation, route) => {
        try {
            // const response = await authAxios.delete('user')
            console.log('yoooo lets gooooo!!!')

            // authContext.logout()
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <Provider
          value={{
            authAxios,
            publicAxios,
            getUserTrainingPlans,
            postTrainingPlan,
            putTrainingPlan,
            deleteTrainingPlan,
            postActivityTemplate,
            getActivityTemplates,
            putActivityTemplate,
            deleteActivityTemplate,
            getProfileInformation,
            deleteAccount
          }}>
          {children}
        </Provider>
      );
}

export {AxiosContext, AxiosProvider}