// declare module 'react-router';
declare module 'react-hot-loader';

interface Window {
  __INITIAL_STATE__?: Object
}
declare interface ObjectConstructor {
  assign(...objects: any[]): any;
}

interface NodeModule {
  hot: any;
  exports: any;
}
declare var module: NodeModule;

interface NodeRequire {
  (path: string): any;
  <T>(path: string): T;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}
declare var require: NodeRequire;

declare var __DEV__: boolean;

interface IAction<T> {
  type: string;
  payload: T;
}
