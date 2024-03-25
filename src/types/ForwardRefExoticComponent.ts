import { NamedExoticComponent } from './NamedExoticComponent';

export interface ForwardRefExoticComponent<P> extends NamedExoticComponent<P> {
  defaultProps?: Partial<P> | undefined;
}
