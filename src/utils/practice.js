export const toPracticeKey = (practice) => {
  if (!practice) return 'chelsea'
  if (practice.includes('Chelsea')) return 'chelsea'
  if (practice.includes('Manchester')) return 'manchester'
  if (practice.includes('Harrow')) return 'harrow'
  return 'smilecraft'
}
