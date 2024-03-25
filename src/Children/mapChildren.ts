export function mapChildren<T, C>(children: C | readonly C[], fn: (child: C, index: number) => T): C extends null | undefined ? C : Array<Exclude<T, boolean | null | undefined>> {
  return null;
}
