import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ApiCall } from "../functions/ApiCall";

import { HabitTotals } from "../Types/HabitTotals";
import HabitTotalsTable from "../componenets/HabitTotalsTable";

export default function HabbitTrack() {
  const [log, setLog] = useState<HabitTotals[]>();
  useEffect(() => {
    ApiCall.getLoggedHabits(0).then((response) => {
      console.log(response.responseData.data);
      setLog(response.responseData.data);
    });
  }, []);
  return (
    <View>
      <Text>Habbit Track</Text>
      <HabitTotalsTable log={log} setLog={log} />
    </View>
  );
}
