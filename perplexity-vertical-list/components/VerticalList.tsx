import {
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  View,
  Text,
} from "react-native";
import React from "react";
import { Item } from "@/utils/mockData";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { height } = Dimensions.get("window");
const _spacing = 8;
const _itemSize = height * 0.75;
const _itemFullSize = _itemSize + _spacing * 2;

type AnimatedCardProps = {
  item: Item;
  index: number;
  scrollY: SharedValue<number>;
};

const AnimatedCard = ({ item, index, scrollY }: AnimatedCardProps) => {
  const styles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0.3, 1, 0.3]
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.92, 1, 0.92]
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        styles,
        {
          flex: 1,
          height: _itemSize,
          padding: _spacing * 2,
          borderRadius: 8,
          gap: _spacing,
        },
      ]}
    >
      <Image
        source={{ uri: item.image }}
        blurRadius={50}
        style={[
          StyleSheet.absoluteFill,
          { height: _itemSize, borderRadius: 8 },
        ]}
      />
      <Image
        source={{ uri: item.image }}
        style={{ flex: 1, height: _itemSize * 0.4 }}
      />
      <View style={{ gap: _spacing }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
          {item.title}
        </Text>
        <Text numberOfLines={3} style={{ color: "#ddd" }}>
          {item.description}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: _spacing }}
      >
        <Image
          source={{ uri: item.author.avatar }}
          style={{ width: 24, aspectRatio: 1, borderRadius: 12 }}
        />
        <Text style={{ fontSize: 12, color: "#ddd" }}>{item.author.name}</Text>
      </View>
    </Animated.View>
  );
};

type VerticalListProps = {
  data: Item[];
};

const VerticalList = ({ data }: VerticalListProps) => {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    // console.log("scroll", e.contentOffset.y);
    scrollY.value = e.contentOffset.y / _itemFullSize;
  });

  return (
    <Animated.FlatList
      onScroll={onScroll}
      data={data}
      contentContainerStyle={{
        paddingHorizontal: _spacing * 3,
        paddingVertical: (height - _itemFullSize) / 2,
        gap: _spacing * 2,
      }}
      keyExtractor={(item, index) => item.key}
      renderItem={({ item, index }) => (
        <AnimatedCard item={item} index={index} scrollY={scrollY} />
      )}
      snapToInterval={_itemFullSize}
      decelerationRate={"fast"}
      scrollEventThrottle={16}
    />
  );
};

export default VerticalList;

const styles = StyleSheet.create({});
