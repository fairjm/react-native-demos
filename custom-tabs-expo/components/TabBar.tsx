import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import React, { useEffect, useState } from "react";
import TabBarButton from "./TabBarButton";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { icons } from "@/constants/icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const primaryColor = "#0891b2";
  const greyColor = "#737373";

  const [tabBarWidth, setTabBarWidth] = useState(0);
  const [tabBarItemWidth, setTabBarItemWidth] = useState(0);

  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.3);

  const visibleRoutes = state.routes.filter(
    (route) => !["_sitemap", "+not-found"].includes(route.name)
  );

  useEffect(() => {
    setTabBarItemWidth(tabBarWidth / visibleRoutes.length);
  }, [tabBarWidth, visibleRoutes]);

  useEffect(() => {
    translateX.value = withSpring(state.index * tabBarItemWidth, {
      damping: 15,
      stiffness: 120,
    });
    scale.value = withSpring(0.8, { damping: 10, stiffness: 100 });
    opacity.value = withTiming(0.2, {
      duration: 200,
      easing: Easing.out(Easing.exp),
    });

    // then reset it
    setTimeout(() => {
      scale.value = withTiming(1, { duration: 200 });
      opacity.value = withTiming(0.3, { duration: 200 });
    }, 300);
  }, [state.index, tabBarItemWidth]);

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { scale: scale.value }],
      width: tabBarItemWidth,
      opacity: opacity.value,
    };
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    setTabBarWidth(width);
  };

  return (
    <View style={styles.tabbar} onLayout={onLayout}>
      <Animated.View
        style={[styles.backgroundContainer, animatedBackgroundStyle]}
      >
        <View style={styles.background} />
      </Animated.View>
      {visibleRoutes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name as keyof typeof icons}
            color={isFocused ? primaryColor : greyColor}
            label={label}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    gap: 4,
  },
  backgroundContainer: {
    position: "absolute",
    height: "100%",
    justifyContent: "center",
  },
  background: {
    backgroundColor: "rgba(8, 145, 178, 0.5)", // Light version of primaryColor
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 10,
  },
});

export default TabBar;
