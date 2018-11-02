//To do
//1. Add 10 words to Library
//2. Seperate out CSS and Libary to another file. Is that possible?
//3. Style the game page some more. Background image?
//4. Try to publish again

//Long term to do
//1. Add different levels 5th grade reading level, 10th grade reading level, college level, etc.
//2. Thesaurus API?

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

  async checkWord() {
    const word = this.state.TextInput.toLowerCase();
    const synonyms = this.state.Library[this.state.DisplayWord];

    if (synonyms.includes(word)) {
      await this.setState({
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

  render() {
    const inputs = this.state.DisplayInputs.map((word, idx) => {
      return <Text key={idx}>{word + " "}</Text>;
    });

    return (
      <View style={Styles.container}>
        <Text>Game Screen !!</Text>
        <Text>Synonyms: {inputs}</Text>
        <Text>Score: {this.state.Score}</Text>
        <Text style={Styles.displayWord}>{this.state.DisplayWord}</Text>
        <TextInput
          style={Styles.textInput}
          underlineColorAndroid="transparent"
          placeholder="Synonym here"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleInput}
        />
        <Text>{this.state.Message}</Text>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => this.checkWord()}
        >
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.button} onPress={() => this.setWord()}>
          <Text style={{ color: "white" }}>Next Word</Text>
        </TouchableOpacity>
        <Text style={Styles.instructions}>
          How to Play: Type in a Synonym of the word in bold. For each synonym
          you get correctly, you get a score. Skip to next word after you get 5
          words. If you skip to next word before you reach 5 you will lose a
          points. Time limit is 60 seconds
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
