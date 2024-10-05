import Tabs from "@/components/Tabs";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const tabs = ["#FF005C", "#FFBD00", "#00B3E6", "#00CC96", "gold"];

export default function Index() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Tabs
        data={[
          { icon: "LifeBuoy", label: "Buoy" },
          { icon: "Fish", label: "Fresh fish" },
          { icon: "Sailboat", label: "Sail" },
          { icon: "Ship", label: "Ship it" },
          { icon: "ShipWheel", label: "Manage it" },
        ]}
        onChange={(index) => setSelectedIndex(index)}
        selectedIndex={selectedIndex}
      />
      <LayoutAnimationConfig skipEntering>
        <Animated.View
          key={`tab-content-${selectedIndex}`}
          entering={FadeInRight.springify().damping(80).stiffness(50)}
          exiting={FadeOutLeft.springify().damping(80).stiffness(50)}
          style={{
            backgroundColor: tabs[selectedIndex],
            flex: 1,
            borderRadius: 8,
          }}
        ></Animated.View>
      </LayoutAnimationConfig>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    gap: 12,
  },
});
