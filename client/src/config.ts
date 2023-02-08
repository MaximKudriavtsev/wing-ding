import { Platform } from 'react-native';

import env from '../config';

import MockApi from './api/mock';
import HttpApi from './api/production';

export const api = env.SERVER_CONFIG === 'real' ? HttpApi : MockApi;
export const TOKEN_PROP = 'accessToken';

export enum OperatingSystemType {Ios = 'IOS' , Android = 'ANDROID'}
export const OPERATING_SYSTEM = Platform.OS === 'ios' ? OperatingSystemType.Ios : OperatingSystemType.Android;
