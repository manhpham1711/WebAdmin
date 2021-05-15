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
var reportUsData = [];
const UserReports = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/reportUs?page=${newPage}`);
  };

  useEffect(() => {
    axios
      .get("https://eat2gether-api.herokuapp.com/api/users/reports")
      .then((response) => {
        reportUsData = response.data;
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
              <CHeaderNavLink to="/reportUs">Users Reports</CHeaderNavLink>
            </CHeaderNavItem>
            <CHeaderNavItem className="px-1">
              <CHeaderNavLink to="/reportAs">App Reports</CHeaderNavLink>
            </CHeaderNavItem>
          </CHeaderNav>
          <CCardBody>
            <CDataTable
              items={reportUsData}
              fields={["full_name", "time", "status"]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/reportUs/${item.id}`)}
            />
            {/* Phân trang */}
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={2}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UserReports;
