import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, Button, Tooltip, Modal, message } from "antd";
import Phone from "../../assests/phone.gif";
import Teams from "../../assests/teams.mp3";
import * as classes from "./Options.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VideoContext from "../../context/VideoContext";
import Hang from "../../assests/hang.svg";
import Toggle from "../Toggle/Toggle";

import {
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
import {
  UserOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { socket } from "../../context/VideoState";

const Options = () => {
  const [idToCall, setIdToCall] = useState("");

  const inputEl = useRef(null);

  const onDivClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };

  const inputEl1 = useRef(null);

  const onDivClick1 = () => {
    // `current` points to the mounted text input element
    inputEl1.current.focus();
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const Audio = useRef();
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
    otherUser,
    setOtherUser,
    leaveCall1,
  } = useContext(VideoContext);

  useEffect(() => {
    if (isModalVisible) {
      Audio?.current?.play();
    } else Audio?.current?.pause();
  }, [isModalVisible]);

  const showModal = (showVal) => {
    setIsModalVisible(showVal);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    leaveCall1();
    window.location.reload();
  };
  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      setIsModalVisible(true);
      setOtherUser(call.from);
    } else setIsModalVisible(false);
  }, [call.isReceivingCall]);

  return (
    <div className={classes.options}>
      <div style={{ marginBottom: "0.5rem" }}>
        <h2 className={classes.theme_text}>Account Info</h2>
        {/* <Input
          size="large"
          placeholder="Your name"
          prefix={<UserOutlined />}
          maxLength={15}
          suffix={<small>{name.length}/15</small>}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            localStorage.setItem("name", e.target.value);
          }}
          className={classes.inputgroup}
        /> */}

        <div className={classes.input_container} onClick={onDivClick}>
            <span className={classes.leftIcon}><UserOutlined /></span>
            <input
                ref={inputEl}
                className={classes.custom_input}
                size="large"
                placeholder="Your name"
                maxLength={15}
                suffix={<small>{name.length}/15</small>}
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    localStorage.setItem("name", e.target.value);
                }} />
                <span className={classes.counter}>{name.length}/15</span>
            
        </div>
        
        <div className={classes.share_options}>
          <CopyToClipboard text={me}>
            <Button
              type="primary"
              icon={<CopyOutlined />}
              className={classes.btn}
              tabIndex="0"
              onClick={() => message.success("Code copied successfully!")}
            >
              Copy code
            </Button>
          </CopyToClipboard>

          <div className={classes.share_social}>
            <WhatsappShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              title={`Join this meeting with the given code "${me}"\n`}
              separator="Link: "
              className={classes.share_icon}
            >
              <WhatsappIcon size={26} round />
            </WhatsappShareButton>
            <FacebookShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              title={`Join this meeting with the given code "${me}"\n`}
              className={classes.share_icon}
            >
              <FacebookIcon size={26} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              title={`Join this meeting with the given code  "${me}"\n`}
              className={classes.share_icon}
            >
              <TwitterIcon size={26} round className={classes.share_border} />
            </TwitterShareButton>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <h2 className={classes.theme_text}>Make a call</h2>

        {/* <Input
        
          placeholder="Enter code to call"
          size="large"
          className={classes.inputgroup}
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem",}}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Enter code of the other user">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        /> */}

        <div className={classes.input_container1} onClick={onDivClick1}>
            <span className={classes.leftIcon}><UserOutlined className="site-form-item-icon" /></span>
            <input
                ref={inputEl1}
                className={classes.custom_input}
                size="large"
                placeholder="Enter code to call"
                suffix={<small>{name.length}/15</small>}
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                />
            <span className={classes.tooltip}>
                <Tooltip title="Enter code of the other user">
                    <InfoCircleOutlined />
                </Tooltip>    
            </span>
        </div>

        <div className={classes.call_toggle_container}>
            <div>
            {callAccepted && !callEnded ? (
            <Button
                variant="contained"
                onClick={leaveCall}
                className={classes.hang}
                tabIndex="0"
            >
                <img src={Hang} alt="hang up" style={{ height: "15px" }} />
                &nbsp; Hang up
            </Button>
            ) : (
            <Button
                type="primary"
                icon={<PhoneOutlined />}
                onClick={() => {
                if (name.length) callUser(idToCall);
                else message.error("Please enter your name to call!");
                }}
                className={classes.btn}
                tabIndex="0"
            >
                Call
            </Button>
            )}
            </div>
            <div className={classes.toggle_container}>
                <Toggle />
            </div>
        </div>
      </div>

      {call.isReceivingCall && !callAccepted && (
        <>
          <audio src={Teams} loop ref={Audio} />
          <Modal
            title="Incoming Call"
            visible={isModalVisible}
            onOk={() => showModal(false)}
            onCancel={handleCancel}
            footer={null}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h1>
                {call.name} is calling you:{" "}
                <img
                  src={Phone}
                  alt="phone ringing"
                  className={classes.phone}
                  style={{ display: "inline-block" }}
                />
              </h1>
            </div>
            <div className={classes.btnDiv}>
              <Button
                variant="contained"
                className={classes.answer}
                color="#29bb89"
                icon={<PhoneOutlined />}
                onClick={() => {
                  answerCall();
                  Audio.current.pause();
                }}
                tabIndex="0"
              >
                Answer
              </Button>
              <Button
                variant="contained"
                className={classes.decline}
                icon={<PhoneOutlined />}
                onClick={() => {
                  setIsModalVisible(false);
                  Audio.current.pause();
                }}
                tabIndex="0"
              >
                Decline
              </Button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Options;
