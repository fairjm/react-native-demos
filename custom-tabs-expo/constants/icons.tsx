import { AntDesign, Feather } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

export const icons = {
  index: (props: Omit<IconProps<string>, "name">) => (
    <AntDesign name="home" size={26} {...props} />
  ),
  explore: (props: Omit<IconProps<string>, "name">) => (
    <Feather name="compass" size={26} {...props} />
  ),
  create: (props: Omit<IconProps<string>, "name">) => (
    <AntDesign name="pluscircleo" size={26} {...props} />
  ),
  profile: (props: Omit<IconProps<string>, "name">) => (
    <AntDesign name="user" size={26} {...props} />
  ),
};
