import { View, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants/icons"; 

const TabIcon = ({ focused, icon }: any) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 50, 
        height: 50, 
        borderRadius: 25, 
        backgroundColor: focused ? "#A8B5DB" : "transparent", 
        padding: 8, 
      }}
    >
      <Image
        source={icon}
        style={{
          width: 24, 
          height: 24, 
          tintColor: focused ? "#fff" : "#A8B5DB", 
        }}
      />
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 20, 
          height: 60, 
          position: "absolute",
          bottom: 10,
          borderWidth: 1,
          borderColor: "#0f0D23",
          paddingTop: 10, 
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
