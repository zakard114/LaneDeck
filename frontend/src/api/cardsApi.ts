import type { Card, CreateCardInput, Lane, UpdateCardInput } from "../types";
import { LANES } from "../types";

const STORAGE_KEY = "lanedeck.cards.v1";

function nowIso(): string {
  return new Date().toISOString();
}

function newId(): string {
  return crypto.randomUUID();
}

function normalizeTitle(title: string): string {
  const trimmed = title.trim();
  if (trimmed.length < 1 || trimmed.length > 200) {
    throw new Error("Title must be 1–200 characters");
  }
  return trimmed;
}

function readStore(): Card[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Card[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStore(cards: Card[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function delay<T>(value: T, ms = 120): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/**
 * Central backend client for LaneDeck.
 * Currently mocked with localStorage; swap implementation to HTTP later.
 */
export const cardsApi = {
  async health(): Promise<{ status: string }> {
    return delay({ status: "ok" });
  },

  async listCards(lane?: Lane): Promise<Card[]> {
    let cards = readStore();
    if (lane) cards = cards.filter((c) => c.lane === lane);
    cards = [...cards].sort((a, b) => {
      const laneOrder = LANES.indexOf(a.lane) - LANES.indexOf(b.lane);
      if (laneOrder !== 0) return laneOrder;
      return a.position - b.position;
    });
    return delay(cards);
  },

  async createCard(input: CreateCardInput): Promise<Card> {
    const title = normalizeTitle(input.title);
    const lane: Lane = input.lane ?? "todo";
    const cards = readStore();
    const position =
      cards.filter((c) => c.lane === lane).reduce((max, c) => Math.max(max, c.position), -1) + 1;
    const stamp = nowIso();
    const card: Card = {
      id: newId(),
      title,
      lane,
      position,
      createdAt: stamp,
      updatedAt: stamp,
    };
    writeStore([...cards, card]);
    return delay(card);
  },

  async updateCard(id: string, input: UpdateCardInput): Promise<Card> {
    const cards = readStore();
    const index = cards.findIndex((c) => c.id === id);
    if (index < 0) throw new Error("Card not found");

    const current = cards[index];
    const next: Card = {
      ...current,
      title: input.title !== undefined ? normalizeTitle(input.title) : current.title,
      lane: input.lane ?? current.lane,
      position: input.position ?? current.position,
      updatedAt: nowIso(),
    };

    // If moving lanes without an explicit position, append to target lane
    if (input.lane && input.lane !== current.lane && input.position === undefined) {
      next.position =
        cards
          .filter((c) => c.lane === input.lane && c.id !== id)
          .reduce((max, c) => Math.max(max, c.position), -1) + 1;
    }

    const updated = [...cards];
    updated[index] = next;
    writeStore(updated);
    return delay(next);
  },

  async deleteCard(id: string): Promise<void> {
    const cards = readStore();
    if (!cards.some((c) => c.id === id)) throw new Error("Card not found");
    writeStore(cards.filter((c) => c.id !== id));
    await delay(undefined);
  },
};
