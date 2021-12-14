import BaseView from "../view/BaseView";

export default interface BaseViewModel {
  attachView(BaseView: BaseView): void;
  detachView(): void;
}