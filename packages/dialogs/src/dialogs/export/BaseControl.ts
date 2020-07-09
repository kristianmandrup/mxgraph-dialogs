import { BaseDialogControl } from "../base";

export class BaseControl extends BaseDialogControl {
  get graph() {
    return this.dialog.graph;
  }

  get graphSize() {
    return this.dialog.graphSize;
  }

  get ui() {
    return this.dialog.ui;
  }

  get tbody() {
    return this.dialog.tbody;
  }

  get scale() {
    return this.graphSize.scale;
  }

  get bounds() {
    return this.graphSize.bounds;
  }
}
