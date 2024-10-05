import React from "react";
import { Tabs } from "expo-router";
import TabBar from "../components/TabBar";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const _layout: React.FC = () => {
  return (
    <Tabs tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
};

export default _layout;
