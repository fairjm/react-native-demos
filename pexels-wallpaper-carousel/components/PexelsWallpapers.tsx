import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Photo from "./Photo";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
const uri =
  "https://api.pexels.com/v1/search?query=mobile wallpaper&orientation=portrait";

const _spacing = 10;

const BackdropPhoto = ({
  item,
  index,
  scrollX,
}: {
  item: Photo;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0]
      ),
    };
  });
  return (
    <Animated.Image
      source={{ uri: item.src.large }}
      style={[StyleSheet.absoluteFillObject, stylez]}
      blurRadius={50}
    />
  );
};
const PexelsWallpapers = () => {
  const { width } = Dimensions.get("screen");
  const _imageWidth = width * 0.7;
  const _imageHeight = _imageWidth * 1.76;

  const { data, isLoading } = useQuery<SearchPayload>({
    queryKey: ["wallpapers"],
    queryFn: async () => {
      const res = await fetch(uri, {
        headers: {
          Authorization: process.env.EXPO_PUBLIC_PEXELS_KEY!,
        },
      }).then((res) => res.json());
      console.log(res);
      return res;
    },
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
    // console.log(scrollX.value);
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={StyleSheet.absoluteFillObject}>
        {data?.photos.map((photo, index) => (
          <BackdropPhoto item={photo} index={index} scrollX={scrollX} />
        ))}
      </View>
      <Animated.FlatList
        horizontal
        snapToInterval={_imageWidth + _spacing}
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _imageWidth) / 2,
        }}
        decelerationRate={"fast"}
        data={data?.photos}
        style={{ flexGrow: 0 }}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item, index }) => {
          return (
            <Photo
              item={item}
              index={index}
              width={_imageWidth}
              height={_imageHeight}
              scrollX={scrollX}
            />
          );
        }}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
        showsHorizontalScrollIndicator={false}
      ></Animated.FlatList>
    </View>
  );
};

export default PexelsWallpapers;

const styles = StyleSheet.create({});
