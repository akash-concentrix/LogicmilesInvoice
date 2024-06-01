import "./styles.css";
import React, { useEffect, useState } from "react";
import { formatDate, formatIndianPrice } from "./helper";
import EditableSpan from "./EditableSpan";
import { DATA, ITEMS } from "./constant";

export default function App() {
  const [consignee, setConsignee] = useState({
    name: DATA[0].name,
    line1: DATA[0].line1,
    line2: DATA[0].line2,
    line3: DATA[0].line3,
    line4: DATA[0].line4,
    line5: DATA[0].line5,
  });
  const [itemPrices, setItemPrices] = useState([[]]);
  const [items, setItems] = useState(ITEMS);
  const [printProcess, setPrintProcess] = useState(true);
  const [hideSideBar, setHideSideBar] = useState(false);

  const [gstType, setGstType] = useState(false);

  const handleValueChange = (pindex, cindex, newValue) => {
    const numericValue = parseFloat(newValue) || 0;

    const newValues = [...itemPrices];
    if (!newValues[pindex]) {
      newValues[pindex] = [];
    }

    newValues[pindex][cindex] = numericValue;
    setItemPrices(newValues);
    console.log(newValues);
  };

  useEffect(() => {
    document.designMode = "on";
    return () => {
      document.designMode = "off";
    };
  }, []);

  const printDiv = (divName) => {
    setHideSideBar(true);
    setTimeout(() => {
      window.print();
      setHideSideBar(false);
    }, 1000);
  };

  const changeConsignee = (value) => {
    setConsignee(value);
  };

  const _renderData = (value) => {
    return (
      <div
        className="consigneeListItem"
        contentEditable="false"
        style={{
          color: value.name === consignee.name ? "#214c9c" : "#000",
        }}
        onClick={() => changeConsignee(value)}
      >
        <span>{value.name}</span>
        <br />
        <span>{value.line2}</span>
      </div>
    );
  };

  const removeItem = (index) => {
    let tempData = items;
    setItems([]);
    tempData.splice(index, 1);
    setItems(tempData);
  };

  return (
    <div className="App">
      <div
        className="sideBar"
        style={{ display: hideSideBar ? "none" : "block" }}
      >
        {DATA.map(_renderData)}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <input
            type="button"
            onClick={() => printDiv("invoiceContainer")}
            value="PRINT"
          />
          <input
            type="button"
            onClick={() => setGstType(!gstType)}
            value="CHANGE GST TYPE"
          />
          <input
            type="button"
            onClick={() =>
              setItems([
                ...items,
                {
                  id: items.length + 1,
                  name: "description",
                  hsnCode: "0",
                  quantity: "1",
                  rate: "100.00",
                  per: "Nos.",
                  price: "100.00",
                },
              ])
            }
            value="ADD ITEM"
          />
        </div>
        <div
          style={{ marginTop: 20, display: "flex", flexDirection: "column" }}
        >
          {items.map((v, i) => {
            return (
              <input
                type="button"
                onClick={() => removeItem(i)}
                value={`REMOVE ${i + 1}`}
              />
            );
          })}
        </div>
        <div
          style={{ marginTop: 20, display: "flex", flexDirection: "column" }}
        >
          <span>Update price</span>
          {items.map((v, i) => {
            return (
              <input
                type="button"
                onClick={() => removeItem(i)}
                value={`REMOVE ${i + 1}`}
              />
            );
          })}
        </div>
      </div>

      <div className="invoiceContainer" id="invoice">
        <div className="header">
          <span contentEditable="false" style={{ fontWeight: "600" }}>
            INVOICE
          </span>
          <span contentEditable="false" className="invoiceType">
            (ORIGINAL FOR RECIPIENT)
          </span>
        </div>

        <div className="invoiceContent">
          <div className="firstInfo">
            <div contentEditable="false" className="infoLeftContainer">
              {/* {
    name: "LOGICMILES DIGITAL PVT LTD",
    line1: "A-107A, Kanchanjunga Apartment",
    line2: "Sector-53, Gautam Budh Nagar",
    line3: "GSTIN/UIN: 27AAACD4467B1ZY",
    line4: "State Name : Uttar Pradesh, Code : 27"
  }, */}
              <span style={{ fontWeight: "600", fontSize: 14 }}>
                LOGICMILES DIGITAL PRIVATE LIMITED
              </span>
              <span style={{ marginTop: 6, fontSize: 14 }}>
                A-107A, Kanchanjunga Apartment
                <br />
                Sector-53, Noida, UP-201301
                <br />
                PAN: AAECL3810G
                <br />
                GSTIN/UIN: 09AAECL3810G1ZP
                <br />
                State Name : Uttar Pradesh, Code : 09
              </span>
            </div>
            <div className="infoRightContainer">
              <div className="childInfo">
                <div className="smallLeftContainer">
                  <span className="fieldTitle" contentEditable="false">
                    Invoice No.
                  </span>
                  <span
                    className="fieldBox"
                    style={{ borderWidth: printProcess ? 0 : 1 }}
                  >
                    LMD/24-25/001
                  </span>
                </div>
                <div className="smallRightContainer">
                  <span className="fieldTitle" contentEditable="false">
                    Dated
                  </span>
                  <span
                    className="fieldBox"
                    style={{ borderWidth: printProcess ? 0 : 1 }}
                  >
                    {formatDate()}
                  </span>
                </div>
              </div>
              <div className="childInfo">
                <div className="smallLeftContainer">
                  <span className="fieldTitle" contentEditable="false">
                    Delivery Note
                  </span>
                  <span
                    className="fieldBox"
                    style={{ borderWidth: printProcess ? 0 : 1 }}
                  ></span>
                </div>
                <div className="smallRightContainer">
                  <span className="fieldTitle" contentEditable="false">
                    Mode/Terms of Payment
                  </span>
                  <span
                    className="fieldBox"
                    style={{ borderWidth: printProcess ? 0 : 1 }}
                  >
                    Within 30 days
                  </span>
                </div>
              </div>
              <div className="childInfo">
                <div className="smallLeftContainer" style={{ borderBottom: 0 }}>
                  <span className="fieldTitle" contentEditable="false">
                    Reference No. & Date.
                  </span>
                  <span
                    className="fieldBox"
                    style={{ borderWidth: printProcess ? 0 : 1 }}
                  ></span>
                </div>
                <div
                  className="smallRightContainer"
                  style={{ borderBottom: 0 }}
                >
                  <span className="fieldTitle" contentEditable="false">
                    Other References
                  </span>
                  <span
                    className="fieldBox"
                    style={{ borderWidth: printProcess ? 0 : 1 }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div className="firstInfo">
            <div className="infoLeftContainer" style={{ paddingTop: 2 }}>
              <span contentEditable="false" style={{ fontSize: 13 }}>
                Consignee (Ship to)
              </span>
              <span
                style={{
                  fontWeight: "600",
                  marginTop: 6,
                  textTransform: "uppercase",
                  fontSize: 14,
                }}
              >
                {consignee.name}
              </span>
              <span style={{ marginTop: 6, fontSize: 14 }}>
                {consignee.line1}
                <br />
                {consignee.line2}
                <br />
                {consignee.line3}
                <br />
                {consignee.line4}
                <br />
                {consignee.line5}
              </span>
            </div>
            <div className="infoRightContainer">
              <div className="childInfo">
                <div className="smallLeftContainer">
                  <span className="fieldTitle" contentEditable="false">
                    Buyer's Order No.
                  </span>
                  <span
                    className="fieldBox"
                    style={{ borderWidth: printProcess ? 0 : 1 }}
                  ></span>
                </div>
                <div className="smallRightContainer">
                  <span className="fieldTitle" contentEditable="false">
                    Dated
                  </span>
                  <span
                    className="fieldBox"
                    style={{ borderWidth: printProcess ? 0 : 1 }}
                  ></span>
                </div>
              </div>
              <div className="childInfo">
                <div className="smallLeftContainer">
                  <span className="fieldTitle" contentEditable="false">
                    Dispatch Doc No.
                  </span>
                  <span
                    className="fieldBox"
                    style={{ borderWidth: printProcess ? 0 : 1 }}
                  ></span>
                </div>
                <div className="smallRightContainer">
                  <span className="fieldTitle" contentEditable="false">
                    Delivery Note Date
                  </span>
                  <span
                    className="fieldBox"
                    style={{ borderWidth: printProcess ? 0 : 1 }}
                  ></span>
                </div>
              </div>
              <div className="childInfo">
                <div className="smallLeftContainer" style={{ borderBottom: 0 }}>
                  <span className="fieldTitle" contentEditable="false">
                    Dispatched through
                  </span>
                  <span
                    className="fieldBox"
                    style={{ borderWidth: printProcess ? 0 : 1 }}
                  ></span>
                </div>
                <div
                  className="smallRightContainer"
                  style={{ borderBottom: 0 }}
                >
                  <span className="fieldTitle" contentEditable="false">
                    Destination
                  </span>
                  <span
                    className="fieldBox"
                    style={{ borderWidth: printProcess ? 0 : 1 }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div className="firstInfo">
            <div className="infoLeftContainer" style={{ paddingTop: 2 }}>
              <span contentEditable="false" style={{ fontSize: 13 }}>
                Buyer (Bill to)
              </span>
              <span
                style={{
                  fontWeight: "600",
                  marginTop: 6,
                  textTransform: "uppercase",
                  fontSize: 14,
                }}
              >
                {consignee.name}
              </span>
              <span style={{ marginTop: 6, fontSize: 14 }}>
                {consignee.line1}
                <br />
                {consignee.line2}
                <br />
                {consignee.line3}
                <br />
                {consignee.line4}
                <br />
                {consignee.line5}
              </span>
            </div>
            <div className="infoRightContainer" style={{ paddingTop: 4 }}>
              <span
                className="fieldTitle"
                contentEditable="false"
                style={{ paddingLeft: 4 }}
              >
                Terms of Delivery
              </span>
            </div>
          </div>

          {/* Item List Start */}
          <div className="itemHeader">
            <div className="headerTitle" style={{ width: "6%" }}>
              Sl No.
            </div>
            <div
              className="headerTitle"
              style={{ width: "54%", paddingLeft: 6 }}
            >
              Description of Goods
            </div>
            <div className="headerTitle" style={{ width: "10%" }}>
              Quantity
            </div>
            <div className="headerTitle" style={{ width: "10%" }}>
              Rate
            </div>
            <div className="headerTitle" style={{ width: "6%" }}>
              per
            </div>
            <div
              className="headerTitle"
              style={{ width: "14%", borderRight: 0 }}
            ></div>
          </div>
          <div className="itemList">
            <div className="itemData" style={{ width: "6%" }}>
              {items.map((v) => (
                <span style={{ height: 40 }}>{v.id}</span>
              ))}
            </div>
            <div
              className="itemData"
              style={{
                width: "54%",
                paddingLeft: 6,
                textAlign: "left",
                alignItems: "flex-start",
              }}
            >
              {items.map((v) => (
                <span style={{ fontWeight: "600", fontSize: 14, height: 40 }}>
                  {v.name}
                  <br />
                  {v.hsnCode ? (
                    <span
                      style={{
                        fontStyle: "italic",
                        fontWeight: "500",
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      &emsp;&emsp;HSN/SAC Code: {v.hsnCode}
                    </span>
                  ) : (
                    ``
                  )}
                </span>
              ))}
              {/* <div className="gstContainer">
                <span className="gstText">IGST @ 18%</span>
              </div> */}
              {gstType ? (
                <div className="gstContainer">
                  <span className="gstText">CGST @ 9%</span>
                  <span className="gstText">SGST @ 9%</span>
                </div>
              ) : (
                <div className="gstContainer">
                  <span className="gstText">IGST @ 18%</span>
                </div>
              )}
            </div>
            <div className="itemData" style={{ width: "10%" }}>
              {items.map((v, index) => (
                <EditableSpan
                  style={{ fontWeight: "bold", height: 40 }}
                  initialValue={v.quantity}
                  onValueChange={(newValue) =>
                    handleValueChange(index, 0, newValue)
                  }
                />
              ))}
            </div>
            <div className="itemData" style={{ width: "10%" }}>
              {/* <br /> */}
              {items.map((v, index) => (
                <EditableSpan
                  style={{ fontWeight: "bold", height: 40 }}
                  initialValue={formatIndianPrice(v.rate)}
                  onValueChange={(newValue) =>
                    handleValueChange(index, 1, newValue)
                  }
                />
              ))}

              {/* <div className="gstContainer2">
                <span className="gstText">18</span>
              </div> */}
              {gstType ? (
                <div className="gstContainer2">
                  <span className="gstText">9</span>
                  <span className="gstText">9</span>
                </div>
              ) : (
                <div className="gstContainer2">
                  <span className="gstText">18</span>
                </div>
              )}
            </div>
            <div className="itemData" style={{ width: "6%" }}>
              {items.map((v) => (
                <span style={{ height: 40 }}>{v.per}</span>
              ))}

              {/* <div className="gstContainer2">
                <span className="gstText">%</span>
              </div> */}
              {gstType ? (
                <div className="gstContainer2">
                  <span className="gstText">%</span>
                  <span className="gstText">%</span>
                </div>
              ) : (
                <div className="gstContainer2">
                  <span className="gstText">%</span>
                </div>
              )}
            </div>
            <div
              className="itemData"
              style={{
                width: "14%",
                borderRight: 0,
              }}
            >
              {items.map((v, index) => (
                <EditableSpan
                  style={{ fontWeight: "bold", height: 40 }}
                  initialValue={formatIndianPrice(v.price)}
                  onValueChange={(newValue) =>
                    handleValueChange(index, 2, newValue)
                  }
                />
              ))}

              {/* <div className="gstContainer2">
                <span className="gstText" style={{ fontWeight: "600" }}>
                  13,140.00
                </span>
              </div> */}
              {gstType ? (
                <div className="gstContainer2">
                  <span className="gstText" style={{ fontWeight: "600" }}>
                    {formatIndianPrice("97200")}
                  </span>
                  <span className="gstText" style={{ fontWeight: "600" }}>
                    {formatIndianPrice("97200")}
                  </span>
                </div>
              ) : (
                <div className="gstContainer2">
                  <span className="gstText" style={{ fontWeight: "600" }}>
                    {formatIndianPrice("97200")}
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* Item List End */}

          {/* Total amount Start (Footer)  */}
          <div className="itemHeader">
            <div className="headerTitle" style={{ width: "6%" }}></div>
            <div
              className="headerTitle"
              style={{
                width: "54%",
                paddingLeft: 6,
                alignItems: "flex-end",
                fontWeight: "500",
              }}
            >
              Total&emsp;&emsp;&emsp;
            </div>
            <div className="headerTitle" style={{ width: "10%" }}>
              1
            </div>
            <div className="headerTitle" style={{ width: "10%" }}></div>
            <div className="headerTitle" style={{ width: "6%" }}></div>
            <div
              className="headerTitle"
              style={{ width: "14%", borderRight: 0 }}
            >
              {formatIndianPrice("637200")}
            </div>
          </div>
          {/* Total amount End (Footer)  */}

          <div className="inWordsContainer">
            <span style={{ fontSize: 13, textAlign: "left", maxWidth: "50%" }}>
              Amount Chargeable (in words)
              <br />
              <span style={{ lineHeight: "24px", fontWeight: "600" }}>
                INR Six Lakh Thirty-Seven Thousand Two Hundred Only
              </span>
            </span>
            <div className="bank_details">
              <span style={{ fontStyle: "italic", alignSelf: "flex-end" }}>
                E. & O.E
              </span>
              <span style={{ textAlign: "left" }}>
                Bank A/c: 628405020217
                <br />
                IFSC Code: ICIC0006284
                <br />
                Bank Name: ICICI Bank
                <br />
                Bank Address: Sector-50, Noida-201301
              </span>
            </div>
          </div>

          <div className="footerContainer">
            <div className="leftFooter">
              <span style={{ fontSize: 12 }}>
                Company's PAN
                :&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <span style={{ fontWeight: "600" }}>AAECL3810G</span>
              </span>
              <span style={{ fontSize: 11, marginTop: 5 }}>
                <span style={{ textDecorationLine: "underline" }}>
                  Declaration
                </span>
                <br />
                We declare that this invoice shows the actual price of the
                services described and that all particulars are true and
                correct.
              </span>
            </div>
            <div className="rightFooter">
              <img src="/stampsign.png" style={{ width: 60, height: 60 }} />
            </div>
          </div>
        </div>
        <span style={{ fontSize: 13, marginTop: 10 }}>
          This is a Computer Generated Invoice
        </span>
      </div>
    </div>
  );
}
