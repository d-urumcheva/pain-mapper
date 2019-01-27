import { createBottomTabNavigator } from 'react-navigation';
import SettingsPage from '../pages/SettingsPage';
import HomePage from '../pages/HomePage';

const BottomTabs = createBottomTabNavigator({
    Home: {
        screen: HomePage

    }, 
    Settings: {
        screen: SettingsPage
    }
})

export default BottomTabs;
