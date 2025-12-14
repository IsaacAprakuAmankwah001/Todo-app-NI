import useTheme from "@/hooks/useTheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {

  const {toggleDarkMode} = useTheme();

  return (
    <View style={styles.container} >
      <Text style={styles.content}>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity onPress={toggleDarkMode}> toggle the mode </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  content: {
    fontSize: 22,
  },
});