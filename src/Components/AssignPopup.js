import React from "react";
import { connect } from "react-redux";
import HelperJS from '../utils/helperJS';

// import { tableHeadings } from './TableData.json'


let selectedItem = undefined;
let originalItem = undefined;
class AssignPopup extends React.Component {
	state = {
		entry: null,
		itemId: null,
	};

	handleEntryChange = (entry) => {
		console.log(entry);
		this.setState({
			...this.state,
			entry,
			itemId: entry.id,
		});
	};

	handleCancelEntryChange = () => {
		console.log("canceled");
		HelperJS.closeAssignPopupItems();
		const originalEntry = {...this.state.entry};
	
		this.props.cancelField(originalEntry);
	};
	
	render() {
		const {
			list,
			listWrapperId,
			mainClassName,
			searchInputId,
			searchClearId,
			searchPlaceholder,
			saveBtnId,
			clearBtnId,
			saveField


		} = this.props;
		console.log('[list]',list);
		return (
			<React.Fragment>
				<div className={`${mainClassName} table-popup-items col-control-popup`}>
					<div className="searchInput">
						<input type="text" name="" id={searchInputId} placeholder={searchPlaceholder} />
						<i className={`fas fa-times ${searchClearId}`}></i>
					</div>
					<div className="CategoeySearchBoxWrap">
						<ul id={listWrapperId}>
							{list
								? list.map((item) => {
									return (
										<React.Fragment key={item.id}>
											<li>
												<b>{item.name}</b>
												<span></span>
											</li>
											{item.entries !== null
												? item.entries.map((entry) => {
													return (
														<li key={entry.id} onClick={() => this.handleEntryChange(entry)}>
															<span className={this.state.itemId === entry.id ? "active" : null}>{entry.name}</span>
															{entry.info ? <i>{entry.info}</i> : null}
														</li>
													);
												})
												: ""}
										</React.Fragment>
									);
								})
								: null}
						</ul>
					</div>
					<div className="btn-groups">
						
							<button className={`btn btn-success ${saveBtnId}`} type="button" onClick={() => saveField(this.state.entry)}>
								Save
						</button>
							<button className={`btn btn-danger ${clearBtnId}`} type="button" onClick={this.handleCancelEntryChange}>
								Cancel
						</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	data: state
});
const mapDispatchToProps = (dispatch) => ({
	onLocationChange: (item) =>
		dispatch({ type: "SET_LOCATION", payload: item })
});



export default connect(mapStateToProps, mapDispatchToProps)(AssignPopup);
