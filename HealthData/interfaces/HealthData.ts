interface HealthData {
  init(): Promise<void>;
  getSteps(date: Date): Promise<number>;
  getHeartRate(date: Date): Promise<number>;
  getSleepData(date: Date): Promise<number>;
}

export default HealthData;
