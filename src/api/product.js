/*
 * @Descripttion: 
 * @Author: lhw
 * @Date: 2020-04-06 16:50:04
 * @LastEditTime: 2020-04-06 22:19:55
 */
const list = [
  {
    id: 1,
    name: '小二黑的店',
    coverUrl: require("@/assets/img/1.jpg"),
    price: 87.00,
    desc: '雪纺衬衫女新款女装衬衫春韩版2020休闲长袖小众女衬衫上衣打底衫',
    soldNum: 2380,
    discount: true
  },
  {
    id: 2,
    name: '母婴用品',
    coverUrl: require("@/assets/img/2.jpg"),
    price: 85.20,
    desc: '可爱宝贝纸尿裤L婴儿超薄透气干爽尿不湿男女宝SMLXL任选',
    soldNum: 831,
    discount: false
  },
  {
    id: 3,
    name: '国际时尚',
    coverUrl: require("@/assets/img/3.jpg"),
    price: 249.00,
    desc: '桔梗吊带连衣裙超仙女裙子2020夏季新款法式复古碎花裙蕾丝荷叶边',
    soldNum: 6128,
    discount: true
  },
  {
    id: 4,
    name: '冒泡poll旗舰店',
    coverUrl: require("@/assets/img/4.jpg"),
    price: 138.00,
    desc: '男鞋春季2020新款韩版潮流小白鞋男透气白色运动鞋子男士休闲板鞋',
    soldNum: 182,
    discount: false
  }
]

export function requestGetProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve ({
          code: 200,
          msg: 'success',
          data: list
        })
      }, 1000);
    })
} 