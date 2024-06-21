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
import AsyncStorage from "./services/AsyncStorage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function App() {
  const Stack = createStackNavigator();
  const [authData, setAuthData] = useState(defaultAuthData)

  useEffect(() => {
    console.log("Recolectando data");
    AsyncStorage.getData('authData').then((authData) => {
      if (authData) {
        setAuthData(authData)
      }
    })
  }, [])
  
  useEffect(() => {
    setTimeout(() => {
      if(authData){
        AsyncStorage.storeData('authData', authData)
      }else{
        AsyncStorage.clearAll()
      }
    })
  }, [authData])

  const logOut = async () => {
    setAuthData(defaultAuthData)
  };

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
                  headerTitleAlign: 'center',
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("CreateProject")}
                      style={{ marginRight: 10 }}
                    >
                      <Icon name="plus" size={24} />
                    </TouchableOpacity>
                  ),
                  headerLeft: () => (
                    <TouchableOpacity
                      onPress={() => {
                        logOut();
                      }}
                      style={{ marginLeft: 10 }}
                    >
                      <MaterialIcons name="exit-to-app" size={24} />
                    </TouchableOpacity>
                  ),
                })}
              />
              <Stack.Screen
                name="CreateProject"
                component={CreateProject}
                options={{ headerShown: true,
                  headerTitle: '', 
                  headerTintColor: '#000',
                }}
              />
              <Stack.Screen
                name="ProjectScreen"
                component={ProjectScreen}
                options={({ navigation }) => ({
                  headerShown: true,
                  headerTintColor: '#000',
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
                options={{ headerShown: true,
                  headerTitle: '', 
                  headerTintColor: '#000'
                }}
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
