import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { ACTION_STATUSES } from "../../../../utils/constants";
import Helper from "../../../../utils/helper";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import fs from "fs";
type State = {};
type Props = {
  medicaidState: Object,
  parseMedicaid: Function,
  resetMedicaid: Function,
};
let filename = undefined;
let dataFileBuffer = undefined;
let result = undefined;
let isWarning = false;
class MedicaidContainer extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentWillUnmount() {}

  componentWillMount() {
    //	HelperJS.startCounter(compCounter);
  }

  componentDidMount() {}

  render() {
    const { parseMedicaid, resetMedicaid, medicaidState } = this.props;

    const exportExcelAllHandler = (mode, reportName, records) => {
      let reportData = Helper.reportExcelFormat(mode, records);
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      let fileName = reportName + "_" + new Date().getTime();
      const ws = XLSX.utils.json_to_sheet(reportData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    };
    function readFileAsync(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = (e) => {
          let dataBuffer = e.target.result;
          dataBuffer = new Int8Array(dataBuffer);
          resolve(dataBuffer);
        };

        reader.onerror = reject;

        reader.readAsArrayBuffer(file);
      });
    }
    const onUploadFile = async (event) => {
      console.log("[event]", event);
      const file = event.target.files[0];

      console.log("[file]", file);

      filename = file.name;
      dataFileBuffer = await readFileAsync(file);
    };

    const submit = () => {
      const payload = {
        filename: filename,
        data: undefined,
      };
      parseMedicaid(payload);
    };
    console.log("[imsState]", medicaidState);
    if (medicaidState && medicaidState.status === ACTION_STATUSES.SUCCEED) {
      result = medicaidState.data;
      isWarning = false;
      const earnings = parseFloat(
        result.netPayment.amount.toString().replace(",", "")
      );
      const medicaidEarn = parseFloat(
        result.medicaid.paid.amount.toString().replace(",", "") || 0
      );
      const medicareEarn = parseFloat(
        result.medicare.paid.amount.toString().replace(",", "") || 0
      );
      const adjustment = parseFloat(
        result.totalNumber.adjustment.amount.toString().replace(",", "") || 0
      );
      const payments =
        parseFloat(medicaidEarn) +
        parseFloat(medicareEarn) +
        parseFloat(adjustment);
      console.log("[PAUME", payments, earnings);
      if (parseFloat(earnings).toFixed(2) !== parseFloat(payments).toFixed(2)) {
        isWarning = true;
      }
      console.log("result", result);
      resetMedicaid();
    }
    return (
      <React.Fragment>
        <div style={{ paddingTop: "20px", marginLeft: "30px" }}>
          <h1>MEDICAID/MEDICARE CROSSOVER REPORT</h1>
          <div
            className="form-row"
            style={{ width: 500, paddingTop: 10, paddingBottom: 10 }}
          >
            <div className="col" style={{ paddingTop: 10, paddingBottom: 10 }}>
              <label htmlFor="darkmodelogo">Process File </label>

              <input
                onChange={(e) => onUploadFile(e)}
                type="file"
                className="form-control"
                id="profile_pic"
                hidden=""
                style={{ paddingBottom: 20 }}
              />
            </div>
          </div>
          <div>
            <button className="btn btn-primary btn-lg" onClick={() => submit()}>
              GET REPORT
            </button>
          </div>
          {result && result.medicaid && (
            <div>
              <div style={{ paddingTop: "20px" }}>
                <h3>Filename : {filename}</h3>

                <h1>REMITTANCE INFORMATION</h1>
                <ul>
                  <li>Remittance Date : {result.remittance.remittanceDate}</li>
                  <li>
                    Remittance EFT Number :{" "}
                    {result.remittance.remittanceEftNumber}
                  </li>
                  <li>
                    Remittance EFT Date: {result.remittance.remittanceEftDate}
                  </li>
                </ul>
                <br />
                <h1>MEDICAID Claims Summary </h1>
                <div className="table-responsive">
                  <table style={{ width: "500px" }} className="table">
                    <thead>
                      <tr>
                        <th>-</th>
                        <th>Current Number</th>
                        <th>Current Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>PAID</td>
                        <td>{result.medicaid.paid.totalCnt}</td>
                        <td>{result.medicaid.paid.amount}</td>
                      </tr>
                      <tr>
                        <td>DENIED</td>
                        <td>{result.medicaid.denied.totalCnt}</td>
                        <td>{result.medicaid.denied.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h1>MEDICARE CROSSOVER Claims Summary </h1>
                <div className="table-responsive">
                  <table style={{ width: "500px" }} className="table">
                    <thead>
                      <tr>
                        <th>-</th>
                        <th>Current Number</th>
                        <th>Current Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>PAID</td>
                        <td>{result.medicare.paid.totalCnt}</td>
                        <td>{result.medicare.paid.amount}</td>
                      </tr>
                      <tr>
                        <td>DENIED</td>
                        <td>{result.medicare.denied.totalCnt}</td>
                        <td>{result.medicare.denied.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {isWarning && (
                <div>
                  <p>
                    {" "}
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      !!! WARNING EARNINGS DISCREPANCIES
                    </span>
                  </p>
                  <p>
                    <span style={{ fontSize: 10 }}>
                      ** Check claim adjustment information
                    </span>
                  </p>
                </div>
              )}
              <div style={{ paddingTop: "20px" }}>
                <h1>PROVIDER REMITTANCE ADVICE SUMMARY </h1>

                <h3>CLAIMS DATA </h3>
                <div className="table-responsive">
                  <table style={{ width: "500px" }} className="table">
                    <thead>
                      <tr>
                        <th>-</th>
                        <th>Current Number</th>
                        <th>Current Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>CLAIMS PAID</td>
                        <td>
                          {" "}
                          {parseInt(
                            result.remittance.claimsCurrentNumber || 0,
                            0
                          )}
                        </td>
                        <td>
                          {result.remittance.claimsCurrentAmount
                            ? parseFloat(
                                result.remittance.claimsCurrentAmount.replace(
                                  ",",
                                  ""
                                )
                              ).toFixed(2)
                            : 0.0}
                        </td>
                      </tr>
                      <tr>
                        <td>CLAIM ADJUSTMENTS</td>
                        <td>
                          {" "}
                          {parseInt(
                            result.remittance.claimsAdjustmentsNumber || 0,
                            0
                          )}
                        </td>
                        <td>
                          {result.remittance.claimAdjustmentsAmount
                            ? parseFloat(
                                result.remittance.claimAdjustmentsAmount.replace(
                                  ",",
                                  ""
                                )
                              ).toFixed(2)
                            : 0.0}
                        </td>
                      </tr>

                      <tr style={{ background: "#f5f5f5" }}>
                        <td>
                          <span style={{ fontWeight: "bold" }}>
                            TOTAL CLAIMS PAYMENTS
                          </span>{" "}
                        </td>
                        <td>
                          {" "}
                          <span style={{ fontWeight: "bold" }}>
                            {" "}
                            {parseInt(
                              result.remittance.totalClaimsPaymentNumber || 0,
                              0
                            )}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontWeight: "bold" }}>
                            {result.remittance.totalClaimsPaymentAmount
                              ? parseFloat(
                                  result.remittance.totalClaimsPaymentAmount.replace(
                                    ",",
                                    ""
                                  )
                                ).toFixed(2)
                              : 0.0}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>CLAIMS DENIED</td>
                        <td>
                          {" "}
                          {parseInt(
                            result.remittance.totalClaimsDeniedNumber || 0,
                            0
                          )}
                        </td>
                        <td>
                          {result.remittance.totalClaimsDeniedAmount
                            ? parseFloat(
                                result.remittance.totalClaimsDeniedAmount.replace(
                                  ",",
                                  ""
                                )
                              ).toFixed(2)
                            : 0.0}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h3>EARNING DATA </h3>
                <div className="table-responsive">
                  <table style={{ width: "500px" }} className="table">
                    <thead>
                      <tr>
                        <th>PAYMENTS</th>
                        <th>CURRENT AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>CLAIMS PAYMENTS</td>
                        <td>
                          {result.remittance.totalClaimsPaymentsAmount
                            ? parseFloat(
                                result.remittance.totalClaimsPaymentsAmount.replace(
                                  ",",
                                  ""
                                )
                              ).toFixed(2)
                            : 0.0}
                        </td>
                      </tr>
                      <tr>
                        <td>CLAIM ADJUSTMENT PAYOUT</td>

                        <td>
                          {result.remittance.totalClaimsAdjPaymentsAmount
                            ? parseFloat(
                                result.remittance.totalClaimsAdjPaymentsAmount.replace(
                                  ",",
                                  ""
                                )
                              ).toFixed(2)
                            : 0.0}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <span>ADJUSTMENTS FROM CURRENT CYCLE</span>{" "}
                        </td>

                        <td>
                          <span>
                            {
                              result.remittance
                                .totalClaimAdjFromCurrentCyclePaymentAmount
                            }
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>OUTSTANDING FROM PREVIOUS CYCLES</td>

                        <td>
                          {
                            result.remittance
                              .totalClaimAdjFromPreviousCyclePaymentAmount
                          }
                        </td>
                      </tr>
                      <tr style={{ background: "#f5f5f5" }}>
                        <td>
                          <span style={{ fontWeight: "bold" }}>
                            NET EARNINGS
                          </span>
                        </td>

                        <td>
                          <span style={{ fontWeight: "bold" }}>
                            {result.remittance.netEarningsAmount
                              ? parseFloat(
                                  result.remittance.netEarningsAmount.replace(
                                    ",",
                                    ""
                                  )
                                ).toFixed(2)
                              : 0.0}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/*
              <div style={{ paddingTop: "20px" }}>
                <h1>PROVIDER REMITTANCE ADVICE SUMMARY </h1>
                <ul>
                  <li>
                    CLAIMS DATA :{" "}
                    {result.totalNumber.payments.totalCnt}
                  </li>
                  <li>NET EARNINGS ($): {result.netPayment.amount}</li>
                  <li>------------------------------</li>
                  <li>MEDICAID PAID AMOUNT : {result.medicaid.paid.amount}</li>
                  <li>MEDICARE PAID AMOUNT : {result.medicare.paid.amount}</li>
                  <li>
                    TOTAL AMOUNT ADJUSTMENT :{" "}
                    {result.totalNumber.adjustment.amount}
                  </li>
                  <li>------------------------------</li>
                  <li>
                    TOTAL AMOUNT DENIED ($):{" "}
                    {result.deniedAmount.amount.toLocaleString()}
                  </li>
                  <li>
                    TOTAL NUMBER CLAIMS DENIED :{" "}
                    {result.totalNumber.denied.totalCnt}
                  </li>
                  <li>
                    TOTAL NUMBER CLAIMS ADJUSTMENT :{" "}
                    {result.totalNumber.adjustment.totalCnt}
                  </li>
                  {isWarning && (
                    <li>
                      <span style={{ color: "red" }}>
                        !!! WARNING EARNINGS DISCREPANCIES
                      </span>
                    </li>
                  )}
                </ul>
              </div>
				  */}

              <div style={{ paddingTop: "20px" }}>
                <h1>
                  SERVICES Summary
                  {result.services &&
                    result.services.serviceList &&
                    result.services.serviceList.length && (
                      <i
                        style={{ color: "green" }}
                        class="fas fa-file-excel"
                        onClick={() =>
                          exportExcelAllHandler(
                            "Services",
                            "SERVICES_SUMMARY",
                            result.services.serviceList
                          )
                        }
                      ></i>
                    )}
                </h1>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Service Code</th>
                        <th>Medicare Paid Count</th>
                        <th>Medicaid Paid Count</th>
                        <th>Medicare Denied Count</th>
                        <th>Medicaid Denied Count</th>
                        <th>Total Count</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.services &&
                        result.services.serviceList &&
                        result.services.serviceList.length > 0 &&
                        result.services.serviceList.map((srvc, index) => (
                          <tr key={`${srvc.name}${index}`}>
                            <td>{srvc.name}</td>
                            <td>{srvc.medicarePaid}</td>
                            <td>{srvc.medicaidPaid}</td>
                            <td>{srvc.medicareDenied}</td>
                            <td>{srvc.medicaidDenied}</td>
                            <td>{srvc.total}</td>
                            <td>{srvc.desc}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{ paddingTop: "20px" }} className="col-md-12">
                <h1>
                  MEMBER MEDICAID DENIED Summary
                  {result.medicaidDeniedClaimService &&
                    result.medicaidDeniedClaimService.length > 0 && (
                      <i
                        style={{ color: "green" }}
                        class="fas fa-file-excel"
                        onClick={() =>
                          exportExcelAllHandler(
                            "Denied",
                            "MEMBER_MEDICAID_DENIED",
                            result.medicaidDeniedClaimService
                          )
                        }
                      ></i>
                    )}
                </h1>

                <div className="table-responsive">
                  <table style={{ width: "100%" }} className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Proc Cd</th>
                        <th>Modifier</th>
                        <th>Proc Desc</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                        <th>Detail</th>
                        <th>Detail Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.medicaidDeniedClaimService &&
                        result.medicaidDeniedClaimService.length > 0 &&
                        result.medicaidDeniedClaimService.map((srvc) => (
                          <tr
                            key={`${srvc.samename}${srvc.srvcCode}${srvc.srvcFrom}`}
                          >
                            <td>{srvc.samename}</td>
                            <td>{srvc.srvcCode}</td>
                            <td>{srvc.srvcModifierCd}</td>
                            <td>{srvc.srvcDesc}</td>
                            <td>{srvc.srvcFrom}</td>
                            <td>{srvc.srvcTo}</td>
                            <td>{srvc.srvcBilledAmt}</td>
                            <td>{srvc.srvcDetail}</td>
                            <td>
                              {srvc.svDescription &&
                                srvc.svDescription.length > 0 &&
                                srvc.svDescription.map((srvc2, index) => (
                                  <p key={index}>{srvc2}</p>
                                ))}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{ paddingTop: "20px" }} className="col-md-12">
                <h1>
                  MEMBER MEDICARE CROSSOVER DENIED Summary
                  {result.medicareDeniedClaimService &&
                    result.medicareDeniedClaimService.length > 0 && (
                      <i
                        style={{ color: "green" }}
                        class="fas fa-file-excel"
                        onClick={() =>
                          exportExcelAllHandler(
                            "Denied",
                            "MEMBER_MEDICARE_DENIED",
                            result.medicareDeniedClaimService
                          )
                        }
                      ></i>
                    )}
                </h1>

                <div className="table-responsive">
                  <table style={{ width: "100%" }} className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Proc Cd</th>
                        <th>Modifier</th>
                        <th>Proc Desc</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                        <th>Detail</th>
                        <th>Detail Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.medicareDeniedClaimService &&
                        result.medicareDeniedClaimService.length > 0 &&
                        result.medicareDeniedClaimService.map((srvc) => (
                          <tr
                            key={`${srvc.samename}${srvc.srvcCode}${srvc.srvcFrom}`}
                          >
                            <td>{srvc.samename}</td>
                            <td>{srvc.srvcCode}</td>
                            <td>{srvc.srvcModifierCd}</td>
                            <td>{srvc.srvcDesc}</td>
                            <td>{srvc.srvcFrom}</td>
                            <td>{srvc.srvcTo}</td>
                            <td>{srvc.srvcBilledAmt}</td>
                            <td>{srvc.srvcDetail}</td>
                            <td>
                              {srvc.svDescription &&
                                srvc.svDescription.length > 0 &&
                                srvc.svDescription.map((srvc2, index) => (
                                  <p key={index}>{srvc2}</p>
                                ))}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{ paddingTop: "20px" }} className="col-md-12">
                <h1>
                  MEMBER MEDICAID Paid Summary
                  {result.medicaidPaidClaimService &&
                    result.medicaidPaidClaimService.length > 0 && (
                      <i
                        style={{ color: "green" }}
                        class="fas fa-file-excel"
                        onClick={() =>
                          exportExcelAllHandler(
                            "Paid",
                            "MEMBER_MEDICAID_PAID",
                            result.medicaidPaidClaimService
                          )
                        }
                      ></i>
                    )}
                </h1>

                <div className="table-responsive">
                  <table style={{ width: "100%" }} className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Proc Cd</th>
                        <th>Modifier</th>
                        <th>Proc Desc</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Billed Amount</th>
                        <th>Paid Amount</th>
                        <th>Detail</th>
                        <th>Detail Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.medicaidPaidClaimService &&
                        result.medicaidPaidClaimService.length > 0 &&
                        result.medicaidPaidClaimService.map((srvc) => (
                          <tr
                            key={`${srvc.samename}${srvc.srvcCode}${srvc.srvcFrom}`}
                          >
                            <td>{srvc.samename}</td>
                            <td>{srvc.srvcCode}</td>
                            <td>{srvc.srvcModifierCd}</td>
                            <td>{srvc.srvcDesc}</td>
                            <td>{srvc.srvcFrom}</td>
                            <td>{srvc.srvcTo}</td>
                            <td>{srvc.srvcBilledAmt}</td>
                            <td>{srvc.srvcPaidAmt}</td>

                            <td>{srvc.srvcDetail}</td>
                            <td>
                              {srvc.svDescription &&
                                srvc.svDescription.length > 0 &&
                                srvc.svDescription.map((srvc2, index) => (
                                  <p key={index}>{srvc2}</p>
                                ))}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{ paddingTop: "20px" }} className="col-md-12">
                <h1>
                  MEMBER MEDICARE CROSSOVER PAID Summary
                  {result.medicarePaidClaimService &&
                    result.medicarePaidClaimService.length > 0 && (
                      <i
                        style={{ color: "green" }}
                        class="fas fa-file-excel"
                        onClick={() =>
                          exportExcelAllHandler(
                            "Paid",
                            "MEMBER_MEDICARE_PAID",
                            result.medicarePaidClaimService
                          )
                        }
                      ></i>
                    )}
                </h1>

                <div className="table-responsive">
                  <table style={{ width: "100%" }} className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Proc Cd</th>
                        <th>Modifier</th>
                        <th>Proc Desc</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Bill Amount</th>
                        <th>Paid Amount</th>
                        <th>Detail</th>
                        <th>Detail Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.medicarePaidClaimService &&
                        result.medicarePaidClaimService.length > 0 &&
                        result.medicarePaidClaimService.map((srvc) => (
                          <tr
                            key={`${srvc.samename}${srvc.srvcCode}${srvc.srvcFrom}`}
                          >
                            <td>{srvc.samename}</td>
                            <td>{srvc.srvcCode}</td>
                            <td>{srvc.srvcModifierCd}</td>
                            <td>{srvc.srvcDesc}</td>
                            <td>{srvc.srvcFrom}</td>
                            <td>{srvc.srvcTo}</td>
                            <td>{srvc.srvcBilledAmt}</td>
                            <td>{srvc.srvcPaidAmt}</td>
                            <td>{srvc.srvcDetail}</td>
                            <td>
                              {srvc.svDescription &&
                                srvc.svDescription.length > 0 &&
                                srvc.svDescription.map((srvc2, index) => (
                                  <p key={index}>{srvc2}</p>
                                ))}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ paddingTop: "20px" }} className="col-md-12">
                <h1>
                  ADJUSTMENT Summary
                  {result.adjustmentService &&
                    result.adjustmentService.length > 0 && (
                      <i
                        style={{ color: "green" }}
                        class="fas fa-file-excel"
                        onClick={() =>
                          exportExcelAllHandler(
                            "Paid",
                            "ADJUSTMENT",
                            result.adjustmentService
                          )
                        }
                      ></i>
                    )}
                </h1>

                <div className="table-responsive">
                  <table style={{ width: "100%" }} className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Proc Cd</th>
                        <th>Modifier</th>
                        <th>Proc Desc</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Bill Amount</th>
                        <th>Paid Amount</th>
                        <th>Detail</th>
                        <th>Detail Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.adjustmentService &&
                        result.adjustmentService.length > 0 &&
                        result.adjustmentService.map((srvc) => (
                          <tr
                            key={`${srvc.samename}${srvc.srvcCode}${srvc.srvcFrom}`}
                          >
                            <td>{srvc.samename}</td>
                            <td>{srvc.srvcCode}</td>
                            <td>{srvc.srvcModifierCd}</td>
                            <td>{srvc.srvcDesc}</td>
                            <td>{srvc.srvcFrom}</td>
                            <td>{srvc.srvcTo}</td>
                            <td>{srvc.srvcBilledAmt}</td>
                            <td>{srvc.srvcPaidAmt}</td>
                            <td>{srvc.srvcDetail}</td>
                            <td>
                              {srvc.svDescription &&
                                srvc.svDescription.length > 0 &&
                                srvc.svDescription.map((srvc2, index) => (
                                  <p key={index}>{srvc2}</p>
                                ))}
                            </td>
                            <td>{srvc.additionalPayment}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(MedicaidContainer);
