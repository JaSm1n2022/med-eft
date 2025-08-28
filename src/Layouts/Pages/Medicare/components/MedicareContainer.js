import React, { PureComponent } from "react";
import { withRouter } from 'react-router-dom';
import { ACTION_STATUSES } from "../../../../utils/constants";
import Helper from "../../../../utils/helper";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
type State = {

}
type Props = {
	medicareState: Object,
	parseMedicare: Function,
	resetMedicare: Function
}
let filename = undefined;
let result = undefined;
class MedicareContainer extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);

	}

	componentWillUnmount() {
	}

	componentWillMount() {
		//	HelperJS.startCounter(compCounter);
	}

	componentDidMount() {
	}

	render() {
		const { parseMedicare, resetMedicare, medicareState } = this.props;

		const exportExcelAllHandler = (mode, reportName, records) => {

			let reportData = Helper.reportExcelFormat(mode, records);
			const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
			const fileExtension = '.xlsx';
			let fileName = reportName + '_' + new Date().getTime();
			const ws = XLSX.utils.json_to_sheet(reportData);
			const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
			const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
			const data = new Blob([excelBuffer], { type: fileType });
			FileSaver.saveAs(data, fileName + fileExtension);
		}
		const onUploadFile = (event) => {
			console.log('[event]', event);
			const file = event.target.files[0];
			console.log('[file]', file);
			filename = file.name;


		};
		const submit = () => {
			const payload = {
				filename: filename,
				data: {}
			};
			parseMedicare(payload);
		}
		console.log('[medicare State]', medicareState);
		if (medicareState && medicareState.status === ACTION_STATUSES.SUCCEED) {
			result = medicareState.data;
			console.log('result', result);
			resetMedicare();
		}
		return (
			<React.Fragment>
				<div style={{ paddingTop: '20px', marginLeft: '30px' }} >
					<h1>MEDICARE REMITTANCE REPORT</h1>
					<div className="form-row">
						<div className="col">
							<label htmlFor="darkmodelogo">Process File </label>
							<div className="">

								<div className="">
									<input onChange={(e) => onUploadFile(e)} type="file" className="form-control" id="profile_pic" hidden="" />
								</div>
							</div>
						</div>
					</div>
					<div style={{ paddingTop: '20px' }}>
						<button className="btn btn-primary btn-lg" onClick={() => submit()}>GET REPORT</button>
					</div>
					{result && result.summary &&
						<div>
							<div style={{ paddingTop: '20px' }}>
								<h3>Filename : {filename}</h3>
								<br />
								<h1>MEDICARE Total Claims Summary 		<i style={{ color: 'green' }} class="fas fa-file-excel" onClick={() => exportExcelAllHandler('Medicare Summary', 'MEDICARE_SUMMARY', result.summary)}></i>
								</h1>
								<div className="table-responsive">
									<table className="table">
										<thead>
											<tr>
												<th>Number of Claims</th>
												<th>Billed Amount</th>
												<th>Allowed Amount</th>
												<th>Deduct Amount</th>
												<th>Coninsurance Amount</th>
												<th>Check Amount</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>{result.summary.numberOfClaims}</td>
												<td>{result.summary.billedAmt}</td>
												<td>{result.summary.allowedAmt}</td>
												<td>{result.summary.deductAmt}</td>
												<td>{result.summary.coinsAmt}</td>
												<td>{result.summary.checkAmt}</td>
											</tr>

										</tbody>
									</table>
								</div>
							</div>
						</div>

					}
					{result && result.payments && result.payments.length ?
						(
							<div>
								<div style={{ paddingTop: '20px' }}>
									<h1>MEDICARE Details <i style={{ color: 'green' }} class="fas fa-file-excel" onClick={() => exportExcelAllHandler('Medicare Details', 'MEDICARE_DETAILS', result.payments)}></i></h1>
									<div className="table-responsive">
										<table className="table">
											<thead>
												<tr>
													<th>Name</th>
													<th>Service From</th>
													<th>Service To</th>
													<th>Service Code</th>
													<th>Modifier</th>
													<th>Amount Billed</th>
													<th>Amount Allowed</th>
													<th>Amount Deduct</th>
													<th>Co-Insurance</th>
													<th>Net</th>
													<th>REM</th>
													<th>REM Desc</th>
												</tr>
											</thead>

											<tbody>
												{result.payments && result.payments.length > 0 && result.payments.map((srvc, i) => (
													<tr key={i}>
														<td>{srvc.patientName}</td>
														<td>{srvc.serviceFrom}</td>
														<td>{srvc.serviceTo}</td>
														<td>{srvc.serviceCode}</td>
														<td>{srvc.modifier}</td>
														<td>{srvc.amtBilled}</td>
														<td>{srvc.amtAllowed}</td>
														<td>{srvc.amtDeduct}</td>
														<td>{srvc.coinsurance}</td>
														<td>{srvc.net}</td>
														<td>{srvc.rem}</td>
														<td>{srvc.remDesc}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						) : <span></span>

					}

					{result && result.serviceSummary && result.serviceSummary.length ?
						(
							<div>
								<div style={{ paddingTop: '20px' }}>
									<h1>Services Summary <i style={{ color: 'green' }} class="fas fa-file-excel" onClick={() => exportExcelAllHandler('Service Summary', 'SERVICE_SUMMARY', result.serviceSummary)}></i></h1>
									<div className="table-responsive">
										<table className="table">
											<thead>
											
											<tr>
													<th>Service Code/Modifier</th>
													<th>Count</th>
												</tr>
											</thead>
											<tbody>
											
											{result.serviceSummary && result.serviceSummary.length > 0 && result.serviceSummary.map((srvc, i) => (
											<tr key={i}>
											<td>{srvc.service}</td>
											<td>{srvc.cnt}</td>
										
											</tr>
									
											))}		
											</tbody>
										</table>
									</div>
								</div>
							</div>
						) : <span></span>

					}

				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(MedicareContainer);
