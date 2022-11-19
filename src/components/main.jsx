import React from "react";
import DeviceSelector from "./serial.jsx";
import Messages from "./messages.jsx";
import { Icon, InputNumber, Button } from "antd";
import fs from "fs";
export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      received: "",
      counts: [0, 0, 0, 0, 0, 0, 0, 0],
      recording: false,
      intervalTime: 6,
      interval: 0
    };
    this.file = null;
    if (!fs.existsSync(this.getUserHome() + "/desktop/mag_data")) {
      fs.mkdirSync(this.getUserHome() + "/desktop/mag_data");
    }
  }
  getUserHome() {
    return process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
  }
  getNow() {
    var date = new Date();
    return (
      date.getFullYear() +
      "_" +
      ("0" + (date.getMonth() + 1)).substr(-2, 2) +
      "_" +
      ("0" + date.getDate()).substr(-2, 2) +
      "_" +
      ("0" + date.getHours()).substr(-2, 2) +
      "_" +
      ("0" + date.getMinutes()).substr(-2, 2) +
      "_" +
      ("0" + date.getSeconds()).substr(-2, 2)
    );
  }
  componentDidMount() {
    this.refs.devices.setReceiver(this.onReceived.bind(this));
  }
  onChange(v) {
    this.state.intervalTime = v;
  }
  appendRecord() {
    try {
      var date = new Date();
      var now =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).substr(-2, 2) +
        "-" +
        ("0" + date.getDate()).substr(-2, 2) +
        " " +
        ("0" + date.getHours()).substr(-2, 2) +
        ":" +
        ("0" + date.getMinutes()).substr(-2, 2) +
        ":" +
        ("0" + date.getSeconds()).substr(-2, 2);
      var data = this.state.counts.join(",");
      fs.appendFileSync(this.file, now + "," + data + "\n");
      this.clearMessages();
    } catch (err) {
      console.log(err);
    }
  }
  clickRecord(e) {
    if (!this.state.recording) {
      this.clearMessages();
      this.file =
        this.getUserHome() + "/desktop/mag_data/" + this.getNow() + ".csv";
      this.state.interval = setInterval(
        this.appendRecord.bind(this),
        this.state.intervalTime * 60000
      );
    } else {
      clearInterval(this.state.interval);
      this.appendRecord();
    }
    this.setState({ recording: !this.state.recording });
  }
  onReceived(buffer) {
    var msg = buffer
      .toString()
      .split("\r")
      .join("");
    if (msg && msg.indexOf("\n") > -1) {
      this.state.received += msg;
      var arr = this.state.received.split("\n");
      if (arr.length > 1) {
        var counts = arr[0].split(",");
        if (counts.length == 8) {
          for (var i = 0; i < counts.length; i++) {
            counts[i] = Math.floor(counts[i] / 2);
          }
          if (this.state.counts != counts) {
            this.state.counts = counts;
            this.refs.messages.addMessage(this.state.counts.join(","), true);
          }
        }
        this.state.received = arr[1];
        this.refs.messages.forceUpdate();
      }
    } else if (msg) {
      this.state.received += msg;
    }
  }
  clearMessages() {
    this.state.counts = [0, 0, 0, 0, 0, 0, 0, 0];
    this.refs.devices.sendMessage("reset\n");
    this.refs.messages.clearMessages();
  }
  render() {
    return (
      <div className="content">
        <div className="nav">
          <div className="devices">
            <DeviceSelector ref="devices" />
          </div>
        </div>
        <div className="messages">
          <Messages ref="messages" />
        </div>
        <div className="messages-clear">
          <Icon
            onClick={this.clearMessages.bind(this)}
            style={{}}
            type="delete"
          />
        </div>
        <div className="footer">
          <div className="left">
            <InputNumber
              defaultValue={6}
              min={1}
              max={100}
              formatter={value => `${value} min`}
              parser={value => value.replace(" min", "")}
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div className="right">
            <Button
              type="primary"
              icon="poweroff"
              onClick={this.clickRecord.bind(this)}
            >
              {!this.state.recording ? "Start Recording" : "Stop Recording"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
