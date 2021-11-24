import { action, observable } from "mobx";

class RouterStore {
  @observable currentPath = "";

  @action
  setCurrentPath(currentPath) {
    this.currentPath = currentPath;
  }
}

const routerStore = new RouterStore();
export default routerStore;
