import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Switch,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Icons from "./src/components/Icons";
import grid from "./assets/grid.png";
import { FontAwesome } from "@expo/vector-icons";

const App = () => {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>("");
  const [board, setBoard] = useState(new Array(9).fill("edit", 0, 9));
  const [isEnabled, setIsEnabled] = useState(false);
  const [circleWins , setCircleWins] = useState(0)
  const [crossWins , setCrossWins] = useState(0)
  const [draws , setDraws] = useState(0)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const reset = () => {
    setIsCross(false);
    setGameWinner("");
    setBoard(new Array(9).fill("edit", 0, 9));
  };

  function checkWinner(): string {
    // Check rows
    for (let i = 0; i < 9; i += 3) {
      if (
        board[i] !== "edit" &&
        board[i] === board[i + 1] &&
        board[i + 1] === board[i + 2]
      ) {
        return `${board[i]}`;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[i] !== "edit" &&
        board[i] === board[i + 3] &&
        board[i + 3] === board[i + 6]
      ) {
        return `${board[i]}`;
      }
    }

    // Check diagonals
    if (board[0] !== "edit" && board[0] === board[4] && board[4] === board[8]) {
      return `${board[0]}`;
    }

    if (board[2] !== "edit" && board[2] === board[4] && board[4] === board[6]) {
      return `${board[2]}`;
    }

    if (!board.includes("edit", 0)) {
      return `Draw`;
    }

    return "";
  }

  const handlePress = (i: number) => {
    board[i] = isCross ? "cross" : "circle";
    const winner = checkWinner();
    console.log(winner);
    setGameWinner(winner);
    setIsCross(!isCross);
    toggleSwitch();
    if (winner === "Draw") {
      setDraws(draws + 1)
      Alert.alert("Draw", "It's a draw!");
    } else if (winner) {
      if(winner == "cross"){
        setCrossWins ( crossWins + 1)
      }else{
        setCircleWins ( circleWins + 1)
      }
      Alert.alert("Winner", `Player ${winner} wins!`);
  }};

  return (
    <View className="w-full flex-1 bg-[#fff] flex justify-center items-center">
      <StatusBar />
      <View className="flex justify-center items-center mt-12">
        <View className="flex items-center justify-center flex-row gap-20">
          <View className="flex justify-center items-center">
            <FontAwesome name="circle-o" size={30} color="#79CADC" />
            <Text className=" font-bold text-lg text-[#79CADC]">{circleWins} Wins</Text>
          </View>
          <View className="flex justify-center items-center">
            <FontAwesome name="close" size={30} color="#3A98D4" />
            <Text className=" font-bold text-lg text-[#3A98D4]">{crossWins} Wins</Text>
          </View>
          <View className="flex justify-center items-center">
            <FontAwesome name="balance-scale" size={30} color="#9ea19e" />
            <Text className=" font-bold text-lg text-[#9ea19e]">{draws} Wins</Text>
          </View>
        </View>

        {/* {gameWinner ? (
          <Text>{gameWinner}</Text>
        ) : isCross ? (
          <Text>X's Turn</Text>
        ) : (
          <Text>O's Turn</Text>
        )} */}

        <ImageBackground
          source={grid}
          resizeMode="cover"
          className={` flex flex-row flex-wrap items-center justify-center aspect-square m-8`}
        >
          {board.map((box, i) => (
            <TouchableOpacity
              key={i}
              disabled={board[i] != "edit" || gameWinner ? true : false}
              className=" w-[33.333%] aspect-square  flex justify-center items-center"
              onPress={() => handlePress(i)}
            >
              <Icons name={board[i]} />
            </TouchableOpacity>
          ))}
        </ImageBackground>
        <View className="flex flex-row justify-center items-center border-2 border-slate-300 p-6 rounded-full mt-5 shadow-md shadow-[#79CADC] bg-white ">
          <FontAwesome name="circle-o" size={45} color="#79CADC" />
          <Switch
            trackColor={{ false: "#f4f3f4", true: "#f4f3f4" }}
            thumbColor={isEnabled ? "#3A98D4" : "#79CADC"}
            ios_backgroundColor="#3e3e3e"
            value={isEnabled}
            disabled={true}
            className=" scale-[2.2] mx-8"
          />
          <FontAwesome name="close" size={45} color="#3A98D4" />
        </View>
        <View className="flex flex-row justify-center items-center mt-14 p-6 ">
          <TouchableOpacity
            className="  bg-slate-300 p-6 flex justify-center items-center aspect-square  rounded-full w-20 border-2 border-slate-400"
            onPress={() => reset()}
          >
            <FontAwesome name="refresh" size={30} color="#fff" />
          </TouchableOpacity>
          <Text className=" mx-8 text-xl font-bold text-slate-400">
            2 Player
          </Text>
          <TouchableOpacity className="  bg-slate-300 p-6 flex justify-center items-center aspect-square  rounded-full w-20 border-2 border-slate-400">
            <FontAwesome name="cog" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;
