import React,{useEffect} from 'react'
import axios from "axios";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'


var reportUsData = [];
const UserReport = ({match}) => {
  const report = reportUsData.find( place => place.id.toString() === match.params.id)
  const reportUDetails = report ? Object.entries(report) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
    useEffect(() => {
      axios
      .get("https://eat2gether-api.herokuapp.com/api/users/reports")
        .then((response) => {
            reportUsData = response.data;
        });
      });
  return (
    <CRow>
      <CCol lg={2}></CCol>
      <CCol lg={8}>
        <CCard>
          <CCardHeader>
            Report id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    reportUDetails.map(([key, value], index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserReport;
