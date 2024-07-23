// navigation-types.ts

import { Show } from '../Types/types';

export type RootStackParamList = {
  index: undefined; // Home screen, no params
  search: undefined; // Search screen, no params
  plus: undefined; // Upcoming screen, no params
  downloads: undefined; // Downloads screen, no params
  more: undefined; // More screen, no params
  details: { movie: Show }; // Details screen, requires a movie object
};
