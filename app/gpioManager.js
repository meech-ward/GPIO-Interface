const GpioOutPin = require('./gpio/GpioOutPin');

const pinCache = {
};

function pinForPinNumber(pinNumber) {
  let pin = pinCache[pinNumber];
  if (!pin) {
    pin = new GpioOutPin(pinNumber);
  }
  return pin;
}

function updatePin(pinNumber, pinValue) {
  return new Promise((resolve, reject) => {
    const pin = pinForPinNumber(pinNumber);
    resolve(pin.setValue(pinValue));
  });
}
exports.updatePin = updatePin;