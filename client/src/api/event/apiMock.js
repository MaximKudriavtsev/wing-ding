import { delay } from "../mockUtils";

const eventMockApi = {
  create() {
    return delay({});
  },

  join() {
    return delay({});
  },

  leave() {
    return delay({});
  },

  get() {
    return delay({});
  },

  list: {
    get() {
      return delay({});
    },
  },
};

export default eventMockApi;