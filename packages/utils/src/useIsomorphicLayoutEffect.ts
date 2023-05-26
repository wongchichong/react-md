///// <reference path="voby/node_modules/oby/dist/types" />
// import { useEffect/* , useLayoutEffect */ } from 'voby'
export { useEffect as useIsomorphicLayoutEffect } from 'voby'
/**
 * This is copy/pasted from react-redux which has some more information about
 * this and how to fix "invalid" warnings while running tests.
 *
 * @see https://github.com/reduxjs/react-redux/blob/4c907c0870c6b9a136dd69be294c17d1dc63c8f5/src/utils/useIsomorphicLayoutEffect.js
 */
//@ts-ignore
// export const useIsomorphicLayoutEffect = useEffect
  // typeof window !== "undefined" &&
  // typeof window.document !== "undefined" &&
  //   typeof window.document.createElement
  //   !== "undefined"
  //   ? useLayoutEffect
  //   :
  //useEffect
