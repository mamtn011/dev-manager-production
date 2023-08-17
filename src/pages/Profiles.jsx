import React, { useContext } from "react";
import { Pagination } from "react-bootstrap";
import { ProfileContext } from "../context/ProfileContext";
import Profile from "../components/profiles/Profile";
import Loader from "../components/shared/Loader";

const generateArray = (num) => {
  let array = [];
  for (let i = 1; i <= num; i++) {
    array.push(i);
  }
  return array;
};
export default function Profiles() {
  const { profiles, loaded, pageCount, pageNumber, setPageNumber } =
    useContext(ProfileContext);
  const pageCountArray = generateArray(pageCount);
  const handlePageClick = (e) => {
    setPageNumber(+e.target.dataset.count);
  };

  return (
    <>
      <h2 className="text-center">All Profiles</h2>
      <div className="d-flex justify-content-center flex-wrap">
        {loaded ? (
          <>
            {profiles.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))}
          </>
        ) : (
          <Loader />
        )}
      </div>
      {loaded && (
        <>
          <Pagination style={{ justifyContent: "center" }}>
            {pageCountArray.map((count, idx) => (
              <Pagination.Item
                key={idx}
                active={count === pageNumber}
                data-count={count}
                onClick={handlePageClick}
              >
                {count}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </>
  );
}
