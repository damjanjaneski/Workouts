import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import exercises from "../../assets/data/exercises.json";
import ExerciseListItem from "../../src/components/ExerciseListItem";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";

export default function ExercisesScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      return exercises;
    },
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
