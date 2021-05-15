import React, {useEffect} from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";

var PlacesData = [];

const Place = ({ match }) => {
  const place = PlacesData.find(
    (place) => place.id.toString() === match.params.id
  );
  // const delte = {
  // delete(item){
  //   const data = this.state.data.filter(i => i.id !== item.id)
  //   this.setState({data})
  // }}
  const placeDetails = place? Object.entries(place) : [[ "id", <span><CIcon className="text-muted" name="cui-icon-ban" /> Not found </span>,],];
      useEffect(() => {
        axios
          .get(`https://eat2gether-api.herokuapp.com/api/places`)
          .then((response) => {
            PlacesData = response.data;
          });
        });
  return ( 

    // lộn trang đây
    <CRow>
      <CCol lg={2}>
      </CCol>
      <CCol lg={8}>
        <CCard>
          <CCardHeader>place id: {match.params.id}</CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {placeDetails.map(([key, value], index) => {
                  return (
                    <tr key={index.toString()}>
                      <td>{`${key}:`}
                      </td>
                      <td>
                        <strong>{value}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tr></tr>
             
            </table>
            <div style={{display:"flex"}}>
                <CCol col="6" sm="6" md="6" xl className="mb-6 mb-xl-0"> <a href="http://localhost:3000/#/edit" style={{textDecoration:"none"}}><CButton href="" block color="primary"> Edit   </CButton> </a> </CCol>
                <CCol col="6" sm="6" md="6" xl className="mb-6 mb-xl-0"> <CButton href="" block color="danger"> Delete </CButton> </CCol>
                {/* <CButton href="./editplaces" block color="danger"> Delete </CButton>  <CButton onClick={this.delete.bind(this, item)}>Delete</CButton>*/}
              </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Place;
