import { atom } from 'recoil';

import { Card } from '@mui/material';

export enum StatusKanban {
  ToDo = 'ToDo',
  Doing = 'Doing',
  Done = 'Done',
  Dropped = 'Dropped',
}

export type Actions = {
  getAll: () => void;
  createCard: (payload: Card) => Promise<Card>;
  updateCard: (uuid: string, payload: Card) => Promise<Card>;
  deleteCard: (uuid: string) => void;
};

export type Card = {
  id: string;
  title: string;
  content: string;
  status: StatusKanban;
  createdAt: string;
  updatedAt: string;
};

const cardsAtom = atom<Card[]>({
  key: 'cards',
  default: [],
});

export { cardsAtom };
