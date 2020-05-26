import React, {useState, useEffect} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {AppLoading} from "expo";
import * as Font from 'expo-font';
import {Asset} from 'expo-asset';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import {Text,  View, AsyncStorage,StyleSheet, TouchableOpacity } from 'react-native';
import ApolloClient from "apollo-boost";
import apolloClientOptions from './apollo';
import {ApolloProvider} from 'react-apollo-hooks';
import {ThemeProvider} from "styled-components"; 
import NavControllers from './components/NavControllers';
import { AuthProvider } from './AuthContext';
import styles from "./styles";


export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async() => {
    
    try{
      await Font.loadAsync({
      ...Ionicons.font
      });
      await Asset.loadAsync(require("./assets/logo.png")); 
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        request: async(operation)=>{
          const token = await AsyncStorage.getItem("jwt");
          console.log(token);
          return operation.setContext({headers:{Authorization:`Bearer ${token}`}});
        },
        ...apolloClientOptions
      });      
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if(isLoggedIn===null||isLoggedIn==="false"){
        setIsLoggedIn(false);
      }else{
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    }catch(e){
      console.log(e);
    }

  }
  useEffect(()=>{
    preLoad();
  },[]);

  

  return loaded && client &&isLoggedIn!==null? 
  (<ApolloProvider client={client}>
    <ThemeProvider theme={styles}>
      <AuthProvider isLoggedIn={isLoggedIn}>
        <NavControllers/>
      </AuthProvider>
    </ThemeProvider>
  </ApolloProvider>) : (<AppLoading />);
}

