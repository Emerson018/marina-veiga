export interface SpringState {
  x: number;
  v: number;
}

/**
 * Avança uma mola criticamente amortecida em direção a `target`.
 * Usa a solução exata da equação, então é estável com qualquer `dt`
 * e nunca ultrapassa o destino ao ser solta do repouso.
 * `omega` é a frequência angular: maior = acomoda mais rápido.
 */
export function stepSpring(
  state: SpringState,
  target: number,
  dt: number,
  omega: number
): void {
  const y = state.x - target;
  const c = state.v + omega * y;
  const decay = Math.exp(-omega * dt);
  state.x = target + (y + c * dt) * decay;
  state.v = (state.v - c * omega * dt) * decay;
}
