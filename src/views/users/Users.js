import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from "@coreui/react";

import axios from "axios";

//set color for status
const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "success";
  }
};

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
          <CCardHeader>Users</CCardHeader>
          <CCardBody>
            <CDataTable
              items={usersData}
              fields={[
                { key: "name", _classes: "font-weight-bold" },
                "registered",
                "role",
                "status",
              ]}
              hover
              striped
              itemsPerPage={10}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),
              }}
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
