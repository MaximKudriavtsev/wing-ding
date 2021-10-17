import MockApi from "./api/mock";
import HttpApi from "./api/production";

export const api = process.env.SERVER_CONFIG === 'real' ? HttpApi : MockApi;