import { IPerson } from './person';

export interface IPeople {
  count: number;
  next: string;
  previous: string;
  results: IPerson[];
}
