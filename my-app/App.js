import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CreateProject from "./screens/CreateProject";
import ProjectScreen from "./screens/ProjectScreen";
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F8F8F8',
            },
            headerTitleStyle: {
              color: '#fb5b5a',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("CreateProject")}
                style={{ marginRight: 10 }}
              >
                <Icon name="plus" size={24} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="CreateProject"
          component={CreateProject}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProjectScreen"
          component={ProjectScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
