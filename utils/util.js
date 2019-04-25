import { regeneratorRuntime } from '../libs/zoro'
export const promise = handler => () =>
  new Promise((resolve, reject) => {
    handler({
      success: resolve,
      fail: reject
    });
  });

export function isIdCard(card) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(card)
}

export function isName(name) {
  const regName = /^[\u4e00-\u9fa5]{2,4}$/; 
  return regName.test(name)
} 

export function isPone(phone) {
  const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  return myreg.test(phone)
}