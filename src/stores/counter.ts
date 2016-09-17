import { observable, computed } from 'mobx';
class CounterStore {
  @observable
  private _counter: number = 0;
  @computed
  get counter () {
    return this._counter;
  }

  increase = (): void => {
    this._counter += 1;
  };
  doubleIncrease = (): void => {
    setTimeout(() => {
      this._counter *= 2;
    }, 500);
  };
  reset = (): void => {
    this._counter = 0;
  };
}

export { CounterStore };
export default new CounterStore();
