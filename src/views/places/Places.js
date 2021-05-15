import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from "@coreui/react";
import axios from "axios";

var Placesdata = [];
const Places = () => {
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/places?page=${newPage}`);
  };

  const getPlaces = () => {
    setIsLoading(true)
    axios
    .get("https://eat2gether-api.herokuapp.com/api/places")
    .then((response) => {
      setIsLoading(false)
      Placesdata = response.data;
    });
  }

  useEffect(() => {
    getPlaces()
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  return (
    
    <CRow>
      {isLoading && <div id="loader"></div>}
      <CCol lg={2}></CCol>
      <CCol xl={8}>
        <CCard className="place">
          <CCardHeader>Places</CCardHeader>
          <CCardBody>
            <CDataTable
              items={Placesdata}
              fields={[
                { key: "name", _classes: "font-weight-bold" },
                "address",
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/places/${item.id}`)} // chỉ thêm id thôi heo, đang update user mà // sao hề, get data chi tiết của 1 user/ mình đang trang detail luôn á
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={3}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Places;
