import { delay } from '../mockUtils';
import { event } from '../event/apiMock';
import { UserApi, User } from './types';

export const member: User = {
  id: '1',
  firstName: "Альберт",
  lastName: "Попов",
  email: "admin@wing-ding.com",
  emailVerifiedAt: null,
  description:
    'Молодой человек из небольшого города Тула. Ищу удовольствие и новые знакомства. Люблю тусить и делать глупости =)',
  birthDate: null,
  photo: 'https://www.gannett-cdn.com/presto/2020/01/03/PCIN/ad5fc4b3-b5a4-4a3c-b6c3-cadb19e44810-Screen_Shot_2020-01-03_at_9.21.19_AM.jpg?crop=509,678,x16,y0&quality=50&width=640',
  createdAt: "2022-03-09T18:51:20.000000Z",
  updatedAt: "2022-03-09T19:03:31.000000Z",
  friends: 0,
  events: 2
};

export const member2: User = {
  id: '2',
  firstName: "Алеся",
  lastName: "Иванова",
  email: "шмфтщмф@wing-ding.com",
  emailVerifiedAt: null,
  description:
    'Молодая женщина из небольшого города Тула. Ищу удовольствие и новые знакомства. Люблю тусить и делать глупости =)',
  birthDate: null,
  photo: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=1&w=500',
  createdAt: "2022-03-09T18:51:20.000000Z",
  updatedAt: "2022-03-09T19:03:31.000000Z",
  friends: 1,
  events: 3
};

const userMockApi: UserApi = {
  auth: (request) => {
    console.log('POST /api/auth', request);
    return delay({ status: 200, data: { accessToken: '123456789' } });
  },

  registration: (request) => {
    console.log('POST /api/registration', request);
    return delay({ status: 200, data: { accessToken: '123456789' } });
  },

  getAuthorizedUser: () => {
    console.log('POST /api/user/profile/get');
    return delay({ status: 200, data: { user: member } });
  },

  getUser: id => {
    console.log(`POST /api/user/get/${id}`);
    return delay({ status: 200, data: { user: member2 } });
  },

  getUserEvents: id => {
    console.log(`POST /api/user/get/${id}/events`);
    return delay({ status: 200, data: [event] });
  },

  getFriendList: id => {
    console.log(`POST /api/user/get/${id}/friends`);
    return delay({ status: 200, friends: [member, member2] });
  },

  addToFriends: id => {
    console.log(`POST /api/user/friends/add/${id}`);
    return delay({ status: 200 });
  },

  deleteFromFriends: id => {
    console.log(`POST /api/user/friends/delete/${id}`);
    return delay({ status: 200 });
  },

  changeProfile: (request) => {
    console.log('POST /api/user/profile/change', request);
    return delay({ status: 200 });
  },
};

export default userMockApi;
