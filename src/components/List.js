import React, { useState, useEffect } from "react";
import Switch from "@material-ui/core/Switch";

const List = ({ data }) => {
  const [profileData, setProfileData] = useState();
  const [bidsAmount, setBidsAmount] = useState("");
  const [selected, setSelected] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setSelected({ ...selected, [event.target.name]: event.target.checked });
  };
  //   useEffect(() => {
  //     data && console.log(console.log("Bid Amount", data));
  //   }, []);
  const maxBidsAmount = (bids) => {
    let maxValue = 0;
    for (let i = 0; i < bids.length; i++) {
      if (bids[i].amount > maxValue) {
        maxValue = bids[i].amount;
      }
    }
    return maxValue;
  };

  const minBidsAmount = (bids) => {
    let minValue = bids.length > 0 && bids[0].amount;
    console.log("MIN MALY", minValue);
    for (let i = 0; i < bids.length; i++) {
      if (bids[i].amount < minValue) {
        minValue = bids[i].amount;
      }
    }
    return minValue;
  };

  return (
    <div onClick={() => setProfileData(data)} className="user-list">
      <h5>{data.firstname}</h5>
      <h5>{data.email}</h5>
      <h5>{data.phone}</h5>
      <div className="bid_amount">
        <div>
          <h5>Bid Amount</h5>
          <p>
            {selected.checkedA && selected.checkedB
              ? maxBidsAmount(data.bids)
              : minBidsAmount(data.bids)}
          </p>
        </div>
        <Switch
          checked={selected.checkedB}
          onChange={handleChange}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
    </div>
  );
};

export default List;
