import { BaseLayerOperator } from "./BaseLayerOperator";
import mx from "@mxgraph-app/mx";
const { mxResources, mxEvent, mxPopupMenu, mxUtils } = mx;

export class LayerInserter extends BaseLayerOperator {
  link: any;

  get selectionLayer() {
    return this.layersWindow.selectionLayer;
  }

  get layerCount() {
    return this.layersWindow.layerCount;
  }

  get checkmarkImage() {
    return this.layersWindow.checkmarkImage;
  }

  createLink() {
    const { baseLink } = this;
    const link: any = baseLink;
    link.setAttribute(
      "title",
      mxUtils.trim(mxResources.get("moveSelectionTo", [""]))
    );
    link.innerHTML =
      '<div class="geSprite geSprite-insert" style="display:inline-block;"></div>';

    return link;
  }

  addClickHandler() {
    const { editorUi, layerCount, link, graph, checkmarkImage } = this;
    mxEvent.addListener(link, "click", (evt) => {
      if (graph.isEnabled() && !graph.isSelectionEmpty()) {
        editorUi.editor.graph.popupMenuHandler.hideMenu();

        var menu: any = new mxPopupMenu((menu, parent) => {
          for (var i = layerCount - 1; i >= 0; i--) {
            const add = (child) => {
              var item = menu.addItem(
                graph.convertValueToString(child) ||
                  mxResources.get("background"),
                null,
                () => {
                  graph.moveCells(
                    graph.getSelectionCells(),
                    0,
                    0,
                    false,
                    child
                  );
                },
                parent
              );

              if (
                graph.getSelectionCount() == 1 &&
                graph.model.isAncestor(child, graph.getSelectionCell())
              ) {
                menu.addCheckmark(item, checkmarkImage);
              }
            };
            add(graph.model.getChildAt(graph.model.root, i));
          }
        });
        menu.div.className += " geMenubarMenu";
        menu.smartSeparators = true;
        menu.showDisabled = true;
        menu.autoExpand = true;

        // Disables autoexpand and destroys menu when hidden
        menu.hideMenu = () => {
          mxPopupMenu.prototype.hideMenu.apply(menu, []);
          menu.destroy();
        };

        var offset = mxUtils.getOffset(link);
        menu.popup(offset.x, offset.y + link.offsetHeight, null, evt);

        // Allows hiding by clicking on document
        editorUi.setCurrentMenu(menu);
      }
    });
  }
}
