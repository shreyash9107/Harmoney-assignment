import React, { useEffect, useState } from "react";
import callApi from "../../Services/callApi";
import styles from "./MessageList.module.scss";
import { getHeaders } from "../../Services/getHeaders";
import ConfirmationModal from "../../Common/Modal/ConfirmationModal";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
const MessageList = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  console.log(text);
  const getData = () => {
    fetch(`https://mapi.harmoney.dev/api/v1/messages/`, {
      method: "GET",
      headers: getHeaders(),
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);


  const getTime = (time) => {
    let tim = time.substring(11, time.length - 8);
    return tim;
  };

  const deleteItem = () => {
    try {
      fetch(`https://mapi.harmoney.dev/api/v1/messages/${selectedId}`, {
        method: "DELETE",
        headers: getHeaders(),
      })
        .then((res) => {
          console.log(res);
          getData();

        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }finally {
      setModalVisibility(false)
      setSelectedId("")
    }
  };
  const saveInputData = () => {
    console.log("clicked");
    let jsonData = {
      text: text,
    };
    callApi(`https://mapi.harmoney.dev/api/v1/messages/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(jsonData),
    })
      .then((res) => {
        console.log(res);
        setText('')
        getData();
      })
      .catch((e) => console.log(e));
  };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
           Delete
        </Tooltip>
    );
  return (
    <div className={"mt-5"}>
      <div className={styles.page_header}>
        <h2>Chatter</h2>
        <p>Type something in box below, then hit Post!</p>
      </div>
      <div className={styles.input_group}>
        <div className={`${styles.input_control} input-group flex-nowrap`}>
          <input
            type="text"
            className="form-control"
            placeholder="Type something..."
            aria-label="Username"
            aria-describedby="addon-wrapping"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button className={`${styles.post} btn btn-primary`} onClick={() => saveInputData()}>
          Post
        </button>
        <button className={"btn btn-light"} onClick={()=>{
            let sortedCars1 = data.sort(function(a,b){
                return new Date(b.timestamp) - new Date(a.timestamp);
            });
            setData([...sortedCars1])
        }}>Sort by date</button>
      </div>

      <ul className="list-group list-group-flush">
        {data?.map((el, index) => {
          return (
            <li className="list-group-item" key={index}>
              <div className={styles.header_group}>
                <img
                  className={`${styles.message_btn}`}
                  src="https://img.icons8.com/carbon-copy/100/000000/chat-message.png"
                />
                <h5 className={styles.heading}>{el.source}</h5>
                <p className={styles.time}>{getTime(el?.timestamp)}</p>
                  <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                  >
                <div
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    setModalVisibility(true);
                    setSelectedId(el?.id);
                  }}
                >
                  <img
                    className={`${styles.delete_btn}`}
                    src="https://img.icons8.com/plasticine/100/000000/filled-trash.png"
                  />
                </div>
                  </OverlayTrigger>
              </div>
              <p className={styles.text}>{el?.text}</p>
            </li>
          );
        })}
      </ul>
      <ConfirmationModal
          visibility={modalVisibility}
          setVisiblity={setModalVisibility}
          onYes={() =>deleteItem()}
          onNo={() => {
            setModalVisibility(false);
          }}
          onHide={() => {
            setModalVisibility(false);
          }}
      />

    </div>
  );
};

export default MessageList;
