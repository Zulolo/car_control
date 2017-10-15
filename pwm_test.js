'use strict';

var assert = require('assert'),
  Gpio = require('pigpio').Gpio,
  iv,
  motor = new Gpio(13, {
    mode: Gpio.OUTPUT
  }),
  pulseWidth = 1500;

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

motor.servoWrite(pulseWidth);
// assert.strictEqual(motor.getServoPulseWidth(), 0,
//   'expected pulseWidth to be 0'
// );
wait(2000);
iv = setInterval(function() {
  var pulseWidthRead;

  motor.servoWrite(pulseWidth);

  pulseWidthRead = motor.getServoPulseWidth();
  assert.strictEqual(pulseWidthRead, pulseWidth,
    'expected pulseWidth to be ' + pulseWidth + ', not ' + pulseWidthRead
  );

  pulseWidth += 200;
  if (pulseWidth > 2500) {
    pulseWidth = 1500;
  }
}, 1500);

setTimeout(function() {
  clearInterval(iv);
  motor.digitalWrite(0);
}, 20000);
