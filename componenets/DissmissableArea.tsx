import { TouchableWithoutFeedback,Keyboard } from "react-native";
import React from "react";

const DissmissableArea = ({ children }: any) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DissmissableArea;