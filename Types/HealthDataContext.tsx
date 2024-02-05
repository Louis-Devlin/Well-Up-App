import { createContext } from "react";
import { Container } from "inversify";

export const HealthDataContext = createContext<Container | null>(null);
