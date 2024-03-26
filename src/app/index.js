import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import ExerciseListItem from "../../src/components/ExerciseListItem";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { Text } from "react-native";
import client from "../graphqlClient";

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String) {
    exercises(muscle: $muscle, name: $name) {
      name
      muscle
      equipment
    }
  }
`;

export default function ExercisesScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => client.request(exercisesQuery),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching the exercises</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.exercises}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item, index }) => (
          <ExerciseListItem key={index} item={item} />
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "ghostwhite",
    justifyContent: "center",
    padding: 10,
  },
});
