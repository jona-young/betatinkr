/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { AxiosProvider } from './datastore/AxiosContext'
import { AuthProvider } from './datastore/AuthContext'


const Root = () => {
    return (
        <AuthProvider>
            <AxiosProvider>
                <App />
            </AxiosProvider>
        </AuthProvider>
    );
  };

AppRegistry.registerComponent(appName, () => Root);
