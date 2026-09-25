import { prepareActiveEffectCategories } from "../../helpers/utils.mjs";
import { systemPath } from "../../constants.mjs";
import characteristics from "../../config/chara-config.mjs";

const { api, sheets } = foundry.applications;

/**
 * Extend the basic ActorSheet with some very simple modifications.
 */
export class SOULActorSheet extends api.HandlebarsApplicationMixin(sheets.ActorSheet) {
  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    classes: ["soul", "actor", "standard-form"],
    position: {
      width: 600,
      height: 600,
    },
    actions: {
      viewDoc: this.#viewDoc,
      createDoc: this.#createDoc,
      deleteDoc: this.#deleteDoc,
      toggleEffect: this.#toggleEffect,
    },
    form: {
      submitOnChange: true,
    },
  };

  /* -------------------------------------------------- */

  static TABS = {
    primary: {
      tabs: [
        {
          id: "stats"
        },
        {
          id: "characteristics"
        },
        {
          id: "items",
        },
        {
          id: "effects",
        },
      ],
      initial: "stats",
      labelPrefix: "SOUL.Sheets.Tabs",
    },
  };

  /* -------------------------------------------------- */

  /** @inheritdoc */
  static PARTS = {
    header: {
      template: systemPath("templates/actor/header.hbs"),
    },
    tabs: {
      template: "templates/generic/tab-navigation.hbs",
    },
    stats: {
      template: systemPath("templates/actor/stats.hbs"),
      scrollable: [""],
    },
    characteristics: {
      template: systemPath("templates/actor/characteristics.hbs"),
      scrollable: [""],
    },
    items: {
      template: systemPath("templates/actor/items.hbs"),
      scrollable: [""],
    },
    effects: {
      template: systemPath("templates/shared/effects.hbs"),
      scrollable: [""],
    },
  };

  /* -------------------------------------------------- */

  /** @inheritdoc */
  _initializeApplicationOptions(options) {
    const initialized = super._initializeApplicationOptions(options);

    initialized.classes.push(initialized.document.type);

    return initialized;
  }

  /* -------------------------------------------------- */

  /** @inheritdoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    console.log(options);

    Object.assign(context, {
      owner: this.document.isOwner,
      limited: this.document.limited,
      actor: this.actor,
      system: this.actor.system,
      systemFields: this.actor.system.schema.fields,
      flags: this.actor.flags,
      actorFields: this.actor.schema.fields,
      config: CONFIG,
    });

    // clean ? IDK but does exactly what I want
    let stats = {}
    for(const stat in CONFIG.SOUL.stats){
      stats[stat] = this.actor.system[stat]
      stats[stat].field = this.actor.system.schema.fields[stat].fields.base

      stats[stat].label = CONFIG.SOUL.stats[stat].label
      stats[stat].shorthand = CONFIG.SOUL.stats[stat].shorthand
    }
    context.stats = stats;

    for(const tab in context.tabs){
      if(context[tab].acctive){
        context.tab = context.tabs[tab];
      }
    }

    return context;
  }

  /* -------------------------------------------------- */

  _configureRenderParts(options){
    const { header, tabs, stats, characteristics, items, effects }
      = super._configureRenderParts(options)

    const parts = { header, tabs }

    console.log(parts.header);
    console.log(parts.tabs);

    if(this.actor.system.hasStats ?? false){
      parts.stats = stats;
    }
    if(this.actor.system.hasCharacteristics ?? false){
      parts.characteristics = characteristics;
    }

    parts.items = items;
    parts.effects = effects;

    return parts;
  }

  /* -------------------------------------------------- */

  /** @inheritdoc */
  async _preparePartContext(partId, context) {
    switch (partId) {
      case "stats":
        //Already calculated in header, should be put back here if removed
        break;
      case "characteristics":
        // clean ? IDK but does exactly what I want
        let characteristics = {}
        for(const char in CONFIG.SOUL.characteristics){
          characteristics[char] = this.actor.system[char]
          characteristics[char].field = this.actor.system.schema.fields[char].fields.value

          characteristics[char].label = CONFIG.SOUL.characteristics[char].label
          characteristics[char].shorthand = CONFIG.SOUL.characteristics[char].shorthand
        }
        context.characteristics = characteristics;
        break;
      case "effects":
        context.effects = prepareActiveEffectCategories(this.actor.allApplicableEffects());
        context.tab = context.tabs[partId];
        break;
      case "items":
        context.itemTypes = this._getItems();
        context.tab = context.tabs[partId];
        break;
    }
    return context;
  }

  /* -------------------------------------------------- */

  /**
   * Recursively add system model fields to the fieldset.
   */
  async #addSystemFields(fieldset, schema, source, _path = "system") {
    for (const field of Object.values(schema)) {
      const path = `${_path}.${field.name}`;
      if (field instanceof foundry.data.fields.SchemaField) {
        this.#addSystemFields(fieldset, field.fields, source, path);
      } else if (field.constructor.hasFormSupport) {
        fieldset.fields.push({ field, value: foundry.utils.getProperty(source, path) });
      }
    }
  }

  /* -------------------------------------------------- */

  /**
   * Adapted from Actor#itemTypes.
   */
  _getItems() {
    const types = Object.fromEntries(game.documentTypes.Item.map((t) => {
      return [t, { label: game.i18n.localize(CONFIG.Item.typeLabels[t]), items: [] }];
    }));
    for (const item of this.actor.items) {
      types[item.type].items.push(item);
    }
    // Only show Base if it's actually being used
    if (types.base.items.length === 0) delete types.base;
    return types;
  }

  /* -------------------------------------------------- */

  /**
   * Actions performed after any render of the Application.
   * Post-render steps are not awaited by the render process.
   * @param {ApplicationRenderContext} context      Prepared context data.
   * @param {RenderOptions} options                 Provided render options.
   * @protected
   * @inheritdoc
   */
  async _onRender(context, options) {
    await super._onRender(context, options);
    this.#disableOverrides();
  }

  /* -------------------------------------------------- */
  /*   Event handlers                                   */
  /* -------------------------------------------------- */

  /**
   * Renders an embedded document's sheet.
   *
   * @this SOULActorSheet
   * @param {PointerEvent} event   The originating click event.
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action].
   * @protected
   */
  static async #viewDoc(event, target) {
    const doc = this._getEmbeddedDocument(target);
    doc.sheet.render(true);
  }

  /* -------------------------------------------------- */

  /**
   * Handles item deletion.
   *
   * @this SOULActorSheet
   * @param {PointerEvent} event   The originating click event.
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action].
   * @protected
   */
  static async #deleteDoc(event, target) {
    const doc = this._getEmbeddedDocument(target);
    doc.delete();
  }

  /* -------------------------------------------------- */

  /**
   * Handle creating a new Owned Item or ActiveEffect for the actor using initial data defined in the HTML dataset.
   *
   * @this SOULActorSheet
   * @param {PointerEvent} event   The originating click event.
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action].
   * @private
   */
  static async #createDoc(event, target) {
    const docCls = getDocumentClass(target.dataset.documentClass);
    const docData = {
      name: docCls.defaultName({
        type: target.dataset.type,
        parent: this.actor,
      }),
    };
    for (const [dataKey, value] of Object.entries(target.dataset)) {
      if (["action", "documentClass"].includes(dataKey)) continue;
      foundry.utils.setProperty(docData, dataKey, value);
    }
    docCls.create(docData, { parent: this.actor });
  }

  /* -------------------------------------------------- */

  /**
   * Determines effect parent to pass to helper.
   *
   * @this SOULActorSheet
   * @param {PointerEvent} event   The originating click event.
   * @param {HTMLElement} target   The capturing HTML element which defined a [data-action].
   * @private
   */
  static async #toggleEffect(event, target) {
    const effect = this._getEmbeddedDocument(target);
    effect.update({ disabled: !effect.disabled });
  }

  /* -------------------------------------------------- */
  /*   Helper functions                                 */
  /* -------------------------------------------------- */

  /**
   * Fetches the embedded document representing the containing HTML element.
   *
   * @param {HTMLElement} target      The element subject to search.
   * @returns {Item|ActiveEffect}     The embedded Item or ActiveEffect.
   */
  _getEmbeddedDocument(target) {
    const docRow = target.closest("li[data-document-class]");
    if (docRow.dataset.documentClass === "Item") {
      return this.actor.items.get(docRow.dataset.itemId);
    } else if (docRow.dataset.documentClass === "ActiveEffect") {
      const parent = docRow.dataset.parentId === this.actor.id ?
        this.actor :
        this.actor.items.get(docRow?.dataset.parentId);
      return parent.effects.get(docRow.dataset.effectId);
    } else {
      console.warn("Could not find document class");
    }
  }

  /* -------------------------------------------------- */
  /*   Actor override handling                          */
  /* -------------------------------------------------- */

  /**
   * Submit a document update based on the processed form data.
   * @param {SubmitEvent} event                   The originating form submission event.
   * @param {HTMLFormElement} form                The form element that was submitted.
   * @param {object} submitData                   Processed and validated form data to be used for a document update.
   * @returns {Promise<void>}
   * @protected
   * @inheritdoc
   */
  async _processSubmitData(event, form, submitData) {
    const overrides = foundry.utils.flattenObject(this.actor.overrides);
    for (const k of Object.keys(overrides)) delete submitData[k];
    this.document.update(submitData);
  }

  /* -------------------------------------------------- */

  /**
   * Disables inputs subject to active effects.
   */
  #disableOverrides() {
    const flatOverrides = foundry.utils.flattenObject(this.actor.overrides);
    for (const override of Object.keys(flatOverrides)) {
      const input = this.element.querySelector(`[name="${override}"]`);
      if (input) input.disabled = true;
    }
  }
}
