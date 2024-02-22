import { useContext, createContext } from 'react'
import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import * as Keychain from 'react-native-keychain'
import { API_URL } from '@env'
import { AuthContext } from './AuthContext'
import { createTrainingCycles } from '../components/helpers/createTrainingCycles'


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

    const postTrainingPlan = async (form, navigation, route) => {

        try {
            const cycles = await createTrainingCycles(form.startDate, form.endDate, form.weeksPerBlock, true, form.workoutsPerWeek)

            if (cycles.result == true){
                form.blocks = cycles.blocks
            }

            const response = await authAxios.post('training-plan', form)

            if (response) {
                navigation.navigate(route)
            }
        } catch(e) {
            console.log(e)
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

    const deleteTrainingPlan = async (id, navigation, route) => {
        try {
            const response = await authAxios.delete('training-plan/' + id)
    
            if (response) {
                navigation.navigate(route)
            }
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
            deleteTrainingPlan
          }}>
          {children}
        </Provider>
      );
}

export {AxiosContext, AxiosProvider}