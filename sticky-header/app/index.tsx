import Header from "@/components/header";
import { StatusBar } from "expo-status-bar";
import { Image, View, Text } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

export default function Index() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    console.log("scrollY", event.contentOffset.y);
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SystemBars style="light" />
      <Header scrollY={scrollY} />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{
          gap: 10,
          paddingTop: 170,
          alignItems: "center",
        }}
      >
        {[...Array(10)].map((_, index) => {
          return (
            <View key={index} style={{ height: 200, width: "80%" }}>
              <Image
                source={require("../assets/images/image.png")}
                style={{ height: "100%", width: "100%", borderRadius: 10 }}
              />
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
}
