// components/Question.js
import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

export default function Question({ route, navigation }) {
  const { data, index, userAnswers } = route.params;
  const question = data[index];

  const [selected, setSelected] = useState([]);

  const handlePress = (i) => {
    if (question.type === "multiple-answer") {
      setSelected((prev) =>
        prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
      );
    } else {
      setSelected([i]);
    }
  };

  const handleNext = () => {
    const newAnswers = [...userAnswers, selected];
    if (index + 1 < data.length) {
      navigation.push("Question", {
        data,
        index: index + 1,
        userAnswers: newAnswers,
      });
    } else {
      navigation.navigate("Summary", {
        data,
        userAnswers: newAnswers,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.prompt}>{question.prompt}</Text>
      <ButtonGroup
        testID="choices"
        vertical
        buttons={question.choices}
        selectedIndexes={selected}
        onPress={handlePress}
      />
      <Button
        testID="next-question"
        title="Next Question"
        onPress={handleNext}
        disabled={selected.length === 0}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  prompt: { fontSize: 20, marginBottom: 20 },
});
