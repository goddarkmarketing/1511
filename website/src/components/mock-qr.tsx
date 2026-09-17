type Props = {
  value: string;
  size?: number;
};

/** Decorative PromptPay-style QR placeholder for the demo checkout. */
export function MockQr({ value, size = 180 }: Props) {
  const cells = 25;
  const cell = size / cells;

  let seed = 7;
  for (let i = 0; i < value.length; i++) {
    seed = (seed * 31 + value.charCodeAt(i)) % 100000;
  }
  const random = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  const isFinder = (x: number, y: number) => {
    const inBox = (bx: number, by: number) =>
      x >= bx && x < bx + 7 && y >= by && y < by + 7;
    return inBox(0, 0) || inBox(cells - 7, 0) || inBox(0, cells - 7);
  };

  const finderFilled = (x: number, y: number) => {
    const local = (bx: number, by: number) => {
      const dx = x - bx;
      const dy = y - by;
      const edge = dx === 0 || dy === 0 || dx === 6 || dy === 6;
      const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
      return edge || core;
    };
    if (x < 7 && y < 7) return local(0, 0);
    if (x >= cells - 7 && y < 7) return local(cells - 7, 0);
    if (x < 7 && y >= cells - 7) return local(0, cells - 7);
    return false;
  };

  const squares: { x: number; y: number }[] = [];
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      if (isFinder(x, y)) {
        if (finderFilled(x, y)) squares.push({ x, y });
        continue;
      }
      if (random() > 0.55) squares.push({ x, y });
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Demo QR code"
      className="bg-white"
    >
      {squares.map((square) => (
        <rect
          key={`${square.x}-${square.y}`}
          x={square.x * cell}
          y={square.y * cell}
          width={cell}
          height={cell}
          fill="#241e18"
        />
      ))}
    </svg>
  );
}
