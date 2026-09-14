/**
 * A simple extension that adds a hook at the end of data prep.
 */
export default class SOULChatMessage extends foundry.documents.ChatMessage {
  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();

    /**
     * Flexible hook for modules to alter derived document data.
     * @param {SOULChatMessage} message      The chat message preparing derived data.
     */
    Hooks.callAll("SOUL.prepareChatMessageData", this);
  }
}
