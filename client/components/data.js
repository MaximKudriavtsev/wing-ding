export const DATA = [
  {
    id: '1',
    img: 'https://www.zodijak.rs/images/cache/6aeca4d964fe963354f2243af9447798_w670_h436_cp.jpg',
    title: 'Тусовка на Искре',
    place: 'Искра',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ea blanditiis alias quaerat aperiam, beatae, quam sed dolorum temporibus dolorem, nemo omnis? Necessitatibus asperiores eaque eos totam perferendis excepturi quasi ipsam ut doloremque vero sunt rem culpa dolor dicta facilis similique nulla ad, soluta iure quisquam sed! Optio, dolorem at?',
    hostId: '1',
    date: new Date(2021, 11, 12, 22, 0).toJSON(),
    membersIds: ['1', '4', '5'],
  },
  {
    id: '2',
    img: 'https://donday.ru/uploads/posts/2017-12/1514199926_michigan-state-party.png',
    title: 'Вписка в Петелино',
    place: 'Петелино, ул. Антохи, д. 69',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ea blanditiis alias quaerat aperiam, beatae, quam sed dolorum temporibus dolorem, nemo omnis? Necessitatibus asperiores eaque eos totam perferendis excepturi quasi ipsam ut doloremque vero sunt rem culpa dolor dicta facilis similique nulla ad, soluta iure quisquam sed! Optio, dolorem at?',
    hostId: '2',
    date: new Date(2021, 11, 12, 20, 0).toJSON(),
    membersIds: ['2', '3'],
  },
  {
    id: '3',
    img: 'https://sun9-23.userapi.com/c857528/v857528392/1a20de/DldtFxOPQDY.jpg',
    title: 'Движ в Костомарово',
    place: 'Костомарово, ул. Димона, д. 1',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ea blanditiis alias quaerat aperiam, beatae, quam sed dolorum temporibus dolorem, nemo omnis? Necessitatibus asperiores eaque eos totam perferendis excepturi quasi ipsam ut doloremque vero sunt rem culpa dolor dicta facilis similique nulla ad, soluta iure quisquam sed! Optio, dolorem at?',
    hostId: '3',
    date: new Date(2022, 5, 8, 16, 0).toJSON(),
    membersIds: ['1', '4', '5'],
  },
  {
    id: '4',
    img: 'https://static.wixstatic.com/media/f5764b_e3f7e7cbb65f479187ab8b4dffac486f~mv2.jpg/v1/fill/w_333,h_250,fp_0.50_0.50,q_90/f5764b_e3f7e7cbb65f479187ab8b4dffac486f~mv2.jpg',
    title: 'Тур по Ликерке',
    place: 'Ликерка Лофт',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ea blanditiis alias quaerat aperiam, beatae, quam sed dolorum temporibus dolorem, nemo omnis? Necessitatibus asperiores eaque eos totam perferendis excepturi quasi ipsam ut doloremque vero sunt rem culpa dolor dicta facilis similique nulla ad, soluta iure quisquam sed! Optio, dolorem at?',
    hostId: '4',
    date: new Date(2022, 0, 3, 21, 0).toJSON(),
    membersIds: ['4', '5', '1', '2'],
  },
  {
    id: '5',
    img: 'https://cdn-asset.jawapos.com/wp-content/uploads/2019/08/63085489_ML-640x480.jpg',
    title: 'Афтерпати Анакондаз',
    place: 'Клуб BackStage',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ea blanditiis alias quaerat aperiam, beatae, quam sed dolorum temporibus dolorem, nemo omnis? Necessitatibus asperiores eaque eos totam perferendis excepturi quasi ipsam ut doloremque vero sunt rem culpa dolor dicta facilis similique nulla ad, soluta iure quisquam sed! Optio, dolorem at?',
    hostId: '5',
    date: new Date(2021, 3, 21, 19, 0).toJSON(),
    membersIds: ['5', '1'],
  },
  {
    id: '6',
    img: 'https://pravda-tula.restexpert.com/photos/restaurant/77538/644x483/338320.jpg',
    title: 'За стойку Правды',
    place: 'Гастрономичксий Паб Правда',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ea blanditiis alias quaerat aperiam, beatae, quam sed dolorum temporibus dolorem, nemo omnis? Necessitatibus asperiores eaque eos totam perferendis excepturi quasi ipsam ut doloremque vero sunt rem culpa dolor dicta facilis similique nulla ad, soluta iure quisquam sed! Optio, dolorem at?',
    hostId: '1',
    date: new Date(2020, 11, 12, 22, 0).toJSON(),
    membersIds: ['1', '2'],
  },
];

export const USERS = [
  {
    id: '1',
    name: 'Морозов Дмитрий',
    birthDate: '08.06.1996',
    photo:
      'https://sun9-21.userapi.com/impf/ZXkl3z8HooeDiupO_Nrc3mET12ujJ_QAK5qTug/1z6fJl3A4EQ.jpg?size=2560x2063&quality=96&sign=3496e261aeb92e8441b9a2ff8627fdf0&type=album',
    friendsId: ['2', '3'],
  },
  {
    id: '2',
    name: 'Шамордин Антон',
    birthDate: '20.02.1996',
    photo:
      'https://sun9-16.userapi.com/impg/c858016/v858016841/224242/0bO_LIKjjW0.jpg?size=1620x2160&quality=96&sign=62ee0cfa9c24c32ec74f0203c49bb343&type=album',
    friendsId: ['3', '4'],
  },
  {
    id: '3',
    name: 'Кудрявцев Максим',
    birthDate: '29.01.1996',
    photo:
      'https://sun9-86.userapi.com/impg/3mge_x8OKZTJswN8w7XtPNxMuXYD7kabKtWzJQ/OEpwQcDow30.jpg?size=1439x2160&quality=96&sign=c4ab44275b5938d08f3ebc8f10cec423&type=album',
    friendsId: ['4', '5'],
  },
  {
    id: '4',
    name: 'Мишина Анастасия',
    birthDate: '31.10.1996',
    photo:
      'https://sun9-37.userapi.com/impf/c841234/v841234410/51658/2SmjB2IXHgE.jpg?size=960x1280&quality=96&sign=458314b860ba3d45cbef73cc433793de&type=album',
    friendsId: ['5', '1'],
  },
  {
    id: '5',
    name: 'Максимчук Сергей',
    birthDate: '16.02.1995',
    photo:
      'https://sun9-2.userapi.com/impf/9LgWHzbAApYCy30LawkRQcs1ye9Kiyxl3FJX0w/FDGr0EpC-AY.jpg?size=1440x2160&quality=96&sign=805b71d9f86685d3b357c73b85367f63&type=album',
    friendsId: ['1', '2'],
  },
];

export const ME = {
  id: '1',
  name: 'Морозов Дмитрий',
  birthDate: '08.06.1996',
  photo:
    'https://sun9-21.userapi.com/impf/ZXkl3z8HooeDiupO_Nrc3mET12ujJ_QAK5qTug/1z6fJl3A4EQ.jpg?size=2560x2063&quality=96&sign=3496e261aeb92e8441b9a2ff8627fdf0&type=album',
  friendsId: ['2', '3'],
};
