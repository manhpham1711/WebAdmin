import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
} from "@coreui/react";

import axios from "axios";

//set color for status
var usersData = [];

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };

  useEffect(() => {
    axios
      .get("https://eat2gether-api.herokuapp.com/api/users")
      .then((response) => {
        // console.log(response.data);
        usersData = response.data;
      });
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);
  return (
    <CRow>
     <CCol lg={2}></CCol>
      <CCol xl={8}>
        <CCard>
          <CHeaderNav className="d-md-down-none mr-auto">
            <CHeaderNavItem className="px-1">
              <CHeaderNavLink to="/reportUs">Users Report</CHeaderNavLink>
            </CHeaderNavItem>
            <CHeaderNavItem className="px-1">
              <CHeaderNavLink to="/reportAs">Apps Report</CHeaderNavLink>
            </CHeaderNavItem>
          </CHeaderNav>
          <CCardBody>
            <CDataTable
              items={usersData}
              fields={[
                { key: "name user", _classes: "font-weight-bold" },
                "content",
                "proof",
                "time",
              ]}
              hover
              striped
              itemsPerPage={10}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
            />
            {/* Phân trang */}
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={10}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Users;
