// components/Summary.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Summary({ route }) {
  const { data, userAnswers } = route.params;

  const getScore = () => {
    return data.reduce((score, question, i) => {
      const correct = question.correct;
      const answer = userAnswers[i];
      if (Array.isArray(correct)) {
        return JSON.stringify([...correct].sort()) === JSON.stringify([...answer].sort()) ? score + 1 : score;
      } else {
        return correct === answer[0] ? score + 1 : score;
      }
    }, 0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text testID="total" style={styles.total}>Total Score: {getScore()} / {data.length}</Text>
      {data.map((q, i) => (
        <View key={i} style={styles.block}>
          <Text style={styles.prompt}>{q.prompt}</Text>
          {q.choices.map((choice, idx) => {
            const isCorrect = Array.isArray(q.correct) ? q.correct.includes(idx) : q.correct === idx;
            const wasChosen = userAnswers[i].includes(idx);
            const style = isCorrect && wasChosen
              ? styles.correct
              : wasChosen && !isCorrect
              ? styles.incorrect
              : isCorrect
              ? styles.correct
              : styles.normal;
            return (
              <Text key={idx} style={style}>{choice}</Text>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  block: { marginBottom: 30 },
  prompt: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  correct: { color: 'green', fontWeight: 'bold' },
  incorrect: { color: 'red', textDecorationLine: 'line-through' },
  normal: { color: 'black' },
  total: { fontSize: 18, marginBottom: 20, fontWeight: 'bold' },
});
