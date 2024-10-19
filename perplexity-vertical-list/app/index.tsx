import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import VerticalList from "@/components/VerticalList";
import data from "@/utils/mockData";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <VerticalList data={data} />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
  },
});
