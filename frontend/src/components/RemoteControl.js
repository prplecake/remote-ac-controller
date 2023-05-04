/* eslint-disable no-unused-vars */

import React from 'react';

function btn_power() {
  send_command('KEY_POWER');
}

function btn_temp_up() {
  send_command('TEMP_TIMER_UP');
}

function btn_temp_dwn() {
  send_command('TEMP_TIMER_DWN');
}

function btn_fan_speed_inc() {
  send_command('FAN_SPEED_INC');
}

function btn_fan_speed_dec() {
  send_command('FAN_SPEED_DEC');
}

function btn_mode_cool() {
  send_command('MODE_COOL');
}

function btn_mode_fan_only() {
  send_command('MODE_FAN_ONLY');
}

function btn_mode_auto_fan() {
  send_command('MODE_AUTO_FAN');
}

function send_command(command) {
  fetch('/api/ir_blaster/send_once', {
    method: 'POST',
    body: JSON.stringify({
      command: command,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(function (res) {
    if (res.ok) {
      console.log(res);
      console.log(res.json());
    } else {
      console.log('Request failed.');
      console.log(res.json());
    }
  });
}

async function toggle_ac_power_state() {
  await fetch('/api/app/state/ac_power/toggle', {
    method: 'POST',
  })
    .then(function (res) {
      if (!res.ok) {
        console.warn('Request failed.');
        console.warn(res.json());
      }
      return res.json();
    })
    .then(function (data) {
      console.debug(data);
    });
}

async function get_ac_power_state() {
  await fetch('/api/app/state/ac_power')
    .then((response) => {
      if (!response.ok) {
        console.warn('Request failed');
        console.debug(response.json());
      }
      return response.json();
    })
    .then((data) => {
      console.debug(data);
    });
}

export function RemoteControl() {
  return (
    <div>
      <input type="button" onClick={btn_power} value="Power" />
      <input type="button" onClick={btn_temp_up} value="Temp +" />
      <input type="button" onClick={btn_temp_dwn} value="Temp -" />
      <br />
      <p>
        <strong>Fan Speeds</strong>
      </p>
      <input type="button" onClick={btn_fan_speed_inc} value="Fan Speed +" />
      <input type="button" onClick={btn_fan_speed_dec} value="Fan Speed -" />
      <input type="button" onClick={btn_mode_auto_fan} value="Auto Fan Speed" />
      <br />
      <p>
        <strong>Modes</strong>
      </p>
      <input type="button" onClick={btn_mode_cool} value="Cool" />
      <input type="button" onClick={btn_mode_fan_only} value="Fan Only" />
    </div>
  );
}
