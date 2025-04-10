import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Question from './components/question';
import Summary from './components/Summary';

const Stack = createNativeStackNavigator();

const quizData = [
  {
    prompt: "Which is a primary color?",
    type: "multiple-choice",
    choices: ["Purple", "Red", "Green", "Orange"],
    correct: 1
  },
  {
    prompt: "Select all even numbers.",
    type: "multiple-answer",
    choices: ["1", "2", "3", "4"],
    correct: [1, 3]
  },
  {
    prompt: "The sun is a star.",
    type: "true-false",
    choices: ["False", "True"],
    correct: 1
  }
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen
          name="Question"
          component={Question}
          initialParams={{ data: quizData, index: 0, userAnswers: [] }}
        />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

