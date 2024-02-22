import { createContext, useState } from 'react'
import * as Keychain from 'react-native-keychain'

const AuthContext = createContext()
const { Provider } = AuthContext

const AuthProvider = ({children}) => {
    const [ authData, setAuthData ] = useState({
        accessToken: null,
        refreshToken: null,
        authenticated: false
    })

    const logout = async () => {
        await Keychain.resetGenericPassword()

        resetTokens()
    }

    const getAccessToken = () => {
        return authData.accessToken
    }

    const setAccessToken = (_accessToken) => {
      if(authData.accessToken !== _accessToken) {
        setAuthData({ ...authData, accessToken: _accessToken})
      }
    }

    const setAllTokens = (objectData) => {
      setAuthData(objectData)
    }

    const resetTokens = () => {
      setAuthData({
        accessToken: null,
        refreshToken: null,
        authenticated: false
      })
    }

    return (
        <Provider
          value={{
            authData,
            getAccessToken,
            setAccessToken,
            setAllTokens,
            resetTokens,
            logout,
          }}>
          {children}
        </Provider>
      )
}

export {AuthContext, AuthProvider};