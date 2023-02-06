import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';

import AddImage from './screens/AddImage';
import IconButton from './components/UI/IconButton';
import { Colors } from './constant/colors';
import { useEffect, useState } from 'react';
import { init } from './util/database';
import AllImages from './screens/AllImages';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllImages"
            component={AllImages}
            options={({ navigation }) => ({
              title: 'Kolorimetri Kadar Kreatinin',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate('AddImage')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddImage"
            component={AddImage}
            options={{
              title: 'Tambahkan Pengujian Baru',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
