import { JSXElementConstructor } from './JSXElementConstructor';

export interface ReflowElement<Props = any, T extends JSXElementConstructor<any> = JSXElementConstructor<any>> {
  key: string | null;
  type: T;
  props: Props;
}
