import { useContext } from '../hooks';
import { Consumer, Context } from '../types';

export function createContextConsumer<T>(context: Context<T>): Consumer<T> {
  return (props) => {
    const value = useContext(context);

    return props.children(value);
  };
}
