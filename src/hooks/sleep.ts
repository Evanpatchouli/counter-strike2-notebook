export default function sleep<T = void>(interval: number, callback?: () => T) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      const r = callback?.();
      resolve(r);
    }, interval);
  });
}
