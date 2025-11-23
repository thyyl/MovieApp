import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface Props {
  userScore: number;
}

export const MovieUserScore = ({ userScore }: Props) => {
  return (
    <AnimatedCircularProgress
      size={60}
      width={5}
      fill={userScore}
      tintColor="#00e0ff"
      onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor="#3d5875"
    />
  );
};
