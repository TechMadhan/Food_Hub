import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useMenu } from "../../store/hooks";

const ScanQR = (props) => {
  const { getDineTables, dineTables } = useMenu();
  const [availableTables, setAvailableTables] = useState([]);
  useEffect(() => {
    getDineTables();
  }, []);

  useEffect(() => {
    let availableTablesList = [];
    dineTables.forEach((value) => {
      if (value.status === "available") {
        availableTablesList.push({ ...value });
      }
    });
    setAvailableTables(availableTablesList);
  }, [dineTables]);
  if (!availableTables.length) {
    return <div>Currently No tables available</div>;
  } else {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div>Please scan QR code on the Table to continue</div>
        {availableTables.map((value, valueIndex) => {
          return (
            <div
              style={{
                border: "1px solid lightgrey",
                margin: "10px",
              }}
            >
              <p style={{ textAlign: "center", margin: 0 }}>
                Table {valueIndex + 1}
              </p>
              <p style={{ textAlign: "center", margin: 0 }}>
                Total Seats {value.count}
              </p>
              <QRCode
                value={value.ref}
                size={100}
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  margin: "20px",
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
};

export default ScanQR;
