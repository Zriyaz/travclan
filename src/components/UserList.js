import React, { useContext, useState } from "react";
import List from "./List";
import ReactPaginate from "react-paginate"; // I used react-paginate npm package for pagination
import { Context } from "../context";
import UserProfile from "./UserProfile";

const maxBidsAmount = (bids) => {
  // Finding Max Bids
  let maxValue = 0;
  for (let i = 0; i < bids.length; i++) {
    if (bids[i].amount > maxValue) {
      maxValue = bids[i].amount;
    }
  }
  return maxValue;
};

const sortDataByBids = (data) => {
  for (let i = 0; i < data.length; i++) {
    // iterating each item on by one and call maxBidsAmount function to add extra field in each object so will easy to sort the record based on maxBid amount
    let maxBid =
      data[i].bids && data[i].bids.length > 0 && maxBidsAmount(data[i].bids);
    data[i].maxValue = maxBid; // adding extra property value
  }

  return accendingSort(data); // calling sort function to sort the objects
};

const accendingSort = (data) => {
  // sort function
  data.sort(function (a, b) {
    return b.maxValue - a.maxValue;
  });
};

const UserList = () => {
  const { state } = useContext(Context);
  const { user } = state;
  sortDataByBids(user);
  const [users, setUsers] = useState(user);
  const [profileData, setProfileData] = useState(users[0]);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5; // each page display only 5 records
  const pegesVisited = pageNumber * usersPerPage; // viewed records count
  const displayUsers = users.slice(pegesVisited, pegesVisited + usersPerPage); // slice the viewed records
  const pageCount = Math.ceil(users.length / usersPerPage); // total pages

  const changePage = ({ selected }) => {
    // whenever page change page number will update
    setPageNumber(selected);
  };

  return (
    <>
      <h3 className="app-heading">
        Our Clients data is available please check out
      </h3>
      <div className="container">
        <div className="user-list_container">
          <div className="table-heading">
            <h3>Name</h3>
            <h3>Email</h3>
            <h3>Contact</h3>
            <h3>Bids</h3>
          </div>
          {users && users.length > 0 ? (
            <>
              {displayUsers.map((data) => (
                <List data={data} setProfileData={setProfileData} />
              ))}
              <div className="paginationContainer">
                <ReactPaginate
                  previousLabel={"Prev"}
                  nextLabel="Next"
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBtn"}
                  nextLinkClassName={"nextLinkBtn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </div>
            </>
          ) : (
            <h1>No Record Available!</h1>
          )}
        </div>
        <div className="profile-heading">
          <h3>Profile Information, Please Check out</h3>
          <div className="user-profile_container">
            <UserProfile profileData={profileData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
