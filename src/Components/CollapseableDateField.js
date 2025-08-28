import React from "react";

const CollapseableDateField = (props) => {
	// console.log('testing');
	// console.log(props)
	const { dateTime, info, message } = props.fieldData;
	const {getRowItem, category,item} = props;
	const nameIdDfrom = `${category}-${item.id}-dfrom`;
	const nameIdTfrom = `${category}-${item.id}-tfrom`;

	let renderToDate = "";
	if (dateTime.to && dateTime.to !== null) {
		renderToDate = (
			<div className="date-time-box to">
				<span>To</span>
				{/* {props.expand ? <span>To</span> : null} */}
				{props.showDate ? <p>{dateTime.to.date}</p> : null}
				{props.showTime ? (
					<p>
						<b>{dateTime.to.time}</b>
					</p>
				) : null}
				<div className="celendar-box">
					<span className="celendar-btn">
						<i className="far fa-calendar"></i>
					</span>
				</div>
			</div>
		);
	} else {
		renderToDate = (
			<div className="date-time-box to">
				<span>To</span>
				<p>
					<i>Add Date</i>
				</p>
				<p>
					<b>
						<i>Add Time</i>
					</b>
				</p>
				<div className="celendar-box">
					<span className="celendar-btn">
						<i className="far fa-calendar"></i>
					</span>
				</div>
			</div>
		);
	}

	return (
		<React.Fragment>
			<div className="table-items">
				<div className="calender-area">
					<div className="date-time-box from">
						{props.showDate ? <p id={nameIdDfrom}>{dateTime.from.date}</p> : null}
						{props.showTime ? (
							<p>
								<b id={nameIdTfrom}>{dateTime.from.time}</b>
							</p>
						) : null}
						<div className="celendar-box">
							<span className="celendar-btn" onClick={() => getRowItem(item, category)}>
								<i className="far fa-calendar"></i>
							</span>
						</div>
					</div>

					{/* { props.toDate !== false ? renderToDate : null } */}
					{renderToDate}
				</div>
				<div className="sidebar-btn">
					<div className="more-info tool-container">
						<i className="fas fa-info-circle"></i>
						<div className="clockwork-tooltip w-30 text-left">
							<p>
								Last Update on <b>{info.updateOn}</b>
								<br />
							</p>
							<p>
								By <b>{info.updateBy}</b> from {info.updateFrom}
								<br />
							</p>
							<p>
								Previous ETD was <b>{info.prevETD}</b>
							</p>
							<div >
					{message &&
						<p>
							<span>
							<i className="fas fa-exclamation-triangle"></i>
								<p>{message}</p>
							</span>
						</p>
						}
					</div>
						</div>
					</div>

					{props.expand !== false ? (
						<div className="more-info">
							{/* <i className="fas fa-ellipsis-h"></i> */}
							<div className="tool-container clockwork-tooltip"></div>
						</div>
					) : null}

					
				</div>
			</div>
		</React.Fragment>
	);
};

export default CollapseableDateField;