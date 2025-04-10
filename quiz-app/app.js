import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Question from './components/Question';
import Summary from './components/Summary';

const Stack = createNativeStackNavigator();

const questions = [
  {
    prompt: "This is the question...",
    type: "multiple-choice",
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
    correct: 0
  },
  {
    prompt: "This is another question...",
    type: "multiple-answer",
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
    correct: [0, 2]
  },
  {
    prompt: "This is the third question...",
    type: "true-false",
    choices: ["False", "True"],
    correct: 1
  }
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen name="Question" component={Question} initialParams={{ data: questions, index: 0, userAnswers: [] }} />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
