import "../../utils/dist/index.es.mjs";
const ADD_MESSAGE = "ADD_MESSAGE";
const POP_MESSAGE = "POP_MESSAGE";
const RESET_QUEUE = "RESET_QUEUE";
function addMessage(message, duplicates) {
  return { type: ADD_MESSAGE, message, duplicates };
}
const popMessage = () => ({ type: POP_MESSAGE });
const resetQueue = () => ({ type: RESET_QUEUE });
function handleAddMessage(state, message, duplicates) {
  if (duplicates !== "allow" && !message.messageId) {
    throw new Error(
      `A messageId is required when the "${duplicates}" duplicate behavior is enabled but it was not provided in the current message.`
    );
  }
  if (state.length === 0) {
    state.push(message);
    return state;
  }
  const { messageId, messagePriority = "normal" } = message;
  const i = state.findIndex((mes) => mes.messageId === messageId);
  const isNext = messagePriority === "next";
  const isNormal = messagePriority === "normal";
  const isReplace = messagePriority === "replace";
  const isImmediate = messagePriority === "immediate";
  const isDuplicable = duplicates === "allow";
  const isRestart = duplicates === "restart";
  if (isNext || isImmediate) {
    const nextState = state;
    if (!isDuplicable && i > 0) {
      nextState.splice(i, 1);
    }
    const current = nextState.shift();
    if (isImmediate && current.messagePriority !== "immediate") {
      nextState.unshift(current, message, current);
      return nextState;
    }
    nextState.unshift(current, message);
    return nextState;
  }
  if (i === -1 || isDuplicable && isNormal) {
    state.push(message);
    return state;
  }
  if (isNormal) {
    if (isRestart) {
      debugger;
      return state;
    }
    return state;
  }
  if (isReplace) {
    const nextState = state;
    nextState[i] = message;
    return nextState;
  }
  state.push(message);
  return state;
}
function reducer(state) {
  const addMessage2 = (message, duplicates) => {
    handleAddMessage(state, message, duplicates);
  };
  const popMessage2 = () => state.length ? (state.shift(), state) : state;
  const resetQueue2 = () => state.length ? (state.length = 0, state) : state;
  return { state, addMessage: addMessage2, popMessage: popMessage2, resetQueue: resetQueue2 };
}
export {
  ADD_MESSAGE,
  POP_MESSAGE,
  RESET_QUEUE,
  addMessage,
  handleAddMessage,
  popMessage,
  reducer,
  resetQueue
};
