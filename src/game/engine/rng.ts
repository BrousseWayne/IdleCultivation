// Deterministic, seedable randomness (mulberry32). Every roll the game makes
// goes through here: the same seed replays the same life, bugs reproduce,
// and simulation tests are exact. The internal state is persisted through the
// persistence manifest and reseeded on reincarnation.

let state = 0;

function mulberry32(): number {
  state = (state + 0x6d2b79f5) | 0;
  let mixed = state;
  mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
  mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
  return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
}

export const rng = {
  // uniform in [0, 1) — the one true dice of the game
  next(): number {
    return mulberry32();
  },

  roll(probability: number): boolean {
    return mulberry32() < probability;
  },

  reseed(seed: number): void {
    state = seed | 0;
  },

  // a fresh, non-deterministic seed — used only at run start
  freshSeed(): number {
    return (Date.now() ^ (Math.random() * 0xffffffff)) | 0;
  },

  getState(): number {
    return state;
  },

  setState(saved: number): void {
    state = saved | 0;
  },
};
