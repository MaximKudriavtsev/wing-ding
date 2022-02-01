import { delay } from '../mockUtils';

const user = {
  id: 'some_user_id',
  firstName: 'Альберт',
  lastName: 'Попов',
  email: 'albert.popov@mail.com',
  description:
    'Молодой человек из небольшого города Тула. Ищу удовольствие и новые знакомства. Люблю тусить и делать глупости =)',
  avatarImage:
    'https://www.gannett-cdn.com/presto/2020/01/03/PCIN/ad5fc4b3-b5a4-4a3c-b6c3-cadb19e44810-Screen_Shot_2020-01-03_at_9.21.19_AM.jpg?crop=509,678,x16,y0&quality=50&width=640',
  images: [
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFsZSUyMGZhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
    'https://media.istockphoto.com/photos/headshot-of-44-year-old-mixed-race-man-in-casual-polo-shirt-picture-id1264106963?b=1&k=20&m=1264106963&s=170667a&w=0&h=dLQliHpFkaweGQhiRfkNGkwsAPoKCEy9UWWk-m2iCCk=',
    'https://static1.bigstockphoto.com/1/7/2/large1500/27169880.jpg',
  ],
  birthDate: 813272400000,
  friendsIds: [],
  authorEventsIds: [],
  participatedEventsIds: [],
  verified: true,
  createdAt: 1634498212777,
  interestTags: ['sport', 'bars', 'dance'],
};

const userMockApi = {
  auth({ login, password }) {
    return delay({
      jwt: 'some jwt token',
    });
  },

  registration({ firstName, lastName, email, birthDate }) {
    return delay({
      ...user,
      firstName,
      lastName,
      email,
      birthDate,
    });
  },

  profile: {
    get(id) {
      return delay(user);
    },

    change(changes) {
      return delay({ ...user, ...changes });
    },
  },

  friends: {
    get(userId) {
      return delay({
        friends: [
          {
            id: 'friend1_id',
            firstName: 'Михаил',
            lastName: 'Михайлов',
          },
        ],
      });
    },

    add() {
      return delay(user);
    },
  },
};

export default userMockApi;
