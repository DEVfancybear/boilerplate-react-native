import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

type NetInfoTuple = [boolean, boolean];
function useNetWorkStatus(): NetInfoTuple {
  const [status, setStatus] = useState<boolean>(false);
  const [canAccess, setCanAccess] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setStatus(state.isConnected ?? false);
      setCanAccess(state.isInternetReachable ?? false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return [status, canAccess];
}
export default useNetWorkStatus;
