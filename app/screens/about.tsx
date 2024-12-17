import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AboutLink from "../components/AboutLink";

const About = () => {
  return (
    <View style={styles.container}>
      <AboutLink title="Version" subtext="1.0" iconName={"cheese"} />
      {/* <AboutLink title='Third Party Notices' subtext='Libraries and APIs' iconName={"file-document"} /> */}
      <TouchableOpacity
        onPress={() => Linking.openURL("https://github.com/p1xleoff/playlist")}
      >
        <AboutLink
          title="Githib Repo"
          subtext="View Source Code"
          iconName={"github"}
        />
      </TouchableOpacity>
      {/* <AboutLink title='License' subtext='MIT License' iconName={"license"} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default About;
