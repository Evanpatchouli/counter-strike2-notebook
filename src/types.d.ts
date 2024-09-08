/* eslint-disable @typescript-eslint/no-explicit-any */
import '@evanpatchouli/react-hooks-kit';

type NamespaceMap = {
  [namespace: string]: {
    [key: string]: any;
  };
};
declare namespace App {
  export interface Share extends NamespaceMap {
    default: {
      [key: string]: any;
    };
    docs: {
      showLeftSideBar: boolean;
      showRightSideBar: boolean;
      selectedTabId: string;
    };
  }
}

declare module '@evanpatchouli/react-hooks-kit' {
  type ChangeCallback<T> = (value: T) => any;
  /**
   * @override **with types.d.ts for binding App.Share as NamespaceMap.**
   * 
   * useInject is a hook that can be used to inject a value from a provider.
   *
   * ---
   * ### Parameters
   * - `name` - The name of the provider to inject from.
   *
   * ---
   * ### Returns
   * - [0]`value` - The value of the provider.
   * - [1]`setValue | undefined` - A function provided by `useProvide` to set the value of the provider.
   */
  declare function useInject<
    T extends NamespaceMap = App.Share,
    N extends keyof T = keyof T,
    K extends keyof T[N] = keyof T[N],
    V = K extends string ? T[N][K] | undefined : any,
    C extends ChangeCallback<V> | undefined = undefined
  >
    (
      name: K,
      options?: {
        namespace?: N;
        callback?: C;
      }
    ): [C extends ChangeCallback<infer R> ? R : V, React.Dispatch<React.SetStateAction<V>>];

}