import React, { useContext, useState } from "react";
import List from "./List";
import ReactPaginate from "react-paginate"; // I used react-paginate npm package for pagination
import { Context } from "../context";
import UserProfile from "./UserProfile";

const UserList = () => {
  const { state } = useContext(Context);
  const { user } = state;
  const [users, setUsers] = useState(user);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pegesVisited = pageNumber * usersPerPage;
  const displayUsers = users.slice(pegesVisited, pegesVisited + usersPerPage);
  const pageCount = Math.ceil(users.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container">
      <div className="user-list_container">
        <div className="table-heading">
          <h3>Name</h3>
          <h3>Email</h3>
          <h3>Contact</h3>
        </div>
        {users && users.length > 0 ? (
          <>
            {displayUsers.map((data) => (
              <List data={data} />
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
          <>
            <h1>No Record Available!</h1>
          </>
        )}
      </div>

      {/* <div className="user-profile_container">
        <UserProfile profileData={profileData} />
      </div> */}
    </div>
  );
};

export default UserList;
