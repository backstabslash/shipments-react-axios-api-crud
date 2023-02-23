import React, { useEffect, useRef } from "react";
import "./shipment.scss";

const Shipment = ({
  openShipment,
  setOpenShipment,
  shipment,
  onEditHandler,
}) => {
  const dateInputRef = useRef(null);
  const orderInputRef = useRef(null);
  const customerInputRef = useRef(null);
  const trackingNoInputRef = useRef(null);
  const statusInputRef = useRef(null);
  const consigneeInputRef = useRef(null);
  useEffect(() => {
    if (shipment) {
      dateInputRef.current.value = shipment.date;
      orderInputRef.current.value = shipment.orderNo;
      customerInputRef.current.value = shipment.customer;
      trackingNoInputRef.current.value = shipment.trackingNo;
      statusInputRef.current.value = shipment.status;
      consigneeInputRef.current.value = shipment.consignee;
    }
  }, [shipment]);
  //   if (openShipment === true)
  //     document.querySelector("body").style.overflow = "hidden";
  //   else document.querySelector("body").style.overflow = "visible";
  return (
    <div
      className={`overlay animated ${openShipment ? "show" : ""}`}
      onClick={() => setOpenShipment(false)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="headWrapper">
          <div className="headerTDiv">Shipment</div>
          <div className="headerIDiv">
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={() => setOpenShipment(false)}
            ></i>
          </div>
        </div>
        <div className="wrapper">
          <div className="shipContainer">
            <label className="modal--label">Date</label>
            <input
              className="modal--input"
              type="text"
              ref={dateInputRef}
            ></input>
          </div>
          <div className="shipContainer">
            <label className="modal--label">OrderNo</label>
            <input
              className="modal--input"
              type="text"
              ref={orderInputRef}
            ></input>
          </div>
          <div className="shipContainer">
            <label className="modal--label">Customer</label>
            <input
              className="modal--input"
              type="text"
              ref={customerInputRef}
            ></input>
          </div>
          <div className="shipContainer">
            <label className="modal--label">TrackingNo</label>
            <input
              className="modal--input"
              type="text"
              ref={trackingNoInputRef}
            ></input>
          </div>
          <div className="shipContainer">
            <label className="modal--label">Status</label>
            <input
              className="modal--input"
              type="text"
              ref={statusInputRef}
            ></input>
          </div>
          <div className="shipContainer">
            <label className="modal--label">Consignee</label>
            <input
              className="modal--input"
              type="text"
              ref={consigneeInputRef}
            ></input>
          </div>
        </div>
        <div className="btnWrapper">
          <button
            className="btn"
            onClick={() => {
              onEditHandler(
                shipment.orderNo,
                orderInputRef.current.value,
                dateInputRef.current.value,
                customerInputRef.current.value,
                trackingNoInputRef.current.value,
                statusInputRef.current.value,
                consigneeInputRef.current.value
              );
              setOpenShipment(false);
            }}
          >
            Submit <i className="fa-solid fa-square-check"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
