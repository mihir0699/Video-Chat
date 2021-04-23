import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, Button, Tooltip, Modal, message } from "antd";
import Phone from "../../assests/phone.gif";
import Teams from "../../assests/teams.mp3";
import * as classes from "./Options.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VideoContext from "../../context/VideoContext";
import Hang from "../../assests/hang.svg";
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    leaveCall1();
    window.location.reload();
  };
  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) setIsModalVisible(true);
    else setIsModalVisible(false);
  }, [call.isReceivingCall]);

  return (
    <div className={classes.options}>
      <div>
        <h2>Account Info</h2>
        <Input
          size="large"
          placeholder="Your name"
          prefix={<UserOutlined />}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            localStorage.setItem("name", e.target.value);
          }}
          className={classes.inputgroup}
        />
        <br />
        <CopyToClipboard text={me}>
          <Button
            type="primary"
            icon={<CopyOutlined />}
            className={classes.btn}
            onClick={() => message.success("Code copied successfully!")}
          >
            Copy code
          </Button>
        </CopyToClipboard>
        <div className={classes.share_icons}>
          <WhatsappShareButton
            url={`https://video-chat-mihir.web.app/`}
            title={`Join this meeting with the given code "${me}"\n`}
            separator="Link: "
            className={classes.share_icon}
          >
            <WhatsappIcon size={24} round />
          </WhatsappShareButton>
          <FacebookShareButton
            url={`https://video-chat-mihir.web.app/`}
            title={`Join this meeting with the given code "${me}"\n`}
            className={classes.share_icon}
          >
            <FacebookIcon size={24} round />
          </FacebookShareButton>
          <TwitterShareButton
            url={`https://video-chat-mihir.web.app/`}
            title={`Join this meeting with the given code ${me} \n`}
            className={classes.share_icon}
          >
            <TwitterIcon size={24} round className={classes.share_border} />
          </TwitterShareButton>
        </div>
      </div>
      <div>
        <h2>Make a call</h2>
        <Input
          placeholder="Enter code to call"
          size="large"
          className={classes.inputgroup}
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Enter code of the other user">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
        <br />
        {callAccepted && !callEnded ? (
          <Button
            variant="contained"
            onClick={leaveCall}
            className={classes.hang}
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
          >
            Call
          </Button>
        )}
      </div>
      <audio src={Teams} loop autpolay ref={Audio} />
      {call.isReceivingCall && !callAccepted && (
        <Modal
          title="Incoming Call"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          {setOtherUser(call.from)}
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
            >
              Decline
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Options;
