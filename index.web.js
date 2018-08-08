import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('rn_web', () => App);
AppRegistry.runApplication('rn_web', {
    rootTag: document.getElementById('react-root')
});