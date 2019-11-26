import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  state = {
    isEditing: false,
    isCompleted: false
  };

  render() {
    const { isCompleted } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._toggleComplete}>
          <View
            style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.unCompletedCircle
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Hello I'm a To Do</Text>
      </View>
    );
  }

  _toggleComplete = () => {
    return this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      };
    });
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    //borderRadius는 항상 width와 height의 절반이어야 한다.
    borderWidth: 3,
    marginRight: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  unCompletedCircle: {
    borderColor: "#f23657"
  },

  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20
  }
});