import {useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CreateProject from "./screens/CreateProject";
import ProjectScreen from "./screens/ProjectScreen";
import CreateJornada from "./screens/CreateJornada";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ProjectContextProvider } from "./contexts/ProjectContext";
import AuthContextGlobal, { defaultAuthData } from './services/AuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

function App() {
  const Stack = createStackNavigator();
  const [authData, setAuthData] = useState(defaultAuthData)

  useEffect(() => {
    AsyncStorage.getItem('authData').then((authData) => {
      if (authData) {
        console.log(authData)
        setAuthData(authData)
      }
    })
  }, [])
  
  useEffect(() => {
    setTimeout(() => {
      if(authData){
        AsyncStorage.setItem('authData', authData)
      }else{
        AsyncStorage.clear()
      }
    })
  }, [authData])

  return (
    <AuthContextGlobal.Provider value={{ authData, setAuthData }}>
      {
        authData?
        <ProjectContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={({ navigation }) => ({
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: "#F8F8F8",
                  },
                  headerTitleStyle: {
                    color: "#fb5b5a",
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
                options={({ navigation, route }) => ({
                  headerLeft: null,
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: "#F8F8F8",
                  },
                  headerTitleStyle: {
                    color: "#fb5b5a",
                  },
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("CreateJornada");
                      }}
                      style={{ marginRight: 10 }}
                    >
                      <Icon name="plus" size={24} />
                    </TouchableOpacity>
                  ),
                })}
              />
              <Stack.Screen
                name="CreateJornada"
                component={CreateJornada}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ProjectContextProvider>
        :
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
          </Stack.Navigator>
        </NavigationContainer>
      }
    </AuthContextGlobal.Provider>
  );
}

export default App;
