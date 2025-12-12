//import { View, Text } from 'react-native'       
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
  return (
    <Tabs
        screenOptions={{}}
    >
        <Tabs.Screen 
            name="index" 
            options={{
                title: 'Todos',
                tabBarIcon: ({color, size}) =>(
                    <Ionicons name="flash-outline" size={size} color={color} />
                ) ,
            }} 
        />

         <Tabs.Screen 
            name="settings" 
            options={{
                title: 'Settings',
                tabBarIcon: ({color, size}) =>(
                    <Ionicons name="settings" size={size} color={color}/>
                ) ,
            }} 
        />
    </Tabs>
  )
}

export default TabsLayout