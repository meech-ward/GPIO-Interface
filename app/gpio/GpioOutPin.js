const onoff = require('onoff');
const Gpio = onoff.Gpio;

class GpioOutPin {
  constructor(pinNumber) {
    this.pinNumber = pinNumber;
    this.gpioPin = new Gpio(pinNumber, 'out');
    this.turnOffSync();
  }

  setValueSync(value) {
    return this._writeSync(value);
  }

  setValue(value) {
    return this._write(value);
  }

  turnOn() {
    return this._write(1);
  }

  turnOff() {
    return this._write(0);
  }

  turnOnSync() {
    return this._writeSync(1);
  }

  turnOffSync() {
    return this._writeSync(0);
  }

  _write(state) {
    return new Promise((resolve, reject) => {
      this.gpioPin.write(state, (error) => {
        if (error) {
          reject(error);
        } else {
          this.read()
            .then(resolve)
            .catch(reject);
        }
      });
    });
  }

  _writeSync(state) {
    this.gpioPin.writeSync(state);
  }

  read() {
    return new Promise((resolve, reject) => {
      this.gpioPin.read((error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }
}
module.exports = GpioOutPin;