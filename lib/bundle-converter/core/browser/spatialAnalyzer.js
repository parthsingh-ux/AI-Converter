/**
 * Spatial Analyzer - Calculates spatial position and layout relationships
 */
export class SpatialAnalyzer {
  /**
   * Analyzes spatial relationship between child elements in a container
   * @param {Array} children 
   * @returns {{ direction: 'row' | 'column', isMultiColumn: boolean, columns: Array }}
   */
  static analyzeLayoutDirection(children) {
    if (!children || children.length < 2) {
      return { direction: "column", isMultiColumn: false, columns: [] };
    }

    // Check if children are positioned side-by-side (row) or stacked (column)
    let sideBySideCount = 0;
    for (let i = 0; i < children.length - 1; i++) {
      const c1 = children[i].rect || { x: 0, y: i * 50, width: 100, height: 40 };
      const c2 = children[i + 1].rect || { x: 0, y: (i + 1) * 50, width: 100, height: 40 };

      // Overlap vertically and separated horizontally
      const verticalOverlap = Math.max(0, Math.min(c1.y + c1.height, c2.y + c2.height) - Math.max(c1.y, c2.y));
      const minHeight = Math.min(c1.height, c2.height);

      if (verticalOverlap > minHeight * 0.4 && Math.abs(c1.x - c2.x) > 20) {
        sideBySideCount++;
      }
    }

    const isRow = sideBySideCount >= Math.floor(children.length / 2);
    return {
      direction: isRow ? "row" : "column",
      isMultiColumn: isRow,
      sideBySideCount
    };
  }
}
