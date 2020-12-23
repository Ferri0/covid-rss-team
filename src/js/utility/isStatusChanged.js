import properties from "../properties";

// check is properties period || region values changed
export default function () {
  let prevRegion = null;
  let prevPeriod = null;

  if (prevRegion !== properties.region || prevPeriod !== properties.period) {
    prevRegion = properties.region;
    prevPeriod = properties.period;
    return true;
  }
  return false;
}
