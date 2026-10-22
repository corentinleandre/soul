import { systemPath } from "../../constants.mjs";
import {SOULItemSheet} from "./itemSheet.mjs";

const { api, sheets } = foundry.applications;

/**
 * Extend the basic ScarSheet with some very simple modifications.
 */
export class SOULScarSheet extends SOULItemSheet {
  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    position: {
      width: 600,
    },
    classes: ["soul", "item", "standard-form","scar"],
    actions: {
      viewDoc: this.#viewEffect,
      createDoc: this.#createEffect,
      deleteDoc: this.#deleteEffect,
      toggleEffect: this.#toggleEffect,
    },
    form: {
      submitOnChange: true,
    },
    // Custom property that's merged into `this.options`
    dragDrop: [{ dragSelector: ".draggable", dropSelector: null }],
  };

  /* -------------------------------------------------- */

  static TABS = {
    primary: {
      tabs: [
        {
          id: "details",
        },
      ],
      initial: "details",
      labelPrefix: "SOUL.Sheets.Tabs",
    },
  };

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static PARTS = {
    header: {
      template: systemPath("templates/item/header.hbs"),
    },
    tabs: {
      // Foundry-provided generic template
      template: systemPath("templates/shared/tab-navigation.hbs"),
    },
    details: {
      template: systemPath("templates/item/scar.hbs"),
      scrollable: [""],
    },
  };

  /* -------------------------------------------------- */

  /** @inheritdoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    Object.assign(context, {
      owner: this.document.isOwner,
      limited: this.document.limited,
      item: this.item,
      actor: this.actor,
      system: this.item.system,
      systemFields: this.item.system.schema.fields,
      flags: this.item.flags,
      itemFields: this.item.schema.fields,
      config: CONFIG,
    });

    console.log(context);

    return context;
  }

  /* -------------------------------------------------- */

  /** @inheritdoc */
  async _preparePartContext(partId, context) {
    // TODO: Come up with clever way to automatically handle enriching HTML fields
    switch (partId) {
      case "details":
        context.tab = context.tabs[partId];
        break;
    }
    return context;
  }

  /* -------------------------------------------------- */
  /*   Event handlers                                   */
  /* -------------------------------------------------- */

  /**
   * Renders an embedded document's sheet.
   *
   * @this SOULItemSheet
   * @param {PointerEvent} event   The originating click event.
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action].
   * @protected
   */
  static async #viewEffect(event, target) {
    const effect = this._getEffect(target);
    effect.sheet.render(true);
  }

  /* -------------------------------------------------- */

  /**
   * Handles item deletion.
   *
   * @this SOULItemSheet
   * @param {PointerEvent} event   The originating click event.
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action].
   * @protected
   */
  static async #deleteEffect(event, target) {
    const effect = this._getEffect(target);
    effect.delete();
  }

  /* -------------------------------------------------- */

  /**
   * Handle creating a new Owned Item or ActiveEffect for the actor using initial data defined in the HTML dataset.
   *
   * @this SOULItemSheet
   * @param {PointerEvent} event   The originating click event.
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action].
   * @private
   */
  static async #createEffect(event, target) {
    const aeCls = getDocumentClass("ActiveEffect");
    const effectData = {
      name: aeCls.defaultName({
        type: target.dataset.type,
        parent: this.item,
      }),
    };
    for (const [dataKey, value] of Object.entries(target.dataset)) {
      if (["action", "documentClass"].includes(dataKey)) continue;
      foundry.utils.setProperty(effectData, dataKey, value);
    }

    aeCls.create(effectData, { parent: this.item });
  }

  /* -------------------------------------------------- */

  /**
   * Determines effect parent to pass to helper.
   *
   * @this SOULItemSheet
   * @param {PointerEvent} event   The originating click event.
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action].
   * @private
   */
  static async #toggleEffect(event, target) {
    const effect = this._getEffect(target);
    effect.update({ disabled: !effect.disabled });
  }

  /* -------------------------------------------------- */
  /*   The following pieces set up drag                 */
  /*   handling and are unlikely to need modification   */
  /* -------------------------------------------------- */

  // This is marked as private because there's no real need
  // for subclasses or external hooks to mess with it directly
  #dragDrop = this.#createDragDropHandlers();

  /* -------------------------------------------------- */

  /**
   * Create drag-and-drop workflow handlers for this Application.
   * @returns {DragDrop[]}     An array of DragDrop handlers.
   * @private
   */
  #createDragDropHandlers() {
    return this.options.dragDrop.map((d) => {
      d.permissions = {
        dragstart: this._canDragStart.bind(this),
        drop: this._canDragDrop.bind(this),
      };
      d.callbacks = {
        dragstart: this._onDragStart.bind(this),
        dragover: this._onDragOver.bind(this),
        drop: this._onDrop.bind(this),
      };
      return new foundry.applications.ux.DragDrop(d);
    });
  }
}
