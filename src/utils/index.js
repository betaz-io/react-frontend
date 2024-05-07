import numeral from "numeral";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, formatBalance, isHex, BN } from "@polkadot/util";

import {
  SupportedChainId,
  resolveAddressToDomain,
  resolveDomainToAddress,
} from "@azns/resolver-core";

export const convertToBalance = (value, decimal = 12) => {
  let amount = parseFloat(value);
  return formatNumToBN(amount, decimal);
};

export const checkBalance = (currentAccount, value, money = "azero") => {
  let a;
  if (money === "azero")
    a = parseFloat(currentAccount?.balance?.azero?.replaceAll(",", ""));
  else a = parseFloat(currentAccount?.balance?.betaz?.replaceAll(",", ""));
  let b = parseFloat(value);
  return a >= b;
};

export const convertBalanceToNumber = (value, decimal = 12) => {
  let result = parseFloat(value?.toHuman().Ok.replace(/\,/g, ""));
  return result / 10 ** decimal;
};

export const formatChainStringToNumber = (str) => {
  if (typeof str !== "string") return str;

  return str.replace(/,/g, "").replace(/"/g, "");
};

export const addressShortener = (addr = "", digits = 5) => {
  digits = 2 * digits >= addr.length ? addr.length : digits;
  return `${addr.substring(0, digits)}...${addr.slice(-digits)}`;
};

export const formatQueryResultToNumber = (result, chainDecimals = 12) => {
  const ret = result?.toHuman()?.Ok?.replaceAll(",", "");

  const formattedStrBal = formatBalance(ret, {
    withSi: false,
    forceUnit: "-",
    decimals: chainDecimals,
  });

  return formattedStrBal;
};

export const formatTokenBalance = (result, number = 2) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: number,
  });
  return formatter.format(result).replace(/^\$/, "");
};

export function isAddressValid(address) {
  try {
    const formattedAddress = isHex(address)
      ? hexToU8a(address)
      : decodeAddress(address);

    encodeAddress(formattedAddress);

    return true;
  } catch (error) {
    // console.log(error);
    return false;
  }
}

export const formatNumToBN = (number = 0, decimal = 12) => {
  let numberMul = 6;
  if (number > 10 ** 6) {
    numberMul = 0;
  }
  return new BN(+number * 10 ** numberMul)
    .mul(new BN(10 ** (decimal - numberMul)))
    .toString();
};

export function shortenNumber(number) {
  return nFormatter(number, 1);
}

function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export function isValidImage(imageUrl) {
  try {
    fetch(imageUrl).then((res) => {
      if (res.status === 200) return true;
      return false;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function convertStringToPrice(stringPrice) {
  try {
    /* eslint-disable no-useless-escape */
    const a = stringPrice.replace(/\,/g, "");
    // let price = new BN(a, 10).div(new BN(10 ** 6)).toNumber();
    return a / 10 ** 12;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export function convertStringToDateTime(stringTimeStamp) {
  /* eslint-disable no-useless-escape */
  const a = stringTimeStamp.replace(/\,/g, "");
  const dateObject = new Date(parseInt(a));
  return dateObject.toLocaleString(); //2019-12-9 10:30:15
}

export function convertTimeStampToNumber(timeStamp) {
  let endTimeString = timeStamp ? timeStamp.toString() : 0;
  let endTimeWithoutCommas = endTimeString
    ? endTimeString.replace(/\,/g, "")
    : "";
  return +new Date(parseInt(endTimeWithoutCommas));
}

export function isValidAddressPolkadotAddress(address) {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    // console.log(error);
    return false;
  }
}

export function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export const convertTimeStamp = (input) => {
  let time = input.replace(/\,/g, "");
  if (time <= 0) return "";
  var d = new Date(time);
  return (
    twoDigit(d.getDate()) +
    "/" +
    twoDigit(d.getMonth() + 1) +
    "/" +
    d.getFullYear() +
    " " +
    twoDigit(d.getHours()) +
    ":" +
    twoDigit(d.getMinutes()) +
    ":" +
    twoDigit(d.getSeconds())
  );
};

export const secondsToTime = (secs) => {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    h: twoDigit(hours),
    m: twoDigit(minutes),
    s: twoDigit(seconds),
  };
  return obj;
};

export const convertTimeStampNoTime = (input) => {
  let time = input.replace(/\,/g, "");
  if (time <= 0) return "";
  var d = new Date(time);
  return (
    twoDigit(d.getDate()) +
    "/" +
    twoDigit(d.getMonth() + 1) +
    "/" +
    d.getFullYear()
  );
};

export const twoDigit = (myNumber) => {
  return ("0" + myNumber).slice(-2);
};

export const twoDigitTime = (time) => {
  if (time < 10) return "0" + time;
  else return time + "";
};

export const truncateStr = (str, n = 6) => {
  if (!str) return "";
  return str.length > n
    ? str.substr(0, n - 1) + "..." + str.substr(str.length - n, str.length - 1)
    : str;
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatPoolBalance = (result, decimal = 12, dec = 4) => {
  const ret = result?.toHuman()?.Ok?.replaceAll(",", "");
  let x = ret / 10 ** decimal;
  return formatNumDynDecimal(x);
};

export const formatNumDynDecimal = (num = 0, dec = 4) => {
  const number = parseInt(num * 10 ** dec) / 10 ** dec;
  const numStr = number.toString();
  const dotIdx = numStr.indexOf(".");

  if (dotIdx === -1) {
    return numeral(numStr).format("0,0");
  }

  const intPart = numeral(numStr.slice(0, dotIdx)).format("0,0");
  const decPart = numStr.slice(dotIdx + 1, numStr.length);

  return intPart + `${dotIdx === -1 ? "" : `.${decPart}`}`;
};
// AZERO ID
export const resolveDomain = async (address) => {
  const chain = {
    "alephzero-testnet": SupportedChainId.AlephZeroTestnet,
    "alephzero-mainnet": SupportedChainId.AlephZero,
  };

  const chainId = chain[process.env.REACT_APP_NETWORK];
  try {
    const { primaryDomain } = await resolveAddressToDomain(address, {
      chainId: chainId,
    });
    return primaryDomain;
  } catch (error) {
    console.log("resolveDomain error", error);
  }
};

export const getDomainToAddress = async (domain) => {
  const chain = {
    "alephzero-testnet": SupportedChainId.AlephZeroTestnet,
    "alephzero-mainnet": SupportedChainId.AlephZero,
  };

  const chainId = chain[process.env.REACT_APP_NETWORK];

  try {
    const { address } = await resolveDomainToAddress(domain, {
      chainId: chainId,
    });
    return address;
  } catch (error) {
    console.log("resolveDomain error", error);
  }
};

export const getNextDayTime = (nextDay = 6) => {
  let currentDate = new Date();

  while (currentDate.getDay() !== nextDay) {
    currentDate.setDate(currentDate.getDate() + 1);
  }
  currentDate.setHours(0, 0, 0, 0);
  return currentDate.getTime();
};

export const getNextHourTime = (hours = 4) => {
  let currentDate = new Date();
  let start = currentDate.getHours();
  let startHour = currentDate.getHours();

  if (start > 0 && start < 4) {
    startHour = 0;
  } else if (start > 4 && start < 8) {
    startHour = 4;
  } else if (start > 8 && start < 12) {
    startHour = 8;
  } else if (start > 12 && start < 16) {
    startHour = 12;
  } else if (start > 16 && start < 20) {
    startHour = 16;
  } else if (start > 20 && start < 24) {
    startHour = 20;
  }

  currentDate.setHours(startHour + hours);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  return currentDate.getTime();
};

export const getStartAndEndOfWeek = () => {
  let currentDate = new Date();

  currentDate.setDate(currentDate.getDate() - currentDate.getDay());

  let startOfWeek = currentDate.getDate();
  let startOfMonth = currentDate.getMonth() + 1;
  let startOfYear = currentDate.getFullYear();
  let formattedStartOfWeek = `${startOfWeek < 10 ? "0" : ""}${startOfWeek}/${
    startOfMonth < 10 ? "0" : ""
  }${startOfMonth}/${startOfYear}`;

  currentDate.setDate(currentDate.getDate() + 6);

  let endOfWeek = currentDate.getDate();
  let endOfMonth = currentDate.getMonth() + 1;
  let endOfYear = currentDate.getFullYear();
  let formattedEndOfWeek = `${endOfWeek < 10 ? "0" : ""}${endOfWeek}/${
    endOfMonth < 10 ? "0" : ""
  }${endOfMonth}/${endOfYear}`;

  return {
    startOfWeek: formattedStartOfWeek,
    endOfWeek: formattedEndOfWeek,
  };
};
