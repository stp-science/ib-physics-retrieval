export const MODE_DETAILS = {
  recall: { label: 'Knowledge Recall', other: 'challenge' },
  challenge: { label: 'Exam Challenge', other: 'recall' }
};
export function roundCategory(round) {
  return new Set(round.modeHistory || [round.mode]).size > 1 ? 'mixed' : round.mode;
}
export function categoryLabel(category) {
  return category === 'mixed' ? 'Mixed modes' : MODE_DETAILS[category].label;
}
export function changeRoundMode(round, target) {
  if (!MODE_DETAILS[target] || target === round.mode ||
      !['question', 'feedback'].includes(round.phase)) return false;
  const destination = round.modeProgress[target];
  if (!destination || destination.index >= destination.deck.length) return false;
  const current = round.modeProgress[round.mode];
  current.deck = round.deck;
  current.index = round.index + (round.phase === 'feedback' ? 1 : 0);
  current.choices = round.phase === 'question' ? round.choices : null;
  round.mode = target;
  round.deck = destination.deck;
  round.index = destination.index;
  round.choices = destination.choices;
  round.phase = 'question';
  round.pending = null;
  round.questionShownAt = null;
  round.modeHistory = [...(round.modeHistory || []), target];
  return true;
}
