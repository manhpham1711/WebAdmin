import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
} from '@coreui/react'

const WidgetsDropdown = () => {
  return (
    <CRow>
      <CCol sm="6" lg="6">
        <CWidgetDropdown
          color="gradient-info"
          header="User"
          text="321.213"
          // footerSlot={
          //   // <ChartLineSimple
          //   //   pointed
          //   //   className="mt-3 mx-3"
          //   //   style={{height: '70px'}}
          //   //   dataPoints={[1, 18, 9, 17, 34, 22, 11]}
          //   //   pointHoverBackgroundColor="info"
          //   //   options={{ elements: { line: { tension: 0.00001 }}}}
          //   //   label="Members"
          //   //   labels="months"
          //   // />
          // }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="6">
        <CWidgetDropdown
          color="gradient-warning"
          header="Place"
          text="214.501"
          // footerSlot={
          //   <ChartLineSimple
          //     className="mt-3"
          //     style={{height: '70px'}}
          //     backgroundColor="rgba(255,255,255,.2)"
          //     dataPoints={[78, 81, 80, 45, 34, 12, 40]}
          //     options={{ elements: { line: { borderWidth: 2.5 }}}}
          //     pointHoverBackgroundColor="warning"
          //     label="Members"
          //     labels="months"
          //   />
          // }
        >
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
