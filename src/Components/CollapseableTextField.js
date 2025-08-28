import React from "react";

const CollapseableTextField = (props) => {

	const { info, name, message } = props.fieldData;
	const { getRowItem, category, item } = props;
	const nameId = `${category}-${item.id}`;
	return (
		<div className="table-items">
			<div className="calender-area location-area">
				<div className="date-time-box from">
					<p id={nameId}>
						{name}
						{props.expand ? (
							<span className="expand-item">Services LTD.</span>
						) : null}
					</p>

					{props.expand !== false ? (
						<p className="expand-item">
							{info.address ? <span>{info.address}</span> : ""}
						</p>
					) : null}

					<div className="celendar-box">
						<span className="location-edit-btn" onClick={() => getRowItem(item, category)}>
							<i className="fas fa-pencil-alt"></i>
						</span>
					</div>
				</div>
			</div>
			<div className="sidebar-btn">
				<div className="more-info tool-container">
					<i className="fas fa-info-circle"></i>
					<div className="clockwork-tooltip w-30 text-left">
						<p>{info.company}</p>
						<p>{info.address}</p>
						<p>{info.phone}</p>
						<br />
						<p>
							<b>Contact</b>
						</p>
						<p>{info.person}</p>
						<p>
							<a href={`mailto:${info.email}`}>{info.email}</a>
						</p>
						<p>{info.personPhone}</p>
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
				<div className="more-info">
					{/* <i className="fas fa-ellipsis-h"></i> */}
					<div className="tool-container clockwork-tooltip"></div>
				</div>

				<div className="alert-box">
					<i className="fas fa-exclamation-triangle"></i>
					<div className="tool-container clockwork-tooltip">
						<p>{message}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CollapseableTextField;
