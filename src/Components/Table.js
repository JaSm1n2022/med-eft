import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from 'react-router-dom';
import CollapseableDateField from "./CollapseableDateField";
import CollapseableTextField from "./CollapseableTextField";
import ColumnHeader from "./ColumnHeader";
import Column from "./Column";
import HelperJS from '../utils/helperJS';
// import data from "./tableData.json";

class ShippingTable extends React.Component {
	state = {
		expand: false,
		row: null,
	};

	handleExpand = () => {
		this.setState({
			expand: !this.state.expand,
		});
	};

	handleFieldChange = (row, item, identifier) => {
		console.log("row: ", row);
		console.log("item: ", item);
		console.log(identifier);
	};
	render() {
		// console.log(this.state.data)
		const viewUrl = "shipment-details?id=";

		const { currentView, data, views, markedAllCheck, hideShipmentHandler,
			pointMapHandler, exportPrintQRHandler, exportExcelHandler, hideAllHandler, printQRAllHandler, exportExcelAllHandler, sortColumn,
			isFreeTimeAsc, isFclSeverityDayAsc, isDetentionSeverityDayAsc, isEtdSeverityHrAsc, isEtdAsc, isActualPickupDtAsc, isEtaSeverityHrAsc, isEtaAsc, isPriorityAsc, isActualDelvDtAsc, columnOrder,
			isFclAvailableDtAsc, isDetentionStartDtAsc, getRowItem
		} = this.props;
		const redirectLink = (link) => {
			this.props.history.push(`/${link}`);
		}

		return (
			<React.Fragment>

				<thead>
					<tr>
						<th className="notthis notDragable" style={{ display: 'table-cell' }}>
							<input type="checkbox" name="" id="checkAll" onClick={(e) => markedAllCheck(e)} />
							<div className="dropdown-menu" aria-labelledby="checkAll">
								<a className="dropdown-item" onClick={() => hideAllHandler()}>Hide Shipment</a>
								<a className="dropdown-item" onClick={() => printQRAllHandler()}>Print QR Code</a>
								<a className="dropdown-item" onClick={() => exportExcelAllHandler()}>Export to Excel</a>
							</div>
						</th>
						<th className="notDragable" style={{ display: 'table-cell' }}></th>
						{columnOrder && columnOrder.length && columnOrder.map(c => {
							return (<React.Fragment>
								<ColumnHeader className="notDragable" id="shipmentNbr" click={sortColumn} pg="shipmentPage" expected={c}>Shipment #</ColumnHeader>
								<ColumnHeader id="shipmentRef" expected={c}>Reference</ColumnHeader>
								<ColumnHeader id="status" expected={c}>Status</ColumnHeader>
								<ColumnHeader id="deliverLoc" expected={c}>Delivery Location</ColumnHeader>
								<ColumnHeader id="etaSeverityHr" expected={c} click={sortColumn} pg="shipmentPage">
									ETA Severity {isEtaSeverityHrAsc ? <i className="fas fa-angle-down"></i> : <i className="fas fa-angle-up"></i>}
								</ColumnHeader>
								<ColumnHeader id="eta" expected={c} click={sortColumn} pg="shipmentPage">
									ETA {isEtaAsc ? <i className="fas fa-angle-down"></i> : <i className="fas fa-angle-up"></i>}
									
								</ColumnHeader>
								<ColumnHeader id="doorAssign" className="doorAssign" expected={c}>Door Assignment</ColumnHeader>
								<ColumnHeader id="priority" expected={c} click={sortColumn} pg="shipmentPage">
									{" "}
									Priority {isPriorityAsc ? <i className="fas fa-angle-down"> </i> : <i className="fas fa-angle-up"></i>}
								</ColumnHeader>
								<ColumnHeader id="actualDelvDt" expected={c} click={sortColumn} pg="shipmentPage">Actual Del Time {isActualDelvDtAsc ? <i className="fas fa-angle-down"></i> : <i className="fas fa-angle-up"></i>}</ColumnHeader>
								<ColumnHeader id="pickupLoc" expected={c}>Pick Up Location</ColumnHeader>
								<ColumnHeader id="etdSeverityHr" expected={c} click={sortColumn} pg="shipmentPage">ETD Severity {isEtdSeverityHrAsc ? <i className="fas fa-angle-down"></i> : <i className="fas fa-angle-up"></i>}</ColumnHeader>
								<ColumnHeader id="etd" expected={c} click={sortColumn} pg="shipmentPage">ETD {isEtdAsc ? <i className="fas fa-angle-down"></i> : <i className="fas fa-angle-up"></i>}</ColumnHeader>
								<ColumnHeader id="schDeliveryTime" expected={c}>Scheduled Delivery Time</ColumnHeader>
								<ColumnHeader id="actPickTime" expected={c} click={sortColumn} pg="shipmentPage">Actual Pickup Time {isActualPickupDtAsc ? <i className="fas fa-angle-down"></i> : <i className="fas fa-angle-up"></i>}</ColumnHeader>
								<ColumnHeader id="schPickupTime" expected={c}>Scheduled Pick up Time</ColumnHeader>
								<ColumnHeader id="driver" expected={c}>Driver Name</ColumnHeader>
								<ColumnHeader id="carrierName" expected={c}>Carrier Name</ColumnHeader>
								<ColumnHeader id="portAvailable" expected={c}>Port Available</ColumnHeader>
								<ColumnHeader id="portEta" expected={c}>
									EAPD{" "}
									<span className="thead-tooltip">
										Estimated Arrival at Port Date
							</span>
								</ColumnHeader>
								<ColumnHeader className="tt-up" id="portAta" expected={c}>
									AAPD{" "}
									<span className="thead-tooltip">Actual Arrival at Port Date</span>
								</ColumnHeader>
								<ColumnHeader id="railAvailable" expected={c}>Rail Available</ColumnHeader>
								<ColumnHeader className="tt-up" id="railEta" expected={c}>
									EARD{" "}
									<span className="thead-tooltip">
										Estimated Arrival at Rail Date
							</span>
								</ColumnHeader>
								<ColumnHeader className="tt-up" id="railAta" expected={c}>
									AARRD{" "}
									<span className="thead-tooltip">
										Actual Arrival at Rail Ramp Date
							</span>
								</ColumnHeader>
								<ColumnHeader className="tt-up" id="fclAvailableDt" expected={c} click={sortColumn}>
									CAD{" "} {isFclAvailableDtAsc ? <i className="fas fa-angle-down"></i> : <i className="fas fa-angle-up"></i>}
									<span className="thead-tooltip">Container Available Date</span>
								</ColumnHeader>
								<ColumnHeader className="tt-up" id="detentionStartDt" expected={c} click={sortColumn}>
									CDSD{" "} {isDetentionStartDtAsc ? <i className="fas fa-angle-down"></i> : <i className="fas fa-angle-up"></i>}
									<span className="thead-tooltip">
										Container Detention Start Date
							</span>
								</ColumnHeader>
								<ColumnHeader className="tt-up" id="oceanCarrier" expected={c}>Ocean Carrier</ColumnHeader>
								<ColumnHeader id="equipmentNbr" expected={c}>Equipment</ColumnHeader>
								<ColumnHeader id="transportMode" expected={c}>Transport Mode</ColumnHeader>
								<ColumnHeader id="importReleaseNbr" expected={c}>Import Release Number</ColumnHeader>
								<ColumnHeader id="fclSeverityDay" expected={c} click={sortColumn} pg="shipmentPage">
									FCL Severity {isFclSeverityDayAsc ? <i className="fas fa-angle-down"></i> : <i className="fas fa-angle-up"></i>}
								</ColumnHeader>
								<ColumnHeader id="detentionSeverityDay" expected={c} click={sortColumn} pg="shipmentPage">
									Detention Severity {isDetentionSeverityDayAsc ? <i className="fas fa-angle-down"></i> : <i className="fas fa-angle-up"></i>}
								</ColumnHeader>
								<ColumnHeader id="freeTime" expected={c} click={sortColumn} pg="shipmentPage">Free Time {isFreeTimeAsc ? <i className="fas fa-angle-down"></i> : <i className="fas fa-angle-up"></i>}</ColumnHeader>

							</React.Fragment>)
						})
						}
					</tr>
				</thead>
				<tbody>
					{data && data && data.length
						? data.map((item) => {
							const {
								shipmentNbr,
								reference,
								status,
								etaSeverityHr,
								eta,
								doorAssign,
								priorities,
								actualDelTime,
								etdSeverityHr,
								etd,
								schDeliveryTime,
								actPickTime,
								schPickupTime,
								driver,
								carrierName,
								portEta,
								portAta,
								portAvailable,
								railEta,
								railAta,
								railAvailable,
								fclAvailableDt,
								contrDetentionDt,
								oceanCarrier,
								equipmentNbr,
								transportMode,
								statusEtdClassName,
								statusEtaClassName,
								statusEtdAlertLevel,
								statusEtaAlertLevel,
								importReleaseNumber,
								freeTime,
								statusFclClassName,
								statusDetentionClassName,
								statusFclAlertLevel,
								statusDetentionAlertLevel,
								fclSeverityDay,
								detentionSeverityDay,
								delLocation,
								pickupLocation,
								isDelivered,
								isPickedUp,
								isPickupEditAllowed,
								isDeliverEditAllowed


							} = item.data;
							return (
								<tr
									key={item.id}
									className="dnd-moved"
									style={{ display: item.hide, borderLeftColor: currentView === 'Delivery' ? item.statusEtaColor : item.statusEtdColor }} onClick={() => pointMapHandler(item)}>
									<td className="selbox">
										<input type="checkbox" name="" />
									</td>
									<td className="popup">
										<span
											type="button"
											className="dropdownMenuButton"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"

										>
											<i className="fas fa-ellipsis-v" onClick={(e) => HelperJS.dropDownMenuJS(e)}></i>
										</span>
										<div
											className="dropdown-menu"
											aria-labelledby="dropdownMenuButton"
										>
											<a className="dropdown-item quick-edit-btn">
												Quick Edit
											</a>
											<a className="dropdown-item" onClick={() => redirectLink(`${viewUrl}${item.id}`)}>
												View more info
											</a>
											<a className="dropdown-item" onClick={() => hideShipmentHandler(item)}>
												Hide Shipment
											</a>
											<a className="dropdown-item" onClick={() => exportPrintQRHandler(item)}>
												Print QR Code
											</a>
											<a className="dropdown-item" onClick={() => exportExcelHandler(item)}>
												Export to Excel
											</a>
										</div>
									</td>

									{
										columnOrder && columnOrder.length && columnOrder.map(c => {
											return (
												<React.Fragment>
													<Column id="shipmentNbr" className="shipment id" title="Canceled" expected={c}>
														{shipmentNbr}
													</Column>
													<Column id="shipmentRef" className="reference ref" title="Reference" expected={c}>
														{reference}
													</Column>
													<Column id="status" className="state success" expected={c}>
														<strong>{status}</strong>
													</Column>
													<Column expected={c} id="deliverLoc" className={`${'delivery-location success'} ${!isDelivered && isDeliverEditAllowed ? 'editable' : ''}`}>
														<CollapseableTextField
															fieldData={delLocation}
															expand={this.state.expand}
															showTime={false}
															showDate
															getRowItem={getRowItem}
															category={'deliverLoc'}
															item={item}

														/>
														{/*
										<div >
										<strong>{deliveryLoc[0]}</strong>
										{deliveryLoc && deliveryLoc.length > 1 && deliveryLoc[1] && deliveryLoc[1].length <= 40 &&
										<span>{deliveryLoc[1]}</span>
										} 
										{deliveryLoc && deliveryLoc.length > 1 && deliveryLoc[1] && deliveryLoc[1].length > 40 &&
										<span>{deliveryLoc[1].substring(0,39)}
										<div className="sidebar-btn" >
												<div className="more-info tool-container" >
													<i className="fas fa-ellipsis-h"></i>
													<div className="clockwork-tooltip party-tooltip w-30 text-left">
														<p>{deliveryLoc[1]}</p>
													
													</div>
												</div>
											</div>
										</span>
										} 
										</div>
									*/}
													</Column>
													<Column id="etaSeverityHr" className={statusEtaClassName} title="EstimatedSeverity" expected={c}>
														<span>
															{statusEtaAlertLevel >= 2 &&
																<span>{`> ${etaSeverityHr} hrs`}</span>
															}
															{statusEtaAlertLevel === 1 &&
																<span>On-time</span>
															}
															{statusEtaAlertLevel === 0 &&
																<span>Arrived</span>
															}
														</span>
													</Column>
													<Column id="eta" expected={c} className={`${'success'} ${!isDelivered ? 'editable' : ''}`}>
														<CollapseableDateField
															getRowItem={getRowItem}
															category={'eta'}
															item={item} fieldData={eta} expand={this.state.expand} showTime showDate />
													</Column>
												
													<Column id="doorAssign" className="doorAssign" expected={c}>
														<div
															id={`doorDropdown-${item.id}`}
															className="dropdown-check-list list doorDropdownList cwork-select"
															type="single"
														>
															<span
																className={`doorAnchor-${item.id}`}
															>{`Door ${doorAssign[0]}`}</span>
															<ul className="items">
																{doorAssign ? (
																	doorAssign.map((door) => {
																		return (
																			<li key={door} data-door={`Door ${door}`}>
																				Door <span>{door}</span>
																			</li>
																		);
																	})
																) : (
																		<li data-door="No Data">Select Door</li>
																	)}
															</ul>
														</div>
													</Column>
													<Column id="priority" title="Priority" expected={c}>
														<div
															id={`priorityDropdown-${item.id}`}
															className="dropdown-check-list list priorityDropdownList cwork-select"
														>
															<span className={`priorityAnchor-${item.id}`}>
																{priorities[0]}
															</span>
															<ul className="items">
																{priorities ? (
																	priorities.map((priority) => {
																		return (
																			<li key={priority} data-priority={priority}>
																				<span>{priority}</span>
																			</li>
																		);
																	})
																) : (
																		<li data-priority="No Data">Select priority</li>
																	)}
															</ul>
														</div>
													</Column>
													<Column id="actualDelvDt" className="actualDelvDt acc-dateTime" expected={c}>{actualDelTime}</Column>
													<Column expected={c} id="pickupLoc" className={`${'pickup-location success'} ${!isPickedUp && !isDelivered && isPickupEditAllowed ? 'editable' : ''}`}>
														<CollapseableTextField
															fieldData={pickupLocation}
															expand={this.state.expand}
															showTime={false}
															showDate
															getRowItem={getRowItem}
															category={'pickupLoc'}
															item={item}

														/>
													</Column>
													<Column id="etdSeverityHr" className={statusEtdClassName} data-hdr="etdSeverityHr" title="EstimatedSeverity" expected={c}>
														<span>
															{statusEtdAlertLevel >= 2 &&
																<span>{`> ${etdSeverityHr} hrs`}</span>
															}
															{statusEtdAlertLevel === 1 &&
																<span>On-time</span>
															}
															{statusEtdAlertLevel === 0 &&
																<span>Arrived</span>
															}
														</span>
													</Column>
													<Column id="etd" expected={c} className={`${'success'} ${!isPickedUp && !isDelivered ? 'editable' : ''}`}>
														<CollapseableDateField
															getRowItem={getRowItem}
															category={'etd'}
															item={item} fieldData={etd} expand={this.state.expand} showTime showDate />
													</Column>
													<Column id="schDeliveryTime" expected={c} className={`${'success'} ${!isDelivered && isDeliverEditAllowed ? 'editable' : ''}`}>
														<CollapseableDateField
															getRowItem={getRowItem}
															category={'schDeliveryTime'}
															item={item} fieldData={schDeliveryTime} expand={this.state.expand} showTime showDate />

													</Column>
													<Column id="actPickTime" expected={c}>
														{actPickTime[0]}
														<br />
														{actPickTime[1]}
													</Column>

													<Column id="schPickupTime" expected={c} className={`${'success'} ${!isPickedUp && isPickupEditAllowed ? 'editable' : ''}`}>
														<CollapseableDateField
															getRowItem={getRowItem}
															category={'schPickupTime'}
															item={item} fieldData={schPickupTime} expand={this.state.expand} showTime showDate />
													</Column>
													<Column id="driver" className={`${'success'} ${!isDelivered ? 'editable' : ''}`} table-id="d2" expected={c}>
														{driver && driver.name &&
															<div className="table-items">
																<div className="calender-area location-area">
																	<div className="date-time-box from">
																		<p id={`${'driver'}-${item.id}`}>{driver.name}</p>
																		<p className="expand-item">{driver.companyAlias}</p>
																		<div className="celendar-box">
																			<span className="tbl-item-btn person-edit-btn" onClick={() => getRowItem(item, "driver")}>
																				<i className="fas fa-pencil-alt"></i>
																			</span>
																		</div>
																	</div>
																</div>
																<div className="sidebar-btn">
																	<div className="more-info tool-container">
																		<i className="fas fa-info-circle"></i>
																		<div className="clockwork-tooltip party-tooltip w-30 text-left">
																			<p>{driver.name}</p>
																			<p>
																				<a href={driver.info.email}>
																					{driver.info.email}
																				</a>
																			</p>
																			<p>{driver.info.phone}</p>

																			<p>
																				<b>{driver.info.company}</b>
																			</p>
																			<p>{driver.info.address}</p>
																			{driver.message &&
																				<p>
																					<span>
																						<i className="fas fa-exclamation-triangle"></i>
																						<p>{driver.message}</p>
																					</span>
																				</p>
																			}
																		</div>
																	</div>
																</div>
															</div>
														}
													</Column>
													<Column id="carrierName" expected={c}>{carrierName}</Column>
													<Column id="portAvailable" expected={c}>{portAvailable}</Column>
													<Column id="portEta" expected={c}>{portEta}</Column>
													<Column id="portAta" expected={c}>{portAta}</Column>
													<Column id="railAvailable" expected={c}>{railAvailable}</Column>
													<Column id="railEta" expected={c}>{railEta}</Column>
													<Column id="railAta" expected={c}>{railAta}</Column>
													<Column id="fclAvailableDt" expected={c}>{fclAvailableDt}</Column>
													<Column id="detentionStartDt" expected={c}>{contrDetentionDt}</Column>
													<Column id="oceanCarrier" expected={c}>
														<div>
															{oceanCarrier && oceanCarrier.name && oceanCarrier.name.length <= 40 &&
																<span>{oceanCarrier.name}</span>
															}
															{oceanCarrier && oceanCarrier.name && oceanCarrier.name.length > 40 &&
																<span>{oceanCarrier.name.substring(0, 39)}
																	<div className="sidebar-btn" >
																		<div className="more-info tool-container" >
																			<i className="fas fa-ellipsis-h"></i>
																			<div className="clockwork-tooltip party-tooltip w-30 text-left">
																				<p>{oceanCarrier.name}</p>

																			</div>
																		</div>
																	</div>
																</span>
															}
														</div>
													</Column>
													<Column id="equipmentNbr" expected={c}>{equipmentNbr}</Column>
													<Column id="transportMode" expected={c}>{transportMode}</Column>
													<Column id="importReleaseNbr" expected={c}>{importReleaseNumber}</Column>
													<Column id="fclSeverityDay" className={statusFclClassName} title="FclSeverity" expected={c}>
														<span>
															{statusFclAlertLevel >= 2 &&
																<span>{`> ${fclSeverityDay} days`}</span>
															}
															{statusFclAlertLevel === 1 &&
																<span>On-time</span>
															}
															{statusFclAlertLevel === 0 &&
																<span>Picked Up</span>
															}
														</span>
													</Column>
													<Column id="detentionSeverityDay" className={statusDetentionClassName} title="DetentionSeverity" expected={c}>
														<span>
															{statusDetentionAlertLevel >= 2 &&
																<span>{`> ${detentionSeverityDay} days`}</span>
															}
															{statusDetentionAlertLevel === 1 &&
																<span>On-time</span>
															}
															{statusDetentionAlertLevel === 0 &&
																<span>Delivered</span>
															}
														</span>
													</Column>
													<Column id="freeTime" expected={c}>{freeTime}</Column>


													{/*				
									<Column className="overage" style={{ display: views.overage ? 'table-cell' : 'none' }}>{overage}</Column>
									<Column className="shortage" style={{ display: views.shortage ? 'table-cell' : 'none' }}>{shortage}</Column>
									<Column className="damage" style={{ display: views.damage ? 'table-cell' : 'none' }}>{damage}</Column>
									<Column className="addt success editable" style={{ display: views.actualDelvDtTm ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={actualDelDateTime}
											expand={true}
											name="addt"
											showTime
											showDate
										/>
									</Column>
									<Column className="apdt success editable no-edit" style={{ display: views.actualPickDtTm ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={actualPickDateTime}
											name="apdt"
											expand={true}
											showTime
											showDate
										/>
									</Column>
									<Column className="rddt success editable" style={{ display: views.reqDelvDtTm ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={reqDelDateTime}
											name="rddt"
											expand={true}
											showTime
											showDate
										/>
									</Column>
									<Column className="rpdt success editable" style={{ display: views.reqPickDtTm ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={reqPickDateTime}
											name="rpdt"
											expand={true}
											showTime
											showDate
										/>
									</Column>
									<Column className="eddt success editable" style={{ display: views.estDelvDtTm ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={estDelDateTime}
											name="eddt"
											expand={true}
											showTime
											showDate
										/>
									</Column>
									<Column className="epdt success editable" style={{ display: views.estPickDtTm ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={estPickDateTime}
											name="epdt"
											expand={true}
											showTime
											showDate
										/>
									</Column>
									<Column className="tpdt success editable" style={{ display: views.targetDelvDtTm ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={targetDelDateTime}
											expand={true}
											showTime
											showDate
										/>
									</Column>
									<Column className="rlu success editable" style={{ display: views.recordLostUpdated ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={recordLostDateTime}
											expand={true}
											name="rlu"
											showTime
											showDate
										/>
									</Column>

									<Column className="portAta success editable" style={{ display: views.actualArrivalPortDt ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={actArrivalPortDate}
											expand={false}
											name="portAta"
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="railAta success editable" style={{ display: views.actualArrivalRailDt ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={actArrivalRailRampPortDate}
											expand={false}
											name="railAta"
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="fclAvailableDt success editable" style={{ display: views.containerAvailDt ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={containerAvlDate}
											expand={false}
											name="fclAvailableDt"
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="portEta success editable" style={{ display: views.estArrAtPortDt ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={estArrivalPortDate}
											expand={false}
											name="portEta"
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="railEta success editable" style={{ display: views.estArrAtRailDt ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={estArrivalPortRailDate}
											expand={false}
											name="railEta"
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="lfdt success editable" style={{ display: views.lostFreeDayAtTerm ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={lostFreeDayTerminal}
											expand={false}
											name="lfdt"
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="fclAvailableDt success editable" style={{ display: views.cntrDetenStartDt ? 'table-cell' : 'none' }}>
										<CollapseableDateField
											fieldData={contDetentionStartDate}
											expand={false}
											name="fclAvailableDt"
											showTime={false}
											showDate
										/>
									</Column>

									<Column className="port success editable edit" style={{ display: views.port ? 'table-cell' : 'none' }}>
										<CollapseableTextField
											fieldData={port}
											expand={false}
											showTime={false}
											showDate
										/>
									</Column>

									<Column className="rail-ramp success editable" style={{ display: views.railRamp ? 'table-cell' : 'none' }}>
										<CollapseableTextField
											fieldData={railRamp}
											expand={false}
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="yard success editable" style={{ display: views.yard ? 'table-cell' : 'none' }}>
										<CollapseableTextField
											fieldData={yard}
											expand={false}
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="warehouse  success editable" style={{ display: views.warehouse ? 'table-cell' : 'none' }}>
										<CollapseableTextField
											fieldData={warehouse}
											expand={false}
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="factory success editable" style={{ display: views.factory ? 'table-cell' : 'none' }}>
										<CollapseableTextField
											fieldData={factory}
											expand={false}
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="pickup-location success editable" style={{ display: views.pickUpLocation ? 'table-cell' : 'none' }}>
										<CollapseableTextField
											fieldData={pickUpLocation}
											expand={false}
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="delivery-location success editable" style={{ display: views.deliveryLocation ? 'table-cell' : 'none' }}>
										<CollapseableTextField
											fieldData={delLocation}
											expand={false}
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="return-location success editable" style={{ display: views.returnLocation ? 'table-cell' : 'none' }}>
										<CollapseableTextField
											fieldData={returnLocation}
											expand={false}
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="stop-1-location success editable" style={{ display: views.stop1 ? 'table-cell' : 'none' }}>
										<CollapseableTextField
											fieldData={locationOne}
											expand={false}
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="stop-2-location success editable" style={{ display: views.stop2 ? 'table-cell' : 'none' }}>
										<CollapseableTextField
											fieldData={locationTwo}
											expand={false}
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="stop-3-location success editable" style={{ display: views.stop3 ? 'table-cell' : 'none' }}>
										<CollapseableTextField
											fieldData={locationThree}
											expand={false}
											showTime={false}
											showDate
										/>
									</Column>
									<Column className="stop-4-location success editable" style={{ display: views.stop4 ? 'table-cell' : 'none' }}>
										<CollapseableTextField
											fieldData={locationFour}
											expand={false}
											showTime={false}
											showDate
										/>
									</Column>

									<Column className="btp success editable" style={{ display: views.btp ? 'table-cell' : 'none' }}>
										<CollapseableTextField
											fieldData={billToParty}
											expand={false}
											showTime={false}
											showDate
										/>
									</Column>

									<Column className="motor-carrierName success editable" style={{ display: views.motorCar ? 'table-cell' : 'none' }}>
										<div className="table-items">
											<div className="calender-area location-area">
												<div className="date-time-box from">
													<p></p>
													<span className="btn btn-assign party-edit-btn">
														Assign
														</span>
												</div>
											</div>
										</div>
									</Column>
									
									<Column className="consignee success editable" style={{ display: views.consignee ? 'table-cell' : 'none' }}>
										<CollapseableTextField
											fieldData={consignee}
											expand
											showTime={false}
											showDate
										/>
										</Column>
									<Column className="shipper success editable" style={{ display: views.shipper ? 'table-cell' : 'none' }}>
										<div className="table-items">
											<div className="calender-area location-area">
												<div className="date-time-box from">
													<p></p>
													<span className="btn btn-assign party-edit-btn">
														Assign
														</span>
												</div>
											</div>
										</div>
									</Column>
									<Column className="logistics-provider success editable" style={{ display: views.logistics ? 'table-cell' : 'none' }}>
										<div className="table-items">
											<div className="calender-area location-area">
												<div className="date-time-box from tool-container">
													<span className="btn btn-assign btn-disabled">
														Assign
														</span>
													<div className="clockwork-tooltip text-left ">
														<p>{logisticsProvider.message}</p>
													</div>
												</div>
											</div>
										</div>
									</Column>
									<Column className="receiver success editable" style={{ display: views.receiver ? 'table-cell' : 'none' }}>
										<div className="table-items">
											<div className="calender-area location-area">
												<div className="date-time-box from">
													<p>{receiver.name}</p>
													<p className="expand-item">
														{receiver.info.company}
													</p>
													<div className="celendar-box">
														<span className="tbl-item-btn person-edit-btn">
															<i className="fas fa-pencil-alt"></i>
														</span>
													</div>
												</div>
											</div>
											<div className="sidebar-btn">
												<div className="more-info tool-container">
													<i className="fas fa-info-circle"></i>
													<div className="clockwork-tooltip party-tooltip w-30 text-left">
														<p>{receiver.name}</p>
														<p>
															<a href={`mailto:${receiver.info.email}`}>
																{receiver.info.email}
															</a>
														</p>
														<p>{receiver.info.personPhone}</p>

														<p>
															<b>{receiver.info.company}</b>
														</p>
														<p>{receiver.info.address}</p>
													</div>
												</div>
												<div className="more-info">
													<i className="fas fa-ellipsis-h"></i>
													<div className="tool-container clockwork-tooltip"></div>
												</div>

												<div className="alert-box">
													<i className="fas fa-exclamation-triangle"></i>
													<div className="tool-container clockwork-tooltip">
														<p>{receiver.message}</p>
													</div>
												</div>
											</div>
										</div>
									</Column>
									<Column className="alertee success editable" style={{ display: views.alertee ? 'table-cell' : 'none' }}>
										<div className="table-items">
											<div className="calender-area location-area">
												<div className="date-time-box from">
													<p></p>
													<span className="btn btn-assign person-edit-btn">
														Assign
														</span>
												</div>
											</div>
										</div>
									</Column>
									*/}
												</React.Fragment>
											)
										})
									}
								</tr>
							);
						})
						: null}
				</tbody>
			</React.Fragment>
		);
	}
}



export default withRouter(ShippingTable);
