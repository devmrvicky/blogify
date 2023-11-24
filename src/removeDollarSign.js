// The work of this function is remove dollar ($) sign from user main data
export default function removeDollarSign(userMainData) {
  const prepareData = {};
  for (let key in userMainData) {
    if (key[0] === "$") continue;
    prepareData[key] = userMainData[key];
  }
  return prepareData;
}
