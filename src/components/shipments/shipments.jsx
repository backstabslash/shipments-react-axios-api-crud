import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './shipments.css'
import Shipment from '../shipment/shipment';

const Shipments = () => {
    const [shipments, setShipments] = useState([]);
    const [shipment, setShipment] = useState({});
    const [openShipment, setOpenShipment] = useState(false);
    const [dateSort, setDateSort] = useState(0); //0 off 1asc 2desc
    useEffect(() => {
        axios.get("https://my.api.mockaroo.com/shipments.json?key=5e0b62d0")
            .then((res) => { setShipments(res.data); })
            .catch((err) => {
                console.log(err);
                axios.get("http://localhost:3000/Shipments.txt")
                    .then((res) => {
                        setShipments(res.data);
                    })
                    .catch((err) => console.log(err));
            })
    }, []);
    const deleteHandler = (e) => {
        setShipments([...shipments.filter(shipment => shipment.orderNo !== e)]);
    }
    const onEditHandler = (prevOrderNo, orderNo, date, customer, trackingNo, status, consignee) => {
        for (let i = 0; i < shipments.length; i++) {
            if (shipments[i].orderNo === prevOrderNo) {
                let copyShip = [...shipments];
                copyShip[i] = { orderNo, date, customer, trackingNo, status, consignee }
                setShipments([...copyShip])
            }
        }
    }
    const dateSortHandler = () => {
        if (dateSort === 0) {
            let copyShip = [...shipments];
            copyShip.sort(function (a, b) {
                return Date.parse(a.date) - Date.parse(b.date);
            });
            setShipments(copyShip);
            setDateSort(1);
        }
        if (dateSort === 1) {
            let copyShip = [...shipments];
            copyShip.sort(function (a, b) {
                return Date.parse(b.date) - Date.parse(a.date);
            });
            setShipments(copyShip);
            setDateSort(2);
        }
        if (dateSort === 2) setDateSort(0);
    }
    return (
        <>
            <header className='headerWrapper' >
                <div className='titleDiv'>
                    Shipments
                </div></header>
            <div className="wrapper" >
                <Shipment openShipment={openShipment} setOpenShipment={setOpenShipment} shipment={shipment} onEditHandler={onEditHandler} />
                <table className='app--table'>
                    <thead className='app--thead'>
                        <tr className='app--tr'>
                            <th className='app--th'>orderNo</th>
                            <th className='app--th-date' onClick={dateSortHandler}>date</th>
                            <th className='app--th'>customer</th>
                            <th className='app--th'>trackingNo</th>
                            <th className='app--th'>status</th>
                            <th className='app--th'>consignee</th>
                            <th className='app--th'></th>
                            <th className='app--th'></th>
                        </tr>
                    </thead>
                    <tbody className='app-tbody'>
                        {shipments.map(shipment => (
                            <tr className='app--tr' key={shipment.orderNo}>
                                <td className='app--td'>{shipment.orderNo}</td>
                                <td className='app--td'>{shipment.date}</td>
                                <td className='app--td'>{shipment.customer}</td>
                                <td className='app--td'>{shipment.trackingNo}</td>
                                <td className='app--td'>{shipment.status}</td>
                                <td className='app--td'>{shipment.consignee}</td>
                                <td className='app--td-button'> <button className='app--button-delete' onClick={() => deleteHandler(shipment.orderNo)}><i className="fa-solid fa-square-xmark"></i></button></td>
                                <td className='app--td-button'> <button className='app--button-ship' onClick={() => { setOpenShipment(true); setShipment(shipment); }}><i className="fa-sharp fa-solid fa-address-card"></i></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Shipments;