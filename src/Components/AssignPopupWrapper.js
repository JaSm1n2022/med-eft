import React from "react";
import AssignPopup from "./AssignPopup";

class AssignPopupWrapper extends React.Component {
	/*
	state = {
		locations: [
			{
				id: "locations",
				name: "Recently Used Locations",
				entries: [
					{
						id: "0",
						name: "SONY ELECTRONICS TOKYO",
					},
					{
						id: "1",
						name: "SMILE DIRECT BOULDER",
					},
					{
						id: "2",
						name: "a-JICK TRANSPORT (HOUSTON PRE)",
					},
				],
			},
			{
				id: "otherLoc",
				name: "Others Locations",
				entries: [
					{
						id: "0",
						name: "APPLE CUPERTINO",
					},
					{
						id: "1",
						name: "BASF MORRISTOWN",
					},
					{
						id: "2",
						name: "CONAIR SYRACUSE",
					},
					{
						id: "3",
						name: "DELL AUSTIN",
					},
					{
						id: "4",
						name: "HOME DEPOT LAS VEGAS",
					},
					{
						id: "5",
						name: "WALMART NEW HAVEN",
					},
				],
			},
		],
		parties: [
			{
				id: "parties",
				name: "Recently Used Parties",
				entries: [
					{
						id: "0",
						name: "QUICK TRANSPORT (HOUSTON)",
					},
					{
						id: "1",
						name: "GLOBAL AGILE LOGISTICS",
					},
					{
						id: "2",
						name: "LOWES ATLANTA CHQ",
					},
				],
			},
			{
				id: "otherParties",
				name: "Other Parties",
				entries: [
					{
						id: "0",
						name: "RAPID DELIVERY (Kansas City)",
					},
					{
						id: "1",
						name: "SERVE WITH A SMILE EXPRESS",
					},
					{
						id: "2",
						name: "GREAT TRUCKING (Los Angeles)",
					},
				],
			},
		],
		persons: [
			{
				id: "persons",
				name: "Recently Used Persons",
				entries: [
					{
						id: "0",
						name: "HENRIETTA WANG",
						info: "GLOBAL AGILE LOGISTICS",
					},
					{
						id: "1",
						name: "VINCENT BONAPARTE",
						info: "GLOBAL AGILE LOGISTICS",
					},
					{
						id: "2",
						name: "SIMONE ROBERTS",
						info: "DHL SUPPLY CHAIN, USA (BOS)",
					},
				],
			},
			{
				id: "otherPersons",
				name: "Others Persons",
				entries: [
					{
						id: "0",
						name: "MANISH GUPTA",
						info: "RAPID DELIVERY (Konsos City)",
					},
					{
						id: "1",
						name: "MICHAEL SAXON",
						info: "GREAT TRUCKING (Los Angeles)",
					},
					{
						id: "2",
						name: "Jacky Karolose",
						info: "Sensor Transport Inc",
					},
				],
			},
		],
	};
 */

state = {
	locations: this.props.locArrays || [],
	parties: this.props.partyArrays || [],
	persons: this.props.personArrays|| []
};


	render() {
		console.log('[persons to popup]',this.props.personArrays);
		return (
			<React.Fragment>
				<AssignPopup
					list={this.props.locArrays}
					listWrapperId="LocationSearchBox"
					mainClassName="table-location-items"
					searchInputId="locationSearchForField"
					searchClearId="clearLocationSearchField"
					searchPlaceholder="Search For a Location"
					saveBtnId="location-save"
					clearBtnId="location-cancel"
					saveField={this.props.saveField}
					cancelField={this.props.cancelField}
				/>
				<AssignPopup
					list={this.state.parties}
					listWrapperId="ParthSearchBox"
					mainClassName="party-popup"
					searchInputId="PartySearchForField"
					searchClearId="clearPartySearchField"
					searchPlaceholder="Search For a Party"
					saveBtnId="party-save"
					clearBtnId="location-cancel"
				/>
				<AssignPopup
					list={this.props.personArrays}
					listWrapperId="PersonSearchBox"
					mainClassName="person-popup"
					searchInputId="PersonSearchForField"
					searchClearId="clearPersonSearchField"
					searchPlaceholder="Search For a Person"
					saveBtnId="person-save"
					clearBtnId="location-cancel"
					saveField={this.props.saveField}
					cancelField={this.props.cancelField}
				/>
			</React.Fragment>
		);
	}
}

export default AssignPopupWrapper;
