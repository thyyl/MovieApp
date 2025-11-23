import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from 'lucide-react-native';
import { HomeNavigator } from './HomeNavigator';

export type BottomTabStackParamList = {
  HomeStack: undefined;
};

const routeIcon = {
  HomeStack: <Home size={22} />,
};

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: () => routeIcon[route.name],
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeNavigator} />
    </Tab.Navigator>
  );
};
