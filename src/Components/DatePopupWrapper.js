import React from "react";
import moment from 'moment';
import { ACTION_STATUSES } from '../utils/constants';
import HelperJS from '../utils/helperJS';

let dFrom = { date: '', time: '' };
let dTo = { date: '', time: '' };
class DatePopupWrapper extends React.Component {
	state = {
		time: "08:00",
		date: moment(new Date()).format('YYYY-MM-DD'),
		timeTo: "17:00",
		dateTo: moment(new Date()).format('YYYY-MM-DD'),
		dateOnly: ""

	};
	inputChangeHandler = (name, value) => {
		if (name === 'timeBoth') {
			this.setState({
				time: value, date: document.querySelector("#dateBoth").value,
				dateTo: document.querySelector("#dateBothTo").value
			});
		} else if (name === 'timeBothTo') {
			this.setState({
				timeTo: value, date: document.querySelector("#dateBoth").value,
				dateTo: document.querySelector("#dateBothTo").value
			});
		}

	};
	cancelDateHandler = () => {
		console.log("canceled");
		HelperJS.closeAssignPopupItems();
		const originalEntry = {...this.state.entry};
	
		this.props.cancelField(originalEntry);
	};

	handleSaveDateTime = () => {
		// console.log("clicked");
		const date = document.querySelector("#dateBoth").value;
		const time = document.querySelector("#timeBoth").value;
		const dateTo = document.querySelector("#dateBothTo").value;
		const timeTo = document.querySelector("#timeBothTo").value;
		console.log(document.querySelector("#dateBoth"));
		this.setState(
			{
				...this.state,
				date,
				time,
				dateTo,
				timeTo
			},
			() => {
				document.querySelector("#dateBoth").value = "";
				document.querySelector("#timeBoth").value = "";
				document.querySelector("#dateBothTo").value = "";
				document.querySelector("#timeBothTo").value = "";
			}
		);
		const entry = {
			date: date,
			time: time,
			dateTo: dateTo,
			timeTo: timeTo
		};
		this.props.saveField(entry);
	};
	handleSaveDateOnly = () => {
		const date = document.querySelector("#date").value;
		// console.log("time: ", time);

		this.setState(
			{
				...this.state,
				dateOnly: date,
			},
			() => {
				document.querySelector("#date").value = "";
			}
		);
		const entry = {
			date: date,
		};
		this.props.saveField(entry);

	};
	setDateValueHandler = (dateTime) => {
		dFrom = {
			date: dateTime.from.date,
			time: dateTime.from.time
		};
		dTo = {
			date: dateTime.to.date,
			time: dateTime.to.time
		};
		dFrom.date = moment(dFrom.date, 'MM/DD/YY').format('YYYY-MM-DD');
		dTo.date = moment(dTo.date, 'MM/DD/YY').format('YYYY-MM-DD');
		this.setState(
			{
				date: dFrom.date,
				time: dFrom.time,
				dateTo: dTo.date,
				timeTo: dTo.time
			});
		this.props.resetDateProps();

	}
	render() {
		if (this.props.property &&  this.props.rowItem &&
			this.props.datePropsState && this.props.datePropsState.status === ACTION_STATUSES.SUCCEED) {

			const temp = { ...this.props.rowItem };
				
			if (this.props.property === 'schDeliveryTime') {
				this.setDateValueHandler(temp.data.schDeliveryTime.dateTime);
			} else if (this.props.property === 'schPickupTime') {
				this.setDateValueHandler(temp.data.schPickupTime.dateTime);
			} else if (this.props.property === 'eta') {
				this.setDateValueHandler(temp.data.eta.dateTime);
			}else if (this.props.property === 'etd') {
				this.setDateValueHandler(temp.data.etd.dateTime);
			}
		}
		console.log('[this.state]', this.state);
		return (
			<React.Fragment>
				<div className="calender-popup dateTime">
					<button className="celendar-close">
						<i className="fas fa-times"></i>
					</button>
					<div className="fields-list">
						<ul>
							<li>
								<a className="btn-today">
									Today
								</a>
							</li>
							<li>
								<a className="btn-tomorrow">
									Tomorrow
								</a>
							</li>
							<li>
								<a className="btn-yesterday">
									Yesterday
								</a>
							</li>
						</ul>
					</div>
					<div>
						<div>
							<small>From</small>
						</div>
						<input type="input" id="dateBoth" name="dateBoth" defaultValue={this.state.date} value={this.state.date} />
						<input type="time" id="timeBoth" name="timeBoth" value={this.state.time} onChange={e => this.inputChangeHandler(e.target.name, e.target.value)} />
					</div>
					<div>
						<div>
							<small>To</small>
						</div>
						<input type="input" id="dateBothTo" value={this.state.dateTo} />
						<input type="time" id="timeBothTo" name="timeBothTo" value={this.state.timeTo} onChange={e => this.inputChangeHandler(e.target.name, e.target.value)} />
					</div>

					<div className="button-area">
						<button onClick={() => this.handleSaveDateTime()} className="btn btn-success dateTime-btn-save" type="button">
							Save
						</button>
						<button className="btn btn-danger dateTime-btn-cancel" type="button">
							Cancel
						</button>
						<button className="btn btn-warning dateTime-btn-clear" type="submit">
							Clear
						</button>
					</div>
				</div>
				{/* <!-- Calender  Time Popup --> */}
				<div className="calender-popup onlydate">
					<button className="celendar-close">
						<i className="fas fa-times"></i>
					</button>
					<div className="fields-list">
						<ul>
							<li>
								<a className="btn-today">
									Today
								</a>
							</li>
							<li>
								<a className="btn-tomorrow">
									Tomorrow
								</a>
							</li>
							<li>
								<a className="btn-yesterday">
									Yesterday
								</a>
							</li>
						</ul>
					</div>
					<input type="date" id="date" defaultValue={this.state.date} />
					<div className="button-area">
						<button onClick={() => this.handleSaveDateOnly()} className="btn btn-success date-btn-save" type="button">
							Save
						</button>
						<button className="btn btn-danger date-btn-cancel" type="button">
							Cancel
						</button>
						<button className="btn btn-warning  date-btn-clear" type="submit">
							Clear
						</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default DatePopupWrapper;
