import {SetStateAction, useCallback, useMemo, useState} from 'react';

type UseBooleanActions = {
  setValue: React.Dispatch<SetStateAction<boolean>>;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
};
type UseBoolean = [boolean, UseBooleanActions];
function useBoolean(initial: boolean): UseBoolean {
  const [value, setValue] = useState<boolean>(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const actions = useMemo(
    () => ({setValue, toggle, setTrue, setFalse}),
    [setFalse, setTrue, toggle],
  );
  return useMemo(() => [value, actions], [actions, value]);
}
export default useBoolean;
