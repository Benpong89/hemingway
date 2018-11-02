import React, { Component } from "react";
import { Button, View, Text } from "react-native";

class DetailsScreen extends Component {
  static navigationOptions = {
    title: "Details"
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Game"
          onPress={() => this.props.navigation.push("Game")}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default DetailsScreen;
