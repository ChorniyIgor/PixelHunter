export class DefaultAdapter {
  constructor() {
    if (this.target === DefaultAdapter) {
      throw new Error(`Don't create DefaultAdapter`);
    }
  }

  preprocess(data) {
    return data;
  }

  toServer(data) {
    return data;
  }
}

export default class networkModel {
  get urlRead() {
    throw new Error(`Url to read is not defined`);
  }

  get urlWrite() {
    throw new Error(`Url to write is not defined`);
  }

  load() {
    return fetch(this.urlRead);
  }

  loadStats() {
    return fetch(this.urlReadStats);
  }

  send(data, adapter) {
    const SendSettings = {
      body: adapter.toServer(data),
      headers: {
        "Content-Type": `application/json`
      },
      method: `POST`
    };

    return fetch(this.urlWrite, SendSettings);
  }
}
