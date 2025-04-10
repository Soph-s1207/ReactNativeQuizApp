import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

export default function Question({ route, navigation }) {
  const { data, index, userAnswers } = route.params;
  const question = data[index];

  const [selected, setSelected] = useState([]);

  const handleNext = () => {
    const updatedAnswers = [...userAnswers, selected];
    if (index + 1 < data.length) {
      navigation.push('Question', { data, index: index + 1, userAnswers: updatedAnswers });
    } else {
      navigation.navigate('Summary', { data, userAnswers: updatedAnswers });
    }
  };

  const handlePress = (selectedIndex) => {
    if (question.type === "multiple-answer") {
      const alreadySelected = selected.includes(selectedIndex);
      setSelected(alreadySelected ? selected.filter(i => i !== selectedIndex) : [...selected, selectedIndex]);
    } else {
      setSelected([selectedIndex]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.prompt}>{question.prompt}</Text>
      <ButtonGroup
        testID="choices"
        buttons={question.choices}
        selectedIndexes={selected}
        onPress={handlePress}
        vertical
      />
      <Button testID="next-question" title="Next Question" onPress={handleNext} disabled={selected.length === 0} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  prompt: { fontSize: 20, marginBottom: 20 }
});
