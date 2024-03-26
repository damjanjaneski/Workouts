import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import data from "../../assets/data/exercises.json";
import { Stack } from "expo-router";
import { useState } from "react";
import { gql } from "graphql-request";
import client from "../graphqlClient";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native-web";

export default function ExerciseDetailScreen() {
  const { name } = useLocalSearchParams();
  const [numOfLines, setNumOfLines] = useState({
    more: true,
    less: false,
    lines: 3,
  });

  const exerciseQuery = gql`
    query exercises($name: String) {
      exercises(name: $name) {
        equipment
        instructions
        muscle
        name
      }
    }
  `;

  const { data, isLoading, error } = useQuery({
    queryKey: ["exercise", name],
    queryFn: () => client.request(exerciseQuery, { name }),
  });

  const toggle = function () {
    setNumOfLines((numOfLines) => ({
      ...numOfLines,
      more: !numOfLines.more,
      less: !numOfLines.less,
      lines: numOfLines.lines === 3 ? 0 : 3,
    }));
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetchin data</Text>;
  }

  const exercise = data.exercises[0];

  if (!exercise) {
    return <Text>Exercise not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: `${exercise.name}` }} />
      <View style={styles.panel}>
        <Text style={styles.exerciseName}>
          Exercise Details: {exercise.name}
        </Text>

        <Text style={styles.exerciseSubtitle}>
          <Text style={styles.subValue}>{exercise.muscle}</Text> |
          <Text style={styles.subValue}>{exercise.equipment}</Text>
        </Text>
      </View>
      <View style={styles.panel}>
        <Text numberOfLines={numOfLines.lines} style={styles.instructions}>
          {exercise.instructions}
        </Text>

        <Text onPress={toggle} style={styles.seeMore}>
          {numOfLines.more ? "See More" : "See Less"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  panel: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  exerciseSubtitle: {
    color: "grey",
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 500,
  },
  subValue: {
    textTransform: "capitalize",
  },
  instructions: {
    fontSize: 16,
    lineHeight: 22,
  },
  panel: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  seeMore: {
    alignSelf: "center",
    padding: 10,
    fontWeight: 600,
    color: "grey",
  },
});
