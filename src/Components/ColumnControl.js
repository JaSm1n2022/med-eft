import React, { Fragment, useState } from "react";
import data from "../MockData/cw-columns.json";
import Helper from "../utils/helper";
import HelperJS from "../utils/helperJS";
const ColumnControl = (props) => {
	const [columns, setColumns] = React.useState(null);
	const {expectedColumnHandler, columnOrder} = props;

	React.useEffect(() => {
		// fetch("js/Components/columns.json")
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		// Do something with your data
		// 		// console.log(data);
		// 		setColumns(data);
		// 	});
		setColumns(data);
	}, []);
	const closeColumnControl = () => {
	   const gridView=	document.getElementById('pickupSelectBox');
	   gridView.classList.toggle("show");
	}
	return (
		<React.Fragment>
			<div className="searchInput">
				<input
					type="text"
					name=""
					id="searchForField"
					placeholder="Search For Field"
					onChange={() => HelperJS.listSearchForFieldJS()}
				/>
				<i className="fas fa-times clearSearchField"></i>
			</div>
			<div className="CategoeySearchBoxWrap">
				<ul id="CategoeySearchBox">
					{columns !== null && columns.length 
						? columns.map((col) => {
								return (
									
									<React.Fragment>
										<li>
											<b>{col.name}</b>
											<span></span>
										</li>
										{col.fields !== null && col.fields.length 
											? col.fields.map((field) => {
												  const isExpected = field && field.colId && columnOrder && columnOrder.length ? Helper.isColumnFieldExpected(columnOrder,field.colId) : false;
												  return (
													
														<li key={field.colId}>
															{isExpected ?
															<input 
															onChange={(e) => expectedColumnHandler(e, field.colId)}
															checked={true} 
															type="checkbox"
																className="colunm-btn"
																data-check={`.${field.dataCheck}`}
															/>
															:
															<input
															onChange={(e) => expectedColumnHandler(e, field.colId)}
															checked={undefined} 
															type="checkbox"
																className="colunm-btn"
																data-check={`.${field.dataCheck}`}
															/>
															}
															<span>{field.name}</span>
														</li>
													);
											  })
											: ""}
									</React.Fragment>
									
								);
						  })
						: ""}

					{/* <li><b>Status</b><span></span> </li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".status" /> <span>Shipment Status</span> </li>
                    <li><b>Location</b><span></span> </li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".deliverLoc" /> <span>Delivery Location</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".pickupLoc" /> <span>Pick Up Location</span></li>
                    <li><b>Cargo and Product</b><span></span> </li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".shipmentNbr" /> <span>Shipment Number</span></li>
                    <li><b>Reference</b><span></span> </li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".shipmentRef" /> <span>Customer Reference</span></li>
                    <li><b>Operations</b><span></span> </li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".doorAssign" /> <span>Door Assignment</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".priority" /> <span>Door Priority</span></li>
                    <li><b>Schedule and Time</b><span></span> </li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".etafiled" /> <span>ETA</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".etd" /> <span>ETD</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".actualDelvDt" /> <span>Actual Delivery time</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".schDeliveryTime" /> <span>Scheduled Delivery Time</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".actPickTime" /> <span>Actual pick up time</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".schPickupTime" /> <span>Scheduled Pick up time</span></li>
                    <li><b>Exceptions and Alerts</b><span></span> </li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".overage" /> <span>Overage</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".shortage" /> <span>Shortage </span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".damage" /> <span>Damage</span></li>
                    <li><b>Organizarion and People</b><span></span> </li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".driver" /> <span>Driver name</span> </li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".carrierName" /> <span>Carrier name</span></li> */}

					{/* <!-- New Table Column --> */}
					{/* <li><b>New Item</b><span></span> </li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".addt" /> <span>Actual Delivery Date / Time</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".apdt" /> <span>Actual Pickup Date / Time</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".rddt" /> <span>Requested Delivery Date / Time</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".rpdt" /> <span>Requested Pickup Date / Time</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".eddt" /> <span>Estirnated Delivery Date / Time </span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".epdt" /> <span>Estimated Pickup Date / Time</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".tpdt" /> <span>Target Delivery Date / Time</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".rlu" /> <span>Record Lost Updated</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".portAta" /> <span>Actual Arrival at Port Date</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".railAta" /> <span>Actual Arrival at Roil Ramp Date</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".fclAvailableDt" /> <span>Container Available Date</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".portEta" /> <span>Estimated Arrival at Port Date</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".railEta" /> <span>Estimated Arrival at Rail Date</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".lfdt" /> <span>Lost Free Day at Terminal</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".fclAvailableDt" /> <span>Container Detention Start Date</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".port" /> <span>Port </span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".rail-ramp" /> <span>Rail Ramp</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".yard" /> <span>Yard </span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".warehouse " /> <span>Warehouse </span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".factory " /> <span>Factory</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".pickup-location" /> <span>Pickup Location</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".delivery-location" /> <span>Delivery Location</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".return-location" /> <span>Return Location</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".stop-1-location" /> <span>Stop 1 Location</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".stop-2-location" /> <span>Stop 2 Location</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".stop-3-location" /> <span>Stop 3 Location</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".stop-4-location" /> <span>Stop 4 Location</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".btp" /> <span>Bill to Party</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".motor-carrierName" /> <span>Motor Carrier</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".ocean-carrierName" /> <span>Ocean Carrier</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".consignee" /> <span>Consignee</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".shipper" /> <span>Shipper</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".logistics-provider" /> <span>Logistics Provider</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".receiver" /> <span>Receiver</span></li>
                    <li><input type="checkbox" className="colunm-btn" data-check=".alertee" /> <span>Alertee</span></li> */}
				</ul>
			</div>
			<div className="btn-groups">
				{/*
				<button className="btn btn-success" type="submit">
					Save
				</button>
				*/}
				<button className="btn btn-danger" type="button" onClick={() => closeColumnControl()}>
					Close Window
				</button>
			</div>
		</React.Fragment>
	);
};

export default ColumnControl;
