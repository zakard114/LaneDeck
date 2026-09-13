from __future__ import annotations

import uuid
from typing import Optional

from .models import Card, CreateCardRequest, Lane, UpdateCardRequest, utc_now


class CardStore:
    """In-memory mock store. Replace with SQLAlchemy later."""

    def __init__(self) -> None:
        self._cards: dict[str, Card] = {}

    def clear(self) -> None:
        self._cards.clear()

    def list_cards(self, lane: Optional[Lane] = None) -> list[Card]:
        cards = list(self._cards.values())
        if lane is not None:
            cards = [c for c in cards if c.lane == lane]
        lane_order = {Lane.todo: 0, Lane.doing: 1, Lane.done: 2}
        return sorted(cards, key=lambda c: (lane_order[c.lane], c.position, c.created_at))

    def create(self, body: CreateCardRequest) -> Card:
        lane = body.lane or Lane.todo
        position = self._next_position(lane)
        stamp = utc_now()
        card = Card(
            id=str(uuid.uuid4()),
            title=body.title,
            lane=lane,
            position=position,
            createdAt=stamp,
            updatedAt=stamp,
        )
        self._cards[card.id] = card
        return card

    def update(self, card_id: str, body: UpdateCardRequest) -> Card:
        current = self._cards.get(card_id)
        if current is None:
            raise KeyError(card_id)

        title = current.title if body.title is None else body.title
        lane = current.lane if body.lane is None else body.lane
        position = current.position if body.position is None else body.position

        if body.lane is not None and body.lane != current.lane and body.position is None:
            position = self._next_position(body.lane, exclude_id=card_id)

        updated = Card(
            id=current.id,
            title=title,
            lane=lane,
            position=position,
            createdAt=current.created_at,
            updatedAt=utc_now(),
        )
        self._cards[card_id] = updated
        return updated

    def delete(self, card_id: str) -> None:
        if card_id not in self._cards:
            raise KeyError(card_id)
        del self._cards[card_id]

    def _next_position(self, lane: Lane, exclude_id: Optional[str] = None) -> int:
        positions = [
            c.position
            for c in self._cards.values()
            if c.lane == lane and c.id != exclude_id
        ]
        return (max(positions) + 1) if positions else 0
