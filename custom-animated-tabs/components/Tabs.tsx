import { Pressable, StyleSheet, View } from "react-native";
import { icons } from "lucide-react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  LayoutAnimationConfig,
  LinearTransition,
} from "react-native-reanimated";
import React from "react";
import { MotiProps, MotiView } from "moti";
import { motifySvg } from "moti/svg";

type IconNames = keyof typeof icons;

type TabItem = {
  icon: IconNames;
  label: string;
};

type TabProps = {
  data: TabItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
};

type IconProp = {
  name: IconNames;
} & MotiProps;

const Icon = ({ name, ...rest }: IconProp) => {
  // eslint-disable-next-line import/namespace
  const IconComponent = motifySvg(icons[name])();
  return <IconComponent size={16} {...rest} />;
};

const Tabs = ({
  data,
  selectedIndex,
  onChange,
  activeColor = "#fff",
  inactiveColor = "#999",
  activeBackgroundColor = "#111",
  inactiveBackgroundColor = "#ddd",
}: TabProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 4,
      }}
    >
      {data.map((item, index) => {
        const isSelected = index === selectedIndex;
        return (
          <MotiView
            key={item.label}
            layout={LinearTransition.springify().damping(80).stiffness(200)}
            animate={{
              backgroundColor: isSelected
                ? activeBackgroundColor
                : inactiveBackgroundColor,
              overflow: "hidden",
              borderRadius: 8,
            }}
          >
            <Pressable
              onPress={() => onChange(index)}
              style={{
                padding: 12,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 4,
              }}
            >
              <Icon
                name={item.icon}
                animate={{
                  color: isSelected ? activeColor : inactiveColor,
                }}
              />
              <LayoutAnimationConfig skipEntering>
                {isSelected && (
                  <Animated.Text
                    entering={FadeInRight.springify()
                      .damping(80)
                      .stiffness(200)}
                    exiting={FadeOutRight.springify()
                      .damping(80)
                      .stiffness(200)}
                    style={{
                      color: isSelected ? activeColor : inactiveColor,
                      fontWeight: isSelected ? "bold" : "normal",
                    }}
                  >
                    {item.label}
                  </Animated.Text>
                )}
              </LayoutAnimationConfig>
            </Pressable>
          </MotiView>
        );
      })}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
