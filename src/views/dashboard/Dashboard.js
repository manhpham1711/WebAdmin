import React, { useState, lazy, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CProgress,
  CButton,
} from "@coreui/react";
import axios from "axios";
import CIcon from "@coreui/icons-react";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));

var Placesdata = [];
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/places?page=${newPage}`);
  };

  const getPlaces = () => {
    setIsLoading(true);
    axios
      .get("https://eat2gether-api.herokuapp.com/api/places")
      .then((response) => {
        setIsLoading(false);
        Placesdata = response.data;
      });
  };

  useEffect(() => {
    getPlaces();
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);
  return (
    <>
      <WidgetsDropdown />
      <CRow>
        {isLoading && <div id="loader"></div>}
        <CCol xl={6}>
          <CCard className="place">
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
                onRowClick={(item) => history.push(`/places/${item.id}`)}
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
        <CCol xs="12" md="6" xl="6">
          <div className="progress-group mb-4">
            <div className="progress-group-header">
              <CIcon className="progress-group-icon" name="cil-user" />
              <span className="title">Male</span>
              <span className="ml-auto font-weight-bold">80%</span>
            </div>
            <div className="progress-group-bars">
              <CProgress className="progress-xs" color="warning" value="43" />
            </div>
          </div>
          <div className="progress-group mb-5">
            <div className="progress-group-header">
              <CIcon className="progress-group-icon" name="cil-user-female" />
              <span className="title">Female</span>
              <span className="ml-auto font-weight-bold">37%</span>
            </div>
            <div className="progress-group-bars">
              <CProgress className="progress-xs" color="warning" value="37" />
            </div>
          </div>
          <div className="progress-group">
            <div className="progress-group-header">
              <CIcon className="progress-group-icon" name="cil-globe-alt" />
              <span className="title">Organic Search</span>
              <span className="ml-auto font-weight-bold">
                191,235 <span className="text-muted small">(56%)</span>
              </span>
            </div>
            <div className="progress-group-bars">
              <CProgress className="progress-xs" color="success" value="56" />
            </div>
          </div>

          <div className="progress-group">
            <div className="progress-group-header">
              <CIcon name="cib-facebook" className="progress-group-icon" />
              <span className="title">Facebook</span>
              <span className="ml-auto font-weight-bold">
                51,223 <span className="text-muted small">(15%)</span>
              </span>
            </div>
            <div className="progress-group-bars">
              <CProgress className="progress-xs" color="success" value="15" />
            </div>
          </div>
          <div className="progress-group">
            <div className="progress-group-header">
              <CIcon name="cib-twitter" className="progress-group-icon" />
              <span className="title">Twitter</span>
              <span className="ml-auto font-weight-bold">
                37,564 <span className="text-muted small">(11%)</span>
              </span>
            </div>
            <div className="progress-group-bars">
              <CProgress className="progress-xs" color="success" value="11" />
            </div>
          </div>
          <div className="progress-group">
            <div className="progress-group-header">
              <CIcon name="cib-linkedin" className="progress-group-icon" />
              <span className="title">LinkedIn</span>
              <span className="ml-auto font-weight-bold">
                27,319 <span className="text-muted small">(8%)</span>
              </span>
            </div>
            <div className="progress-group-bars">
              <CProgress className="progress-xs" color="success" value="8" />
            </div>
          </div>
          <div className="divider text-center">
            <CButton color="link" size="sm" className="text-muted">
              <CIcon name="cil-options" />
            </CButton>
          </div>
        </CCol>
      </CRow>
      <br />
      {/* </CCardBody>
          </CCard>
        </CCol> */}
      {/* </CRow> */}
    </>
  );
};

export default Dashboard;
