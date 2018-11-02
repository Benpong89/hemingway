import React, { Component } from "react";
import { Button, View, Text, TouchableOpacity, TextInput } from "react-native";
import { Library } from "../imports/library.js";
import { Styles } from "../imports/stylesheets.js";

class DetailsScreen extends Component {
  static navigationOptions = {
    title: "Game"
  };

  state = {
    Library: Library,
    DisplayWord: "",
    SeenWords: new Set(),
    DisplayInputs: [],
    TextInput: "",
    Score: 0,
    Message: ""
  };

  handleInput = text => {
    this.setState({ TextInput: text });
  };

  checkWord() {
    const word = this.state.TextInput.toLowerCase();
    const synonyms = this.state.Library[this.state.DisplayWord];

    if (synonyms.includes(word)) {
      this.setState({
        Score: this.state.Score + 1,
        DisplayInputs: this.state.DisplayInputs.concat(word),
        Message: "Good Job! See if you can get more words",
        TextInput: ""
      });
    } else {
      this.setState({ Message: "Not a valid entry try again!" });
    }
  }

  componentDidMount() {
    this.setWord();
  }

  setWord() {
    const words = Object.keys(this.state.Library).filter(
      word => !this.state.SeenWords.has(word)
    );
    const word = words[Math.floor(Math.random() * words.length)];
    this.setState({
      DisplayWord: word,
      SeenWords: this.state.SeenWords.add(word)
    });
  }

  nextWord() {
    if (this.state.DisplayWord === undefined) {
      this.setState({
        Message: "That's all the words! Thanks for playing!"
      });
    }

    if (this.state.DisplayInputs.length < 5) {
      this.setState({
        Score: this.state.Score - 2 < 0 ? 0 : this.state.Score - 2
      });
    }

    this.setWord();
    this.setState({
      DisplayInputs: []
    });
  }

  render() {
    const inputs = this.state.DisplayInputs.map((word, idx) => {
      return <Text key={idx}>{word + " "}</Text>;
    });

    return (
      <View style={Styles.container}>
        <Text style={Styles.title}>Welcome to Hemingway!</Text>
        <Text>Synonyms: {inputs}</Text>
        <Text>Score: {this.state.Score}</Text>
        <Text style={Styles.displayWord}>{this.state.DisplayWord}</Text>
        <TextInput
          style={Styles.textInput}
          placeholder="Synonym here"
          placeholderTextColor="#9a73ef"
          onChangeText={this.handleInput}
          value={this.state.TextInput}
        />
        <Text>{this.state.Message}</Text>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => this.checkWord()}
        >
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.button} onPress={() => this.nextWord()}>
          <Text style={{ color: "white" }}>Next Word</Text>
        </TouchableOpacity>
        <Text style={Styles.instructions}>
          How to Play: Type in a Synonym of the word in bold. For each synonym
          you get correctly, you get a score. Skip to next word after you get 5
          words. If you skip to next word before you reach 5 or more you will
          lose points.
        </Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default DetailsScreen;
