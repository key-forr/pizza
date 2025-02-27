export const categories = [
  {
    name: "Піцци",
  },
  {
    name: "Сніданок",
  },
  {
    name: "Закуски",
  },
  {
    name: "Коктейлі",
  },
  {
    name: "Напої",
  },
];

export const ingredients = [
  {
    name: "Сирний бортик",
    price: 179,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650204/Сирний_бортик_aov1uo.png",
  },
  {
    name: "Сливочна моцарелла",
    price: 79,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650205/Сливочна_моцарелла_kxc6ed.png",
  },
  {
    name: "Сири чеддер і пармезан",
    price: 79,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650204/Сири_чеддер_і_пармезан_lwalzp.png",
  },
  {
    name: "Гострий перець халапеньо",
    price: 59,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650198/Гострий_перець_халапеньо_axuwe5.png",
  },
  {
    name: "Ніжне курча",
    price: 79,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650203/Ніжне_курча_qxeoxd.png",
  },
  {
    name: "Шампіньйони",
    price: 59,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650206/Шампіньйони_oajmvd.png",
  },
  {
    name: "Бекон",
    price: 79,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650198/Бекон_dq2few.png",
  },
  {
    name: "Шинка",
    price: 79,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650206/Шинка_lzvwnl.png",
  },
  {
    name: "Пікатна пепероні",
    price: 79,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650203/Пікатна_пепероні_xkj8gr.png",
  },
  {
    name: "Гостра чорізо",
    price: 79,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650198/Гостра_чорізо_plml7x.png",
  },
  {
    name: "Мариновані огірки",
    price: 59,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650199/Мариновані_огірки_q2fcq9.png",
  },
  {
    name: "Свіжі помідори",
    price: 59,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650203/Свіжі_помідори_s9plmm.png",
  },
  {
    name: "Червона цибуля",
    price: 59,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650205/Червона_цибуля_tnprob.png",
  },
  {
    name: "Сочні ананаси",
    price: 59,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650205/Сочні_ананаси_varecl.png",
  },
  {
    name: "Італьянські трави",
    price: 39,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650198/Італьянські_трави_xaje9r.png",
  },
  {
    name: "Солодкий перець",
    price: 59,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650204/Солодкий_перець_nrjkvb.png",
  },
  {
    name: "Кубіки бринзи",
    price: 79,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650199/Кубіки_бринзи_t3h1nl.png",
  },
  {
    name: "Мітболи",
    price: 79,
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650202/Мітболи_nyxksw.png",
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: "Омлет с шинкою і грибами",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740662321/Омлет_с_шинкою_і_грибами_lrvmdl.png",
    categoryId: 2,
  },
  {
    name: "Омлет с пепероні",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740662611/Омлет_с_пепероні_nk79zb.png",
    categoryId: 2,
  },
  {
    name: "Сендвіч з шинкою і сиром",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740663166/Сендвіч_з_шинкою_і_сиром_mhlcwx.png",
    categoryId: 3,
  },
  {
    name: "Курячі нагетси",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650199/Курячі_нагетси_bbdw23.webp",
    categoryId: 3,
  },
  {
    name: "Картопля з печі з соусом",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650199/Картопля_з_печі_з_соусом_e6b7p1.webp",
    categoryId: 3,
  },
  {
    name: "Класичний хот дог",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740663624/Класичний_хот_дог_i2qtvm.png",
    categoryId: 3,
  },
  {
    name: "Гострий хот дог",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740663896/Гострий_хот_дог_u02nxp.png",
    categoryId: 3,
  },
  {
    name: "Банановий молочний коктейль",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740661917/Банановий_молочний_коктейль_cy7shz.png",
    categoryId: 4,
  },
  {
    name: "Карамельно яблоко молочний коктейль",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740661793/Карамельно_яблоко_молочний_коктейль_gqnz1j.png",
    categoryId: 4,
  },
  {
    name: "Молочний коктейль з печеням Орео",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740661674/Молочний_коктейль_з_печеням_Орео_d9wojs.png",
    categoryId: 4,
  },
  {
    name: "Класичний молочний коктейль",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740660898/Класичний_молочний_коктейль_ovnanu.png",
    categoryId: 4,
  },
  {
    name: "Ірландське капучино",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650198/Ірландський_Капучино_m95sh7.webp",
    categoryId: 5,
  },
  {
    name: "Карамельне капучіно",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650198/Кава_Карамельний_капучино_dz1akd.webp",
    categoryId: 5,
  },
  {
    name: "Кокосове латте",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650198/Кава_Кокосовий_латте_zmajw9.webp",
    categoryId: 5,
  },
  {
    name: "Американо",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650197/Кава_Американо_zprfs0.webp",
    categoryId: 5,
  },
  {
    name: "Латте",
    imageUrl:
      "https://res.cloudinary.com/dilgog6bf/image/upload/v1740650198/Кава_Латте_m89ukp.webp",
    categoryId: 5,
  },
];
