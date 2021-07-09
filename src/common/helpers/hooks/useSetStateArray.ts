import {SetStateAction, useCallback, useState} from 'react';

type UseSetArrayStateAction<T extends object> = React.Dispatch<
  SetStateAction<Partial<T>>
>;
type UseSetStateArray<T extends object> = [
  T,
  UseSetArrayStateAction<T>,
  () => void,
];
function useSetStateArray<T extends object>(
  initialValue: T,
): UseSetStateArray<T> {
  const [value, setValue] = useState<T>(initialValue);
  const setState = useCallback(
    (v: SetStateAction<Partial<T>>) => {
      return setValue(oldValue => ({
        ...oldValue,
        ...(typeof v === 'function' ? v(oldValue) : v),
      }));
    },
    [setValue],
  );
  const resetState = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, setState, resetState];
}
export default useSetStateArray;
