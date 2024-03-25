import { ExoticComponent } from './ExoticComponent';

export interface NamedExoticComponent<P = {}> extends ExoticComponent<P> {
  displayName?: string | undefined;
}
