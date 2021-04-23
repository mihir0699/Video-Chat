import React, { useContext, useEffect, useState, useRef } from "react";
import VideoContext from "../../context/VideoContext";
import "./Video.css";
import { Card, Modal, Button, Input, notification } from "antd";
import Man from "../../assests/man.svg";
import VideoIcon from "../../assests/video.svg";
import { io } from "socket.io-client";
import VideoOff from "../../assests/video-off.svg";
import Profile from "../../assests/profile.svg";
import Msg_Illus from "../../assests/msg_illus.svg";
import Msg from "../../assests/msg.svg";
import { MessageOutlined } from "@ant-design/icons";

import { socket } from "../../context/VideoState";
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
  } = useContext(VideoContext);

  const [sound, setSound] = useState(true);
  const [vdo, setVideo] = useState(true);
  const [userVdo, setUserVdo] = useState(true);
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          <div style={{ placeSelf: "center" }}>
            <h3>{name}</h3>
          </div>
          <div style={{ position: "relative" }}>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={vdo ? "card1" : "hidden"}
            />
            {!vdo && <img src={Profile} alt="user avatar" className="avatar" />}
          </div>

          <div className="iconsDiv">
            <div
              className="icons"
              onClick={() => {
                stream.getAudioTracks()[0].enabled = !sound;
                setSound(!sound);
              }}
            >
              {!sound ? (
                <i
                  className="fa fa-microphone-slash"
                  id="icon"
                  aria-hidden="true"
                />
              ) : (
                <i class="fa fa-microphone " id="icon" aria-hidden="true"></i>
              )}
            </div>
            {callAccepted && !callEnded && (
              <div
                className="icons"
                onClick={() => {
                  setIsModalVisible(!isModalVisible);
                }}
              >
                <img src={Msg} alt="chat icon" />
              </div>
            )}
            <Modal
              title="Chat"
              footer={null}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              style={{ maxHeight: "100px" }}
            >
              {chat.length ? (
                <div className="msg_flex">
                  {chat.map((msg) => (
                    <div
                      className={msg.type == "sent" ? "msg_sent" : "msg_rcv"}
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
            <div
              className="icons"
              onClick={() => {
                stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0]
                  .enabled;
                setVideo(!vdo);
              }}
            >
              {vdo ? (
                <img src={VideoIcon} alt="video icon" id="icon" />
              ) : (
                <img src={VideoOff} alt="video icon" id="icon" />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div class="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      {callAccepted && !callEnded && userVideo && (
        <div className="card2" style={{ textAlign: "center" }} id="video2">
          <div style={{ alignSelf: "center" }}>
            {call.from ? (
              <h3 style={{ alignSelf: "center" }}>{call.name}</h3>
            ) : (
              <h3 style={{ alignSelf: "center" }}>{userName}</h3>
            )}
          </div>
          <div style={{ position: "relative" }}>
            <video
              playsInline
              autoPlay
              ref={userVideo}
              className={userVideo ? "card1" : "hidden"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
