import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import { useScreenCountStore } from './screencount.store';

function HomeScreen() {
  
  const { count, increment, reset: resetCount } = useScreenCountStore();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <Text>Home Screen</Text>
      <Text>Screen Count: {count}</Text>
      <Button onPress={() => {
        increment();
        navigation.navigate("About", { count: count + 1, incrementCount: increment })
      }}>About Us</Button>
      <Button onPress={() => {
        increment();
        navigation.navigate("Contact", { count: count + 1, incrementCount: increment, resetCount: resetCount })
      }}>Contact Us</Button>
    </View>
  );
}

function AboutScreen({ route }) {
  const navigation = useNavigation();

  const count = route?.params?.count;
  const incrementCount = route?.params?.incrementCount;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>About Screen</Text>
      <Text>Screen Count: {count}</Text>
      <Pressable onPress={() => {
        incrementCount();
        navigation.navigate('Home', { count: count, incrementCount: incrementCount })
      }}>
        <Text>Go Home</Text>
      </Pressable>
      <Pressable onPress={() => navigation.popTo("Home")}>
        <Text>PopTo Home</Text>
      </Pressable>
    </View>
  );
}

function ContactScreen({ route }) {
  const navigation = useNavigation();
  
  
  const count = route?.params?.count;
  const incrementCount = route?.params?.incrementCount;
  const resetCount = route?.params?.resetCount;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Contact Screen</Text>
      <Text>Screen Count: {count}</Text>
      <Pressable onPress={() => {
        incrementCount();
        navigation.navigate('Home', { count: count, incrementCount: incrementCount })
      }}>
        <Text>Go Home</Text>
      </Pressable>
      <Pressable onPress={() => {
        resetCount();
        navigation.popToTop()
      }}>
        <Text>Go back to first screen in stack</Text>
      </Pressable>
    </View>
  );
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerStyle: { backgroundColor: '#f4511e' },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' }
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: "Overview"
      },
    },
    About: {
      screen: AboutScreen,
      options: {
        title: "Me",
        presentation: 'modal'
      }
    },
    Contact: {
      screen: ContactScreen,
      options: {
        title: "Contact"
      }
    }
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}