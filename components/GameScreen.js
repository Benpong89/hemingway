import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";

class DetailsScreen extends Component {
  static navigationOptions = {
    title: "Game"
  };

  //Word library should eventually be passed in as props instead of local state.
  //Use local state for user TextInput

  state = {
    Test: ["exam", "quiz", "assessment", "evaluation"],
    Tired: ["sleepy", "exhausted", "weary", "worn"],
    Happy: ["cheerful", "contented", "delighted", "ecstatic"],
    DisplayWord: "",
    TextInput: ""
  };

  handleInput = text => {
    this.setState({ TextInput: text });
  };

  checkWord = word => {
    //Reference the list of synonyms based on the DisplayWord local state,
    //Check for inclusion of word submitted.
    //Clear TextInput local state
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Game Screen !!</Text>
        //Display random word from state libary //SetState for the display word
        <TextInput
          style={{
            margin: 15,
            height: 40,
            borderColor: "#7a42f4",
            borderWidth: 1
          }}
          underlineColorAndroid="transparent"
          placeholder="Synonym here"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleInput}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#7a42f4",
            padding: 10,
            margin: 15,
            height: 40
          }}
          onPress={() => this.checkWord()}
        >
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default DetailsScreen;
