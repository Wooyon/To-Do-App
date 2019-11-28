import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";
import { AppLoading } from "expo";
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false
  };

  componentDidMount = () => {
    this._loadToDos();
  };
  render() {
    const { newToDo, loadedToDos } = this.state;
    if (!loadedToDos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai to do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="New To Do"
            value={newToDo}
            onChangeText={this._controllNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          ></TextInput>
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"Hello I am To Do"} />
          </ScrollView>
        </View>
      </View>
    );
  }

  _controllNewToDo = text => {
    this.setState({ newToDo: text });
  };
  //이벤트에서 text를 가져오므로 ()안에 text라 씀

  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    });
  };

  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoOject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          //위는 내가 전에 가지던 모든 prevState들을 추가
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            //내가 가지던 모든 toDos들
            ...newToDoOject
            //새로운 todo오브젝트를 추가
            //...newToDo~는 newToDoObject : id : {text: 'new todo'}를 줄인거다(하나에 대하서만 적용)
          }
        };
        return { ...newState };
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f23657",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: -1
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});
