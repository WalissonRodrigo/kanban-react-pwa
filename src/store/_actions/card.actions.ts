/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { AES } from 'crypto-js';

import { useFetchWrapper } from '../_helpers';
import { Actions, Card, StatusKanban, cardsAtom } from '../_state';

export { useCardActions };

function useCardActions(): [Card[], Actions] {
  const navigate = useNavigate();
  const baseUrl = `http://localhost:5000`;
  const fetchWrapper = useFetchWrapper();
  const [cards, setCards] = useRecoilState(cardsAtom);

  return [
    cards,
    {
      getAll,
      updateCard,
      deleteCard,
    },
  ];

  function getAll() {
    return fetchWrapper.get(`${baseUrl}/cards`).then(setCards);
  }

  function updateCard(uuid: string, card: object) {
    return fetchWrapper
      .put(`${baseUrl}/cards/${uuid}`, card as Card)
      .then((card) => setCards([cards.map((_card: Card) => _card.id !== card.id), ...card]));
  }

  function deleteCard(uuid: string) {
    return fetchWrapper
      .delete(`${baseUrl}/cards/${uuid}`)
      .then((card) => setCards([...cards.filter((_card: Card) => _card.id !== card.id)]));
  }
}
