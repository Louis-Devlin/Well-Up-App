interface HealthData {
  init(): Promise<void>;
  getSteps(date: Date): Promise<number>;
}

export default HealthData;
