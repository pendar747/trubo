import { on, fire } from "../../util";
import { MessageData } from "./types";

const runState = (worker: Worker, stateName: string): Worker => {
  worker.onerror = (event) => {
    console.error(event.message, event.filename, event.lineno);
  }

  worker.onmessage = (event) => {
    const data: MessageData = event.data;
    if (data.type == 'state-update') {
      localStorage.setItem(stateName, JSON.stringify(data.data));
      fire('state-update', {
        stateName,
        state: data.data
      });
    }
  }

  on(`${stateName}-add-getters`, (event) => {
    const messageData: MessageData = {
      stateName,
      type: 'getters-update',
      data: event.detail
    }
    worker.postMessage(messageData);
  });

  on('action', (event) => {
    const messageData: MessageData = {
      stateName,
      type: 'action',
      actionName: event.detail.actionName,
      data: event.detail.data,
      model: event.detail.model
    }
    worker.postMessage(messageData);
  });

  return worker;
}

export default runState;