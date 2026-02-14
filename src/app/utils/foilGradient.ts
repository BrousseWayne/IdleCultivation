/**
 * Generates a subtle foil card shimmer gradient for a given category color
 * Creates monochromatic iridescent effect like holographic trading cards
 */
export function getFoilGradient(categoryColor: string): string {
  const foilPalettes: Record<string, string[]> = {
    '#5FB4A0': ['#5FB4A0', '#6DC4B0', '#7DD4C0', '#90DCC8', '#A0E8D8', '#90DCC8', '#7DD4C0', '#6DC4B0', '#5FB4A0'],
    '#D4AF6A': ['#D4AF6A', '#DDB87C', '#E8C988', '#EDD59A', '#F5E1B8', '#EDD59A', '#E8C988', '#DDB87C', '#D4AF6A'],
    '#E07856': ['#E07856', '#E68565', '#F09475', '#F5A488', '#FFB8A0', '#F5A488', '#F09475', '#E68565', '#E07856'],
    '#B59ACF': ['#B59ACF', '#C3A6DA', '#D0B8E5', '#DCC8EE', '#E8D8F8', '#DCC8EE', '#D0B8E5', '#C3A6DA', '#B59ACF'],
    '#52B788': ['#52B788', '#61C396', '#70D4A5', '#88DCB6', '#A0F0C8', '#88DCB6', '#70D4A5', '#61C396', '#52B788'],
    '#D88FB8': ['#D88FB8', '#E09EC4', '#E8ACD0', '#EEBEDC', '#F8D0E8', '#EEBEDC', '#E8ACD0', '#E09EC4', '#D88FB8'],
    '#6BA3D4': ['#6BA3D4', '#7AAEDC', '#88BEE8', '#9FCEEE', '#B8DCFF', '#9FCEEE', '#88BEE8', '#7AAEDC', '#6BA3D4'],
  };

  const colors = foilPalettes[categoryColor] || foilPalettes['#5FB4A0'];
  const stops = colors.map((c, i) => `${c} ${(i / (colors.length - 1)) * 100}%`).join(', ');
  return `linear-gradient(90deg, ${stops})`;
}
