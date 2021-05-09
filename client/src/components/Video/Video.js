import React, { useContext, useEffect, useState, useRef } from "react";
import VideoContext from "../../context/VideoContext";
import "./Video.css";
import { Card, Modal, Button, Input, notification, Avatar } from "antd";
import Man from "../../assests/man.svg";
import VideoIcon from "../../assests/video.svg";
import { io } from "socket.io-client";
import VideoOff from "../../assests/video-off.svg";
// import Profile from "../../assests/profile.svg";
import Msg_Illus from "../../assests/msg_illus.svg";
import Msg from "../../assests/msg.svg";
import { UserOutlined, MessageOutlined } from "@ant-design/icons";

import { socket } from "../../context/VideoState";

// const socket = io()
const { Search } = Input;
const Video = () => {
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
    sendMsg: sendMsgFunc,
    msgRcv,
    chat,
    setChat,
    userName,
    myVdoStatus,
    userVdoStatus,
    updateVideo,
    myMicStatus,
    userMicStatus,
    updateMic,
  } = useContext(VideoContext);

  const [sendMsg, setSendMsg] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  socket.on("msgRcv", ({ name, msg: value, sender }) => {
    let msg = {};
    msg.msg = value;
    msg.type = "rcv";
    msg.sender = sender;
    msg.timestamp = Date.now();
    setChat([...chat, msg]);
  });

  const dummy = useRef();

  useEffect(() => {
    if (dummy?.current) dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const showModal = (showVal) => {
    setIsModalVisible(showVal);
  };

  const onSearch = (value) => {
    if (value && value.length) sendMsgFunc(value);
    setSendMsg("");
  };

  useEffect(() => {
    if (msgRcv.value && !isModalVisible) {
      notification.open({
        message: "",
        description: `${msgRcv.sender}: ${msgRcv.value}`,
        icon: <MessageOutlined style={{ color: "#108ee9" }} />,
      });
    }
  }, [msgRcv]);

  return (
    <div className="grid">
      {stream ? (
        <div
          style={{ textAlign: "center" }}
          className="card"
          id={callAccepted && !callEnded ? "video1" : "video3"}
        >
          <div style={{ height: "2rem" }}>
            <h3>{myVdoStatus && name}</h3>
          </div>
          <div className="video-avatar-container">
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className="video-active"
              style={{
                opacity: `${myVdoStatus ? "1" : "0"}`,
                transform: "scaleX(-1)",
              }}
            />

            <Avatar
              style={{
                backgroundColor: "#116",
                position: "absolute",
                opacity: `${myVdoStatus ? "-1" : "2"}`,
              }}
              size={98}
              icon={!name && <UserOutlined />}
            >
              {name}
            </Avatar>
          </div>

          <div className="iconsDiv">
            <div
              className="icons"
              onClick={() => {
                updateMic();
              }}
              tabIndex="0"
            >
              <i
                className={`fa fa-microphone${myMicStatus ? "" : "-slash"}`}
                style={{ transform: "scaleX(-1)" }}
                aria-label={`${myMicStatus ? "mic on" : "mic off"}`}
                aria-hidden="true"
              ></i>
            </div>

            {callAccepted && !callEnded && (
              <div
                className="icons"
                onClick={() => {
                  setIsModalVisible(!isModalVisible);
                }}
                tabIndex="0"
              >
                <img src={Msg} alt="chat icon" />
              </div>
            )}
            <Modal
              title="Chat"
              footer={null}
              visible={isModalVisible}
              onOk={() => showModal(false)}
              onCancel={() => showModal(false)}
              style={{ maxHeight: "100px" }}
            >
              {chat.length ? (
                <div className="msg_flex">
                  {chat.map((msg) => (
                    <div
                      className={msg.type === "sent" ? "msg_sent" : "msg_rcv"}
                    >
                      {msg.msg}
                    </div>
                  ))}
                  <div ref={dummy} id="no_border"></div>
                </div>
              ) : (
                <div className="chat_img_div">
                  <img src={Msg_Illus} alt="msg_illus" className="img_illus" />
                </div>
              )}
              <Search
                placeholder="your message"
                allowClear
                className="input_msg"
                enterButton="Send 🚀"
                onChange={(e) => setSendMsg(e.target.value)}
                value={sendMsg}
                size="large"
                onSearch={onSearch}
              />
            </Modal>

            <div className="icons" onClick={() => updateVideo()} tabIndex="0">
              {myVdoStatus ? (
                <img src={VideoIcon} alt="video on icon" />
              ) : (
                <img src={VideoOff} alt="video off icon" />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      {callAccepted && !callEnded && userVideo && (
        <div className="card2" style={{ textAlign: "center" }} id="video2">
          <div style={{ height: "2rem" }}>
            <h3>{userVdoStatus && (call.name || userName)}</h3>
          </div>

          <div className="video-avatar-container">
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className="video-active"
              style={{
                opacity: `${userVdoStatus ? "1" : "0"}`,
              }}
            />

            <Avatar
              style={{
                backgroundColor: "#116",
                position: "absolute",
                opacity: `${userVdoStatus ? "-1" : "2"}`,
              }}
              size={98}
              icon={!(userName || call.name) && <UserOutlined />}
            >
              {userName || call.name}
            </Avatar>
            {!userMicStatus && (
              <i
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  padding: "0.3rem",
                  backgroundColor: "#fefefebf",
                }}
                className="fad fa-volume-mute fa-2x"
                aria-hidden="true"
                aria-label="microphone muted"
              ></i>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
