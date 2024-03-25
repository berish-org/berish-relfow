import { Consumer } from './Consumer';
import { Provider } from './Provider';

export interface Context<T> {
  Provider: Provider<T>;
  Consumer: Consumer<T>;
}
