import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./index.css";
import "./App.css";
import logo from "./images/main_logo.png";
import noData from "./images/no_data.png";
import userIcon from "./images/user_icon.png";
import emailIcon from "./images/email_icon.png";
import mobIcon from "./images/mobile_icon.png"
import webIcon from "./images/website.png"
import addressIocn from "./images/loction.png"
import companyIcon from "./images/company.png"

export default function App() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function getUserData() {
    const dataUser = await fetch("https://jsonplaceholder.typicode.com/users");
    const dataFetch = await dataUser.json();
    setUsers(dataFetch);
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="flex justify-between items-center py-2.5 px-4 bg-sky-100 p85Resp">
        <div className="text-base text-red-500 font-semibold w-3/12 flex items-center">
          <img src={logo} alt="logo" className="w-8 h-auto" />
        </div>
        <div className="w-5/12 flex justify-between items-center w100Resp">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email"
            className="py-1.5 pl-9 icon_input rounded-md border-none w-3/4 outline-none focus:ring-0 w58Resp"
          />
          <button
            onClick={getUserData}
            className="flex justify-between items-center border border-solid bg-btn py-1.5 px-2.5 rounded-md hover:bg-sky-600 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              className="mr-1.5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8 18H16V16H8V18ZM8 14H16V12H8V14ZM6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H14L20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 9V4H6V20H18V9H13Z"
                fill="white"
              />
            </svg>
            Get Data
          </button>
        </div>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-wrap p-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))
              ) : (
                <div className="flex  justify-center w-full">
                  <img src={noData} alt="No data" />
                </div>
              )}
            </div>
          }
        />
        <Route path="/user/:id" element={<UserDetailPage />} />
      </Routes>
    </Router>
  );
}

function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-wrap p-2.5 w-full sm:w-64 md:w-72 lg:w-80 xl:w-1/3	 "
      onClick={() => navigate(`/user/${user.id}`)}
    >
      <div className="card-bg">
        <div className="flex align-middle p-1.5">
          <div className="flex justify-center w-12">
            <img src={userIcon} alt="User Icon" />
          </div>
          <p className="col-name">{user.name}</p>
        </div>
        <div className="flex align-middle p-1.5">
          <div className="w-12 flex justify-center">
            <img src={emailIcon} alt="Email Icon" />
          </div>
          <p className="col-email"> {user.email}</p>
        </div>
      </div>
    </div>
  );
}

function UserDetailPage() {
  return (
    <div className="flex justify-center items-center p-6 ">
      <UserDetail />
    </div>
  );
}

function UserDetail() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loader
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchUserDetail() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const data = await response.json();

      // Add a 2-second delay
      setTimeout(() => {
        setUser(data);
        setLoading(false); // Stop the loader after data is set
      }, 2000);
    }
    fetchUserDetail();
  }, [id]);

  if (loading) {
    return (
      /* From Uiverse.io by Nawsome */
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

  return (
    // <div className="bg-white p-6 rounded shadow-lg max-w-2xl mx-auto my-8">
    //   <h2 className="text-2xl font-semibold mb-4">User Details</h2>
    //   <p>
    //     <strong>Name:</strong> {user.name}
    //   </p>
    //   <p>
    //     <strong>Email:</strong> {user.email}
    //   </p>
    //   <p>
    //     <strong>Phone:</strong> {user.phone}
    //   </p>
    //   <p>
    //     <strong>Website:</strong> {user.website}
    //   </p>
    //   <p>
    //     <strong>Address:</strong>{" "}
    //     {`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
    //   </p>
    //   <p>
    //     <strong>Company:</strong> {user.company.name}
    //   </p>
    // </div>

   <div>
     <div className="card-mainBg">
       <h3 className="text-xl	font-semibold	text-black	px-2.5">User Details</h3>
       <div className="flex align-middle p-1.5 mt-4	">
          <div className="flex justify-center w-10">
              <img src={userIcon}></img>
          </div>
          <p>Name :- {user.name}</p>
       </div>
       <div className="flex align-middle p-1.5">
          <div className="flex justify-center w-10">
              <img src={emailIcon}></img>
          </div>
          <p>Email Id :- {user.email}</p>
       </div>
       <div className="flex align-middle p-1.5">
          <div className="flex justify-center w-10">
              <img src={mobIcon}></img>
          </div>
          <p>Mobile no :- {user.phone}</p>
       </div>
       <div className="flex align-middle p-1.5">
          <div className="flex justify-center w-10">
              <img src={webIcon}></img>
          </div>
          <p>Website :- {user.website}</p>
       </div>
       <div className="flex align-middle p-1.5">
          <div className="flex justify-center w-10">
              <img src={addressIocn}></img>
          </div>
          <p className="txt-wrap" title={`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}>Address :- {`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</p>
       </div>
       <div className="flex align-middle p-1.5 mb-4	">
          <div className="flex justify-center w-10">
              <img src={companyIcon}></img>
          </div>
          <p>Company :- {user.company.name}</p>
       </div>
    </div>
   </div>
  );
}
