import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const Photo = ({
  item,
  index,
  width,
  height,
  scrollX,
}: {
  item: Photo;
  index: number;
  width: number;
  height: number;
  scrollX: SharedValue<number>;
}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.6, 1, 1.6]
          ),
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [15, 0, -15]
          )}deg`,
        },
      ],
    };
  });

  return (
    <View
      style={{
        width: width,
        height: height,
        overflow: "hidden",
        borderRadius: 16,
      }}
    >
      <Animated.Image
        source={{ uri: item.src.large }}
        style={[{ flex: 1 }, stylez]}
      />
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({});
