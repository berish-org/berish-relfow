import { useCallback } from './useCallback';
import { useEffect } from './useEffect';
import { useState } from './useState';

export function useSyncExternalStore<Snapshot>(subscribe: (onStoreChange: () => void) => () => void, getSnapshot: () => Snapshot): Snapshot {
  const [snapshot, setSnapshot] = useState<Snapshot>(() => getSnapshot());

  const onUpdateSnapshot = useCallback(() => {
    setSnapshot(getSnapshot());
  }, [getSnapshot]);

  useEffect(() => subscribe(onUpdateSnapshot), [subscribe, onUpdateSnapshot]);

  return snapshot;
}
