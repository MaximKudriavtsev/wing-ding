import { delay } from "../mockUtils";

const userMockApi = {
  auth() {
    return delay({});
  },

  registration() {
    return delay({});
  },

  profile: {
    get() {
      return delay({});
    },

    change() {
      return delay({});
    },
  },

  friends: {
    get() {
      return delay({});
    },

    add() {
      return delay({});
    }
  }
};

export default userMockApi;