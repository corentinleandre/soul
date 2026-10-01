// Sheet imports
import * as apps from "./src/module/apps/_module.mjs";

// DataModel imports
// ---- Actors
import BaseModel from "./src/module/data/actor/base.mjs";
// ---- Items
import Skill from "./src/module/data/item/skill.mjs";
// ---- Comabatant
import Player from "./src/module/data/combatant/player.mjs";

// Document imports
import SOULActiveEffect from "./src/module/documents/SOULActiveEffect.mjs";
import SOULActor from "./src/module/documents/SOULActor.mjs";
import SOULCard from "./src/module/documents/SOULCard.mjs";
import SOULCards from "./src/module/documents/SOULCards.mjs";
import SOULChatMessage from "./src/module/documents/SOULChatMessage.mjs";
import SOULCombat from "./src/module/documents/SOULCombat.mjs";
import SOULCombatant from "./src/module/documents/SOULCombatant.mjs";
import SOULItem from "./src/module/documents/SOULItem.mjs";
import SOULScene from "./src/module/documents/SOULScene.mjs";
import SOULUser from "./src/module/documents/SOULUser.mjs";

import SOUL from "./src/module/config.mjs";
import { localizeHelper } from "./src/module/helpers/utils.mjs";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", () => {
  CONFIG.SOUL = SOUL;

  // Assign document classes
  CONFIG.ActiveEffect.documentClass = SOULActiveEffect;
  CONFIG.Actor.documentClass = SOULActor;
  CONFIG.Card.documentClass = SOULCard;
  CONFIG.Cards.documentClass = SOULCards;
  CONFIG.ChatMessage.documentClass = SOULChatMessage;
  CONFIG.Combat.documentClass = SOULCombat;
  CONFIG.Combatant.documentClass = SOULCombatant;
  CONFIG.Item.documentClass = SOULItem;
  CONFIG.Scene.documentClass = SOULScene;
  CONFIG.User.documentClass = SOULUser;

  CONFIG.Actor.defaultType = "basechar";

  // Assign DataModels
  // ---- Actors
  CONFIG.Actor.dataModels["basechar"] = BaseModel;

  // ---- Items
  CONFIG.Item.dataModels["skill"] = Skill;

  // ---- Combatants
  CONFIG.Combatant.dataModels["player"] = Player;

  // Document Sheets
  foundry.documents.collections.Actors.registerSheet("soul", apps.Actor.SOULActorSheet, {
    makeDefault: true, label: "SOUL.Sheets.Labels.ActorSheet",
  });
  foundry.documents.collections.Items.registerSheet("soul", apps.Item.SOULItemSheet, {
    makeDefault: true, label: "SOUL.Sheets.Labels.ItemSheet",
  });

  // Sidebar tabs
  CONFIG.ui.combat = apps.Combat.SOULCombatTracker;
});

Hooks.once("i18nInit", () => {
  // Localizing the system's CONFIG object
  localizeHelper(CONFIG.SOUL);
});

Hooks.on("renderCombatantConfig", apps.Combatant.hooks.renderCombatantConfig);
