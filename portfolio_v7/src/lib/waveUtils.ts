/**
 * Wave parameters shared between the GLSL vertex shader (Ocean.tsx)
 * and the JavaScript buoyancy calculation (FloatingObject.tsx).
 * Changing these values here automatically syncs both.
 */
export const WAVE_FREQ = 0.02;
export const WAVE_AMP = 15.0;

/**
 * Returns the Y elevation of the wave surface at world position (x, z)
 * at a given time. Must match the vertex shader formula exactly.
 *
 * GLSL equivalent:
 *   elevation = sin(position.x * 0.02 + uTime) * cos(position.z * 0.02 + uTime) * 15.0;
 */
export function getWaveHeight(x: number, z: number, time: number): number {
  return (
    Math.sin(x * WAVE_FREQ + time) *
    Math.cos(z * WAVE_FREQ + time) *
    WAVE_AMP
  );
}
