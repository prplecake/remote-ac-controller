import React, {useEffect, useState} from "react";
import {fetchAcPowerState, postIrCommand, postToggleAcPowerState} from "../api/remote-ac";
import {Container} from "reactstrap";

export function RemoteControl() {
  const [acPowerState, setAcPowerState] = useState<boolean>(false)

  useEffect(() => {
    fetchAcPowerState().then(data => {
      setAcPowerState(data.power_on);
    })
  }, [])

  //#region buttons
  function btn_toggle_ac_power_state() {
    postToggleAcPowerState().then(data => setAcPowerState(data.power_on));
  }

  function btn_power() {
    postIrCommand("KEY_POWER");
    // assume it was successfuly, I don't think we're getting any info back from lircd
    setAcPowerState(!acPowerState);
  }

  function btn_temp_up() {
    postIrCommand("TEMP_TIMER_UP");
  }

  function btn_temp_dwn() {
    postIrCommand("TEMP_TIMER_DWN");
  }

  function btn_fan_speed_inc() {
    postIrCommand("FAN_SPEED_INC");
  }

  function btn_fan_speed_dec() {
    postIrCommand("FAN_SPEED_DEC");
  }

  function btn_mode_cool() {
    postIrCommand("MODE_COOL");
  }

  function btn_mode_fan_only() {
    postIrCommand("MODE_FAN_ONLY");
  }

  function btn_mode_auto_fan() {
    postIrCommand("MODE_AUTO_FAN");
  }

  //#endregion buttons

  return (
    <Container>
      <button onClick={btn_power} type="button">
        <i className="bi bi-circle-fill"
           style={acPowerState ? {color: "green"} : {color: "red"} }
        ></i> Power
      </button>
      <input type="button" onClick={btn_temp_up} value="Temp +"/>
      <input type="button" onClick={btn_temp_dwn} value="Temp -"/>
      <br/>
      <p>
        <strong>Fan Speeds</strong>
      </p>
      <input type="button" onClick={btn_fan_speed_inc} value="Fan Speed +"/>
      <input type="button" onClick={btn_fan_speed_dec} value="Fan Speed -"/>
      <input type="button" onClick={btn_mode_auto_fan} value="Auto Fan Speed"/>
      <br/>
      <p>
        <strong>Modes</strong>
      </p>
      <input type="button" onClick={btn_mode_cool} value="Cool"/>
      <input type="button" onClick={btn_mode_fan_only} value="Fan Only"/>
      <p>
        <strong>Other</strong>
      </p>
      <input type="button" onClick={btn_toggle_ac_power_state} value="Toggle AC Power (App State)"/>
    </Container>
  );
}
