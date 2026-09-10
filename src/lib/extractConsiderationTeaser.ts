/**
 * Extract a short teaser from approved consideration copy — truncation only, no new claims.
 */
export function extractConsiderationTeaser(
  description: string,
  maxLength = 140,
): string {
  const trimmed = description.trim();
  if (trimmed.length <= maxLength) return trimmed;

  const sentences = trimmed.split(/(?<=[.!?])\s+(?=[A-Z"'])/);
  const firstSentence = sentences[0]?.trim();
  if (
    firstSentence &&
    firstSentence.length >= 20 &&
    firstSentence.length <= maxLength + 24
  ) {
    return firstSentence;
  }

  const truncated = trimmed.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > maxLength * 0.55) {
    return `${truncated.slice(0, lastSpace).trim()}…`;
  }

  return `${truncated.trim()}…`;
}
