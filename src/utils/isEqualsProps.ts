// import LINQ from '@berish/linq';

// import { isValidElement } from '../ReflowNode';
// import { PropsWithChildren } from '../types';
// import { isEqualsReflowElement } from './isEqualsReflowElement';
// import { isNil } from './isNil';

// export function isEqualsProps(first: Record<any, any> | PropsWithChildren, second: Record<any, any> | PropsWithChildren) {
//   first = first || {};
//   second = second || {};

//   const allKeys = LINQ.from(Object.keys(first).concat(Object.keys(second))).distinct();

//   return allKeys.every((key) => {
//     const firstValue = first[key];
//     const secondValue = second[key];

//     if (isNil(firstValue) && isNil(secondValue)) return true;
//     if (isNil(firstValue) || isNil(secondValue)) return false;
//     if (isValidElement(firstValue)) return isValidElement(secondValue) && isEqualsReflowElement(firstValue, secondValue);
//     // if (key === 'children') return isEqualsReflowNode(firstValue, secondValue); ????

//     return Object.is(firstValue, secondValue);
//   });
// }
