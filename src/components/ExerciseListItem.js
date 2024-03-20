import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function ExerciseListItem({ item }) {
  return (
    <Link href={`/${item.name}`} asChild>
      <Pressable style={styles.exerciseContainer}>
        <Text style={styles.exerciseTitle}>{item.name}</Text>

        <Text style={styles.subValue}>
          <Text>{item.muscle}</Text> | <Text>{item.equipment}</Text>
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    gap: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginHorizontal: 2,
  },

  exerciseTitle: {
    fontSize: 20,
    fontWeight: 500,
  },

  subValue: {
    color: "grey",
    textTransform: "capitalize",
  },
});
