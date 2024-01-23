import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types/RootStackParamList";
import { DataTable } from "react-native-paper";

import HabitTotalsTable from "../componenets/HabitTotalsTable";
import MoodTotalsTable from "../componenets/MoodTotalsTable";

type Props = NativeStackScreenProps<RootStackParamList, "PastLogs">;

export default function PastDays({ route, navigation }: Props) {
  const [logData, setLogData] = useState<any>();
  useEffect(() => {
    const { data } = route.params;
    setLogData(data);
  }, []);
  return (
    <View>
      <HabitTotalsTable habitData={logData?.data?.habitLog} />
      <MoodTotalsTable moodData={logData?.data?.moodLog} />
    </View>
  );
}
