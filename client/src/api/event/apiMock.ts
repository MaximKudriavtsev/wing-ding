import { delay } from '../mockUtils';
import { EventApi, Event, Member } from './types';

const member: Member = {
  id: '1',
  firstName: "admin",
  lastName: "admin",
  email: "admin@wing-ding.com",
  emailVerifiedAt: null,
  description: "",
  birthDate: null,
  photo: 'https://img-fotki.yandex.ru/get/6436/244675082.51/0_10eb49_679c31ac_L.jpg',
  createdAt: "2022-03-09T18:51:20.000000Z",
  updatedAt: "2022-03-09T19:03:31.000000Z",
  friends: 0,
  events: 2
};

const event: Event = {
  id: 'event_id',
  title: 'Вечериночка у Ашота',
  img: 'https://artpostergallery.ru/userdata/image/thumbs/72/04/720434017f2b46c344c89a309e0468ac_2.jpg',
  place: 'г. Тула, ул. Ленина, дом 21',
  text: 'Как обычно, встречаемся чтобы побухать и тусануть. Посмотрим ютюбчик и немного выжрем.',
  host: {
    id: member.id,
    photo: member.photo,
    firstName: member.firstName,
    lastName: member.lastName,
  },
  date: "2022-02-20T00:00:00.000000Z",
  createdAt: "2022-03-09T19:03:25.000000Z",
  updatedAt: "2022-03-09T19:03:25.000000Z",
  membersCount: 1,
  membersPhoto: [
    member.photo,
  ],
}

const eventMockApi: EventApi = {
  createEvent: (request) => {
    console.log('POST /api/event/create', request);
    return delay({ status: 'success', id: '1' })
  },

  getEvent: id => {
    console.log(`GET /api/event/get/${id}`, id);
    return delay({ data: event })
  },

  getMembers: id => {
    console.log(`GET /api/event/get/${id}/users`, id);
    return delay({ status: 'success', members: [member] })
  },

  joinEvent: id => {
    console.log(`POST /api/event/join/${id}`, id);
    return delay({ status: 'success' });
  },

  leaveEvent: id => {
    console.log(`POST /api/event/leave/${id}`, id);
    return delay({ status: 'success' });
  },
};

export default eventMockApi;
