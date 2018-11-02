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
    Library: {
      Test: ["exam", "quiz", "assessment", "evaluation"],
      Tired: ["sleepy", "exhausted", "weary", "worn"],
      Happy: ["cheerful", "contented", "delighted", "ecstatic"]
    },
    DisplayWord: "",
    DisplayInputs: new Set(),
    TextInput: "",
    Score: 0,
    Message: ""
  };

  handleInput = text => {
    this.setState({ TextInput: text });
  };

  checkWord() {
    const word = this.state.TextInput;
    const synonyms = this.state.Library[this.state.DisplayWord];

    if (
      synonyms.includes(word) &&
      this.state.DisplayInputs.has(word) === false
    ) {
      this.setState({
        Score: this.state.Score + 1,
        DisplayInputs: this.state.DisplayInputs.add(word),
        Message: "Good Job! See if you can get more words",
        TextInput: ""
      });
    } else {
      this.setState({ Message: "Not a synonym, try again" });
    }
    //Reference the list of synonyms based on the DisplayWord local state,
    //Check for inclusion of word submitted.
    //Clear TextInput local state
  }

  componentDidMount() {
    const words = Object.keys(this.state.Library);
    const word = words[Math.floor(Math.random() * words.length)];
    this.setState({
      DisplayWord: word
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Game Screen !!</Text>
        <Text>Score: {this.state.Score}</Text>
        //Display random word from state libary //SetState for the display word
        //When and how to select random word. Do I set displayword state too?
        <Text>{this.state.DisplayWord}</Text>
        <TextInput
          style={{
            margin: 10,
            width: 200,
            height: 60,
            borderColor: "#7a42f4",
            borderWidth: 1,
            padding: 15,
            fontSize: 25
          }}
          underlineColorAndroid="transparent"
          placeholder="Synonym here"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleInput}
        />
        <Text>{this.state.Message}</Text>
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
