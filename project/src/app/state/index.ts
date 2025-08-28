// @todo, update store from this example

import { signalStore, withState } from '@ngrx/signals';

interface Book {
  title: string;
  description: string;
}

type BookSearchState = {
  // books: Book[];
  books: Book[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BookSearchState = {
  books: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const BookSearchStore = signalStore(withState(initialState));
