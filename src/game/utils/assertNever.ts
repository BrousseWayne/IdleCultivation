// Compile-time exhaustiveness guard: reaching this with anything but `never`
// breaks the build, so adding a union variant surfaces every switch that must
// handle it. The runtime warn covers data smuggled past the type system.
export function assertNever(value: never, context: string): void {
  console.warn(`[${context}] unhandled variant:`, value);
}
