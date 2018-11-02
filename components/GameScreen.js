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

  state = {
    Library: {
      Test: ["exam", "quiz", "assessment", "evaluation"],
      Tired: ["sleepy", "exhausted", "weary", "worn"],
      Happy: ["cheerful", "contented", "delighted", "ecstatic"]
    },
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
    // if (this.state.DisplayInputs.has(word)) {
    //   this.setState({ Message: "Already submitted!" });
    // }

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
    //Reference the list of synonyms based on the DisplayWord local state,
    //Check for inclusion of word submitted.
    //Clear TextInput local state
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
      <View style={styles.container}>
        <Text>Game Screen !!</Text>
        <Text>Synonyms: {inputs}</Text>
        <Text>Score: {this.state.Score}</Text>
        <Text style={styles.displayWord}>{this.state.DisplayWord}</Text>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="transparent"
          placeholder="Synonym here"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleInput}
        />
        <Text>{this.state.Message}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.checkWord()}
        >
          <Text style={{ color: "white" }}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.setWord()}>
          <Text style={{ color: "white" }}>Next Word</Text>
        </TouchableOpacity>
        <Text style={styles.instructions}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  instructions: {
    margin: 10,
    padding: 5
  },
  textInput: {
    margin: 10,
    width: 200,
    height: 60,
    borderColor: "#7a42f4",
    borderWidth: 1,
    padding: 15,
    fontSize: 25
  },
  displayWord: {
    margin: 10,
    fontSize: 25
  }
});

export default DetailsScreen;
