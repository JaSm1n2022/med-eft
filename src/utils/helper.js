/* eslint-disable no-underscore-dangle */
import {
  ACTION_STATUSES,
  NO_IMAGE_AVAILABLE,
  NO_AVATAR_AVAILABLE,
  NO_AVATAR_AVAILABLE_2,
} from "./constants";
import StorageUtil from "./storageUtil";
import { awsConfig } from "../config";

import moment from "moment";
import momenttz from "moment-timezone";
class Helper {
  /**
   * @param {String | Date} date -
   * @param {Boolean} withDay -
   * @returns {String} -  Aug 6, 2007
   */
  static buildDate(date, withDay = true) {
    let _date;
    if (date instanceof Date) _date = date;
    if (typeof date === "string") _date = new Date(date);
    if (!date)
      throw new Error(
        'The parameter "dob" should be a string or an instance of Date'
      );

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[_date.getMonth()]}${
      withDay ? ` ${_date.getDate()}, ` : " "
    }${_date.getFullYear()}`;
  }
  static randomBg() {
    const f = Math.floor(Math.random() * Math.floor(3));
    const bgs = [
      "avatar-text-sm bg-info",
      "avatar-text-sm bg-primary",
      "avatar-text-sm bg-warning",
    ];
    return bgs[f];
  }
  static formatShipmentDataBasedOnTableDataJson(item) {
    if (
      item.lat === "NAN" ||
      1.0 * item.lat === NaN ||
      1.0 * item.lng === NaN
    ) {
      item.lat = item.cnseLat || item.shipperLat;
      item.lng = item.cnseLng || item.shipperLng;
    }

    if (item.statusEtaColor === "green") {
      item.statusEtaColor = "#92d050";
      item.statusEtaClassName = "eta success";
    } else if (item.statusEtaColor === "red") {
      item.statusEtaColor = "#ff0000";
      item.statusEtaClassName = "eta danger";
    } else if (item.statusEtaColor === "orange") {
      item.statusEtaClassName = "eta warning";
      item.statusEtaColor = "#ffc000";
    }

    if (item.statusEtdColor === "green") {
      item.statusEtdColor = "#92d050";
      item.statusEtdClassName = "eta success";
    } else if (item.statusEtdColor === "red") {
      item.statusEtdColor = "#ff0000";
      item.statusEtdClassName = "eta danger";
    } else if (item.statusEtdColor === "orange") {
      item.statusEtdClassName = "eta warning";
      item.statusEtdColor = "#ffc000";
    }

    if (item.statusFclColor === "green") {
      item.statusFclColor = "#92d050";
      item.statusFclClassName = "eta success";
    } else if (item.statusFclColor === "red") {
      item.statusFclColor = "#ff0000";
      item.statusFclClassName = "eta danger";
    } else if (item.statusFclColor === "orange") {
      item.statusFclClassName = "eta warning";
      item.statusFclColor = "#ffc000";
    }

    if (item.statusDetentionColor === "green") {
      item.statusDetentionColor = "#92d050";
      item.statusDetentionClassName = "eta success";
    } else if (item.statusDetentionColor === "red") {
      item.statusDetentionColor = "#ff0000";
      item.statusDetentionClassName = "eta danger";
    } else if (item.statusDetentionColor === "orange") {
      item.statusDetentionClassName = "eta warning";
      item.statusDetentionColor = "#ffc000";
    }

    console.log("start format]");
    const fmt = {
      id: item.id,
      lat: item.lat,
      lng: item.lng,
      hide: item.hide || false,
      isChecked: item.isChecked,
      statusEtdColor: item.statusEtdColor,
      statusEtaColor: item.statusEtaColor,
      data: {
        isDelivered: item.isDelivered,
        isPickedUp: item.isPickedUp,
        isPickupEditAllowed: item.isPickupEditAllowed,
        isDeliverEditAllowed: item.isDeliverEditAllowed,
        shipperLat: item.shipperLat,
        cnseAddress: item.cnseAddress,
        shipperAddress: item.shipperAddress,
        shipperLng: item.shipperLng,
        cnseLat: item.cnseLat,
        cnseLng: item.cnseLng,
        shipperLocation: item.shipperLocation,
        statusEtdClassName: item.statusEtdClassName,
        statusEtaClassName: item.statusEtaClassName,
        statusEtdAlertLevel: item.statusEtdAlertLevel,
        statusEtaAlertLevel: item.statusEtaAlertLevel,
        statusFclColor: item.statusFclColor,
        fclSeverityDay: item.fclSeverityDay,
        statusFclAlertLevel: item.statusFclAlertLevel,
        statusFclClassName: item.statusFclClassName,
        statusDetentionColor: item.statusDetentionColor,
        detentionSeverityDay: item.detentionSeverityDay,
        statusDetentionAlertLevel: item.statusDetentionAlertLevel,
        statusDetentionClassName: item.statusDetentionClassName,
        oceanCarrierName: item.oceanCarrierName,
        equipmentNbr: item.equipmentNbr,
        transportMode: item.transportMode,
        portEta: item.portEta,
        portAta: item.portAta,
        portAvailable: item.portAvailable,
        railEta: item.railEta,
        railAta: item.railAta,
        railAvailable: item.railAvailable,
        fclAvailableDt: item.fclAvailableDt,
        contrDetentionDt: item.carrierDetentionDt,

        shipmentNbr: item.shipmentNbr,
        importReleaseNumber: item.importReleaseNumber,
        etaSeverityHr: item.etaSeverityHr,
        etdSeverityHr: item.etdSeverityHr,
        reference: item.reference,
        status: item.status,
        deliveryLoc: [item.consignee, item.deliveryLocation],

        etaSortValue: item.etaFullDtFrom,
        etdSortValue: item.etdFullDtFrom,

        eta: {
          dateTime: {
            from: {
              date: item.etaDtFrom,
              time: item.etaTmFrom,
            },
            to: {
              date: item.etaDtTo,
              time: item.etaTmTo,
            },
          },
          info: {
            updateOn: "NA",
            updateBy: "NA",
            updateFrom: "NA",
            prevETD: "NA",
          },
          message: item.isDelivered
            ? "This field is not editable by you or has been delivered already. Please contact your administrator if this does not seem correct"
            : "",
        },

        doorAssign: [1, 2, 3, 4, 5, 6],
        priorities: ["High", "Medium", "Low"],
        actualDelTime: item.actualDelvDt,
        actualDelvDt: item.actualDelvDt,
        pickupLoc: [item.shipper, item.shipperLocation],
        etd: {
          dateTime: {
            from: {
              date: item.etdDtFrom,
              time: item.etdTmFrom,
            },
            to: {
              date: item.etdDtTo,
              time: item.etdTmTo,
            },
          },
          info: {
            updateOn: "NA",
            updateBy: "NA",
            updateFrom: "NA",
            prevETD: "NA",
          },
          message: item.isPickedUp
            ? "This field is not editable by you or has been delivered already. Please contact your administrator if this does not seem correct"
            : "",
        },
        // "schDeliveryTime": item.schedDelvDt ? [item.schedDelvDt, item.schedDelvTm] : '',
        schDeliveryTime: {
          dateTime: {
            from: {
              date: item.schedDelvDtFrom,
              time: item.schedDelvTmFrom,
            },
            to: {
              date: item.schedDelvDtTo,
              time: item.schedDelvTmTo,
            },
          },
          info: {
            updateOn: "NA",
            updateBy: "NA",
            updateFrom: "NA",
            prevETD: "NA",
          },
          message:
            !item.isDeliverEditAllowed || item.isDelivered
              ? "This field is not editable by you or has been delivered already. Please contact your administrator if this does not seem correct"
              : "",
        },
        actualPickupDt: item.actualPickupDt,
        actPickTime: item.actualPickupDt
          ? [
              moment(new Date(item.actualPickupDt)).format("MM/DD/YY"),
              moment(new Date(item.actualPickupDt)).format("HH:mm"),
            ]
          : "",
        //"schPickupTime": item.schedPickupDt ? [item.schedPickupDt, item.schedPickupTm] : '',
        schPickupTime: {
          dateTime: {
            from: {
              date: item.schedPickupDtFrom,
              time: item.schedPickupTmFrom,
            },
            to: {
              date: item.schedPickupDtTo,
              time: item.schedPickupTmTo,
            },
          },
          info: {
            updateOn: "NA",
            updateBy: "NA",
            updateFrom: "NA",
            prevETD: "NA",
          },
          message:
            !item.isPickupEditAllowed || item.isPickedUp
              ? "This field is not editable by you or has been picked up already. Please contact your administrator if this does not seem correct"
              : "",
        },
        driver: {
          name:
            item.driverInfo && item.driverInfo.name
              ? item.driverInfo.name
              : "TBD",
          companyAlias:
            item.driverInfo &&
            item.driverInfo.name &&
            item.driverInfo.company &&
            item.driverInfo.company.name
              ? item.driverInfo.company.name
              : "TBD", //get driver company
          info: {
            email:
              item.driverInfo && item.driverInfo.email
                ? item.driverInfo.email
                : "",
            phone:
              item.driverInfo && item.driverInfo.phone
                ? item.driverInfo.phone
                : "",
            company:
              item.driverInfo &&
              item.driverInfo.name &&
              item.driverInfo.company &&
              item.driverInfo.company.name
                ? item.driverInfo.company.name
                : "",
            address:
              item.driverInfo &&
              item.driverInfo.name &&
              item.driverInfo.company &&
              item.driverInfo.company.address
                ? item.driverInfo.company.address
                : "",
          },
          message: item.isDelivered
            ? "This field is not editable by you or has been delivered already. Please contact your administrator if this does not seem correct"
            : "",
        },
        carrierName: item.carrierName,
        overage: "", // ?
        shortage: "", // ?
        damage: "", // ?
        actualDelDateTime: {
          dateTime: {
            from: {
              date: item.actualDelvDt
                ? moment(new Date(item.actualDelvDt)).format("MM/DD/YY")
                : "",
              time: item.actualDelvDt
                ? moment(new Date(item.actualDelvDt)).format("MM/DD/YY")
                : "",
            },
            to: {
              date: item.actualDelvDt
                ? moment(new Date(item.actualDelvDt)).format("MM/DD/YY")
                : "",
              time: item.actualDelvDt
                ? moment(new Date(item.actualDelvDt)).format("MM/DD/YY")
                : "",
            },
          },
          info: {
            /** cannot be provided */
            updateOn: "", //"1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        actualPickDateTime: {
          dateTime: {
            from: {
              date: item.actualPickupDt
                ? moment(new Date(item.actualPickupDt)).format("MM/DD/YY")
                : "",
              time: item.actualPickupDt
                ? moment(new Date(item.actualPickupDt)).format("MM/DD/YY")
                : "",
            },
            to: {
              date: item.actualPickupDt
                ? moment(new Date(item.actualPickupDt)).format("MM/DD/YY")
                : "",
              time: item.actualPickupDt
                ? moment(new Date(item.actualPickupDt)).format("MM/DD/YY")
                : "",
            },
          },
          info: {
            /* ? */
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        reqDelDateTime: {
          dateTime: {
            from: {
              date: item.schedDelvDt || "",
              time: item.schDeliveryTime || "",
            },
            to: {
              date: item.schedDelvDt || "",
              time: item.schDeliveryTime || "",
            },
          },
          info: {
            /**  */
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        reqPickDateTime: {
          dateTime: {
            from: {
              date: item.schedPickupDt || "",
              time: item.schedPickupTm || "",
            },
            to: {
              date: item.schedPickupDt || "",
              time: item.schedPickupTm || "",
            },
          },
          info: {
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        estDelDateTime: {
          dateTime: {
            from: {
              date: "", //5/13/2019",
              time: "", //11:30 AM"
            },
            to: {
              date: "", //7/13/2019",
              time: "", //12:58 AM"
            },
          },
          info: {
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        estPickDateTime: {
          dateTime: {
            from: {
              date: "", //5/13/2019",
              time: "", //11:30 AM"
            },
            to: {
              date: "", //7/13/2019",
              time: "", //12:58 AM"
            },
          },
          info: {
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        targetDelDateTime: {
          dateTime: {
            from: {
              date: "", //5/13/2019",
              time: "", //11:30 AM"
            },
            to: {
              date: "", //7/13/2019",
              time: "", //12:58 AM"
            },
          },
          info: {
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message:
            "This field is not editable by you. Please contact your administrator if this does not seem correct",
        },
        recordLostDateTime: {
          dateTime: {
            from: {
              date: "", //5/13/2019",
              time: "", //11:30 AM"
            },
            to: {
              date: "", //7/13/2019",
              time: "", //128 AM"
            },
          },
          info: {
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        actArrivalPortDate: {
          dateTime: {
            from: {
              date: "", //10/13/2019"
            },
            to: {
              date: "", //17/13/2019"
            },
          },
          info: {
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        actArrivalRailRampPortDate: {
          dateTime: {
            from: {
              date: "", //5/13/2019"
            },
            to: {
              date: "", //7/13/2019"
            },
          },
          info: {
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        containerAvlDate: {
          dateTime: {
            from: {
              date: "", //5/13/2019"
            },
            to: {
              date: "", //7/13/2019"
            },
          },
          info: {
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        estArrivalPortDate: {
          dateTime: {
            from: {
              date: "", //5/13/2019"
            },
            to: {
              date: "", //7/13/2019"
            },
          },
          info: {
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        estArrivalPortRailDate: {
          dateTime: {
            from: {
              date: "", //5/13/2019"
            },
            to: {
              date: "", //7/13/2019"
            },
          },
          info: {
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        lostFreeDayTerminal: {
          dateTime: {
            from: {
              date: "", //5/13/2019"
            },
            to: {
              date: "", //7/13/2019"
            },
          },
          info: {
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        contDetentionStartDate: {
          dateTime: {
            from: {
              date: "", //5/13/2019",
              time: "", //02002"
            },
            to: {
              date: "", //7/13/2019"
            },
          },
          info: {
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        port: {
          name: "", //ASML  Newtown",
          info: {
            person: "", //Connie Rice",
            email: "", //crice@asml.com",
            personPhone: "", //(908) 555-5555",
            company: "", //ASML NEWTOWN (WAREHOUSE)",
            address: "", //77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //(908) 555-5555",
            updateOn: "", //1/9/2021",
            updateBy: "", //Steven Brown",
            updateFrom: "", //Advanced Transportation",
            prevETD: "", //1/8/2021 OS:OO PM"
          },
          message: "", //This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        railRamp: {
          name: "", //ASML  Newtown",
          info: {
            person: "", //Connie Rice",
            email: "", //crice@asml.com",
            personPhone: "", //(908) 555-5555",
            company: "", //ASML NEWTOWN (WAREHOUSE)",
            address: "", //77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        yard: {
          name: "", //"ASML  Newtown",
          info: {
            person: "", //"Connie Rice",
            email: "", //"crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", //"ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        warehouse: {
          name: "", //"ASML  Newtown",
          info: {
            person: "", // "Connie Rice",
            email: "", //"crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", // "ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        factory: {
          name: "", //"ASML  Newtown",
          info: {
            person: "", //"Connie Rice",
            email: "", //"crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", //"ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        pickupLocation: {
          name: item.pickupLocation.name, //"ASML  Newtown",
          info: {
            person: item.pickupLocation.info.person, //"Connie Rice",
            email: item.pickupLocation.info.email, //"crice@asml.com",
            personPhone: item.pickupLocation.info.personPhone, //"(908) 555-5555",
            company: item.pickupLocation.info.company, //"ASML NEWTOWN (WAREHOUSE)",
            address: item.pickupLocation.info.address, //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: item.pickupLocation.info.phone, //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message:
            !item.isPickupEditAllowed || item.isPickedUp
              ? "This field is not editable by you or has been picked up already. Please contact your administrator if this does not seem correct"
              : "",
        },
        delLocation: {
          name: item.delLocation.name, //"ASML  Newtown",
          info: {
            person: item.delLocation.info.person, //"Connie Rice",
            email: item.delLocation.info.email, //"crice@asml.com",
            personPhone: item.delLocation.info.personPhone, //"(908) 555-5555",
            company: item.delLocation.info.company, //"ASML NEWTOWN (WAREHOUSE)",
            address: item.delLocation.info.address, //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: item.delLocation.info.phone, //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message:
            !item.isDeliverEditAllowed || item.isDelivered
              ? "This field is not editable by you or has been delivered already. Please contact your administrator if this does not seem correct"
              : "",
        },
        returnLocation: {
          name: "", //"ASML  Newtown",
          info: {
            person: "", //"Connie Rice",
            email: "", //"crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", //"ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        locationOne: {
          name: "", //"ASML  Newtown",
          info: {
            person: "", //"Connie Rice",
            email: "", //"crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", //"ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        locationTwo: {
          name: "", //"ASML  Newtown",
          info: {
            person: "", //"Connie Rice",
            email: "", //"crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", //"ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        locationThree: {
          name: "", //"ASML  Newtown",
          info: {
            person: "", //"Connie Rice",
            email: "", //"crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", //"ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        locationFour: {
          name: "", //"ASML  Newtown",
          info: {
            person: "", //"Connie Rice",
            email: "", //"crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", //"ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        billToParty: {
          name: "", //"Splendid Courier",
          info: {
            person: "", //"Connie Rice",
            email: "", //"crice@asml.com",
            personPhone: "", // "(908) 555-5555",
            company: "", //"ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        motorCarrier: {
          name: "", //"Splendid Courier",
          info: {
            person: "", //"Connie Rice",
            email: "", //"crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", //ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        oceanCarrier: {
          name: item.oceanCarrierName,
          info: {
            person: "", //"Connie Rice",
            email: "", //"crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", //"ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message: " ", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        consignee: {
          name: item.consignee, //"Splendid Courier",
          info: {
            person: "", //"Connie Rice",
            email: "", //"crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", //"ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        shipper: {
          name: item.shipper, //"Splendid Courier",
          info: {
            person: "", //"Connie Rice",
            email: "", //"crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", //"ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555",
            updateOn: "", //1/9/2021",
            updateBy: "", // "Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", // "1/8/2021 OS:OO PM"
          },
          message: "", // "This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        logisticsProvider: {
          name: "", //"Splendid Courier",
          info: {
            person: "", //"Connie Rice",
            email: "", // "crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", //"ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555",
            updateOn: "", //"1/9/2021",
            updateBy: "", //"Steven Brown",
            updateFrom: "", //"Advanced Transportation",
            prevETD: "", //"1/8/2021 OS:OO PM"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },

        receiver: {
          name: "", //"Connie Rice",
          info: {
            email: "", //"crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", //"ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
        alertee: {
          name: "", //"Connie Rice",
          info: {
            email: "", //"crice@asml.com",
            personPhone: "", //"(908) 555-5555",
            company: "", //"ASML NEWTOWN (WAREHOUSE)",
            address: "", //"77 DANBURY RA WILTON, CT 06897 USA",
            phone: "", //"(908) 555-5555"
          },
          message: "", //"This field is not editable by you. Please contact your administrator if this does not seem correct"
        },
      },
    };

    console.log("return format]", fmt);
    return fmt;
  }
  static createEventDt() {
    //"eventDt": ["isLocal": true, "tz": ["code": "America/Los_Angeles", "offset": "-07:00", "name": "PDT"], "date": "2019-09-23T20:38:00.825Z"]
    //m.tz.quess is not working here but in component is good

    let eventDt = {
      isLocal: true,
      tz: {
        code: moment.tz.guess(),
        offset: momenttz.tz(moment.tz.guess()).format("Z"),
        name: momenttz.tz(moment.tz.guess()).format("z"),
      },
      date: moment(new Date()).format("YYYY-MM-DDTHH:mm") + "Z",
    };

    return eventDt;
  }
  static formatSimpleDateInUtc(mode, value) {
    const dt = value ? new Date(value) : new Date();
    if (mode === "from") {
      return moment(dt).format("YYYY-MM-DD") + "T00:00:00.00Z";
    } else if (mode === "to") {
      return moment(dt).format("YYYY-MM-DD") + "T23:59:59.00Z";
    }
  }
  static formatDateRangeByCriteria(selectedMenu) {
    let date = moment();
    let date1 = null;
    let date2 = null;
    switch (selectedMenu) {
      case "Today":
      case "today":
        date1 = date.format("L");
        date2 = date1;
        break;
      case "Yesterday":
      case "yesterday":
        date1 = date.subtract(1, "days").format("L");
        date2 = date1;
        break;
      case "This week":
      case "thisWeek":
        date1 = date.startOf("week").format("L");
        date2 = date.endOf("week").format("L");
        break;
      case "Last week":
      case "lastWeek":
        date1 = date.clone().subtract(7, "days").format("L");
        date2 = date.format("L");
        break;
      case "Last month":
      case "lastMonth":
        date1 = date.clone().subtract(31, "days").format("L");
        date2 = date.format("L");
        break;
      case "This month":
      case "thisMonth":
        date1 = date.startOf("month").format("L");
        date2 = date.endOf("month").format("L");
        break;
      case "Last 90 days":
      case "last90Days":
        date1 = date.clone().subtract(90, "days").format("L");
        date2 = date.format("L");
        break;
      case "Last 30 days":
      case "last30Days":
        date1 = date.clone().subtract(30, "days").format("L");
        date2 = date.format("L");
        break;
      case "Last 7 days":
      case "last7Days":
        date1 = date.clone().subtract(7, "days").format("L");
        date2 = date.format("L");
        break;
      case "Next 90 days":
      case "next90Days":
        date2 = date.clone().add(90, "days").format("L");
        date1 = date.format("L");
        break;
      case "Next 30 days":
      case "next30Days":
        date2 = date.clone().add(30, "days").format("L");
        date1 = date.format("L");
        break;
      case "Next 7 days":
      case "next7Days":
        date2 = date.clone().add(7, "days").format("L");
        date1 = date.format("L");
        break;
      case "custom":
        // do nothing
        // for custom, check onClickApplyDate()
        break;
      default:
        break;
    }

    return { from: date1, to: date2 };
  }
  static dateCriteriaSelection(value) {
    switch (value) {
      case "today":
        return "Today";
        break;
      case "yesterday":
        return "Yesterday";
        break;
      case "thisWeek":
        return "This Week";
        break;
      case "lastWeek":
        return "Last Week";
        break;
      case "lastMonth":
        return "Last Month";
        break;
      case "thisMonth":
        return "This Month";
        break;
      case "last30Days":
        return "Last 30 Days";
        break;
      case "last7Days":
        return "Last 7 Days";
        break;
      case "custom":
        // do nothing
        // for custom, check onClickApplyDate()
        return "";
        break;
      default:
        break;
    }

    return value;
  }

  static isActionStatusSucceed(status) {
    return status === ACTION_STATUSES.SUCCEED;
  }

  static isActionStatusPending(status) {
    return status === ACTION_STATUSES.PENDING;
  }

  static formatAddress(address, city, state, postal, country) {
    let addr = "";
    if (address) {
      addr += address ? address + " " : "";
    }

    if (city) {
      addr += city ? city + " " : "";
    }

    if (state) {
      addr += state ? state + " " : "";
    }

    if (postal) {
      addr += postal ? postal + " " : "";
    }

    if (country) {
      addr += country ? country : "";
    }
    return addr.trim();
  }
  static isActionStatusFailed(status) {
    return status === ACTION_STATUSES.FAILED;
  }
  static isColumnFieldExpected(cols, field) {
    if (cols.filter((c) => c === field).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  static findStorageKey(property) {
    if (property === "driver" || property === "persons") {
      return "person";
    } else if (
      property === "deliverLoc" ||
      property === "pickupLoc" ||
      property === "locations"
    ) {
      return "location";
    } else {
      return property;
    }
  }

  static reportExcelFormat(mode, data) {
    let results = [];
    if (mode === "Service Summary") {
      for (const rec of data) {
        const cells = [];

        cells.push(JSON.stringify({ Service: rec.service }));
        cells.push(JSON.stringify({ Count: rec.cnt }));
        let jsonObj = "";
        cells.forEach((c) => {
          for (let i = 0; i < c.length; i++) {
            if (i !== 0 && i !== c.length - 1) {
              jsonObj += c[i];
            }
          }
          jsonObj += ",";
        });
        jsonObj = JSON.parse(`{${jsonObj.substring(0, jsonObj.length - 1)}}`);
        results.push(jsonObj);
      }
    } else if (mode === "Medicare Details") {
      for (const rec of data) {
        const cells = [];

        cells.push(JSON.stringify({ Name: rec.patientName }));
        cells.push(JSON.stringify({ "Service From": rec.serviceFrom }));
        cells.push(JSON.stringify({ "Service To": rec.serviceTo }));
        cells.push(JSON.stringify({ "Service Code": rec.serviceCode }));
        cells.push(JSON.stringify({ Modifier: rec.modifier || " " }));
        cells.push(JSON.stringify({ "Amount Billed": rec.amtBilled || 0 }));
        cells.push(JSON.stringify({ "Amount Allowed": rec.amtAllowed || 0 }));
        cells.push(JSON.stringify({ "Amount Deduct": rec.amtDeduct || 0 }));
        cells.push(JSON.stringify({ "Co-Insurance": rec.coinsurance || 0 }));
        cells.push(JSON.stringify({ NET: rec.net || 0 }));

        cells.push(JSON.stringify({ REM: rec.rem }));
        cells.push(
          JSON.stringify({
            "REM Desc": rec.remDesc ? rec.remDesc.replace(/,/g, " ") : "",
          })
        );

        // convert it to json
        let jsonObj = "";
        cells.forEach((c) => {
          for (let i = 0; i < c.length; i++) {
            if (i !== 0 && i !== c.length - 1) {
              jsonObj += c[i];
            }
          }
          jsonObj += ",";
        });
        jsonObj = JSON.parse(`{${jsonObj.substring(0, jsonObj.length - 1)}}`);
        results.push(jsonObj);
      }
    } else if (mode === "Medicare Summary") {
      const cells = [];
      cells.push(
        JSON.stringify({ "Total number of claims": data.numberOfClaims })
      );

      cells.push(JSON.stringify({ "Billed Amount": data.billedAmt }));
      cells.push(JSON.stringify({ "Allowed Amount": data.allowedAmt }));
      cells.push(JSON.stringify({ "Deduct Amount": data.deductAmt }));
      cells.push(JSON.stringify({ "Coinsurance Amount": data.coinsAmt }));
      cells.push(JSON.stringify({ "Check Amount": data.checkAmt }));
      // convert it to json
      let jsonObj = "";

      cells.forEach((c) => {
        for (let i = 0; i < c.length; i++) {
          if (i !== 0 && i !== c.length - 1) {
            jsonObj += c[i];
          }
        }
        jsonObj += ",";
      });
      jsonObj = JSON.parse(`{${jsonObj.substring(0, jsonObj.length - 1)}}`);
      results.push(jsonObj);
    } else if (mode === "Denied" || mode === "Paid") {
      for (const rec of data) {
        const cells = [];
        cells.push(JSON.stringify({ NAME: rec.samename || rec.name }));
        cells.push(JSON.stringify({ "PROC CD": rec.srvcCode }));
        cells.push(JSON.stringify({ MODIFIER: rec.srvcModifierCd }));
        cells.push(JSON.stringify({ "SERVICE DESCRIPTION": rec.srvcDesc }));
        cells.push(JSON.stringify({ FROM: rec.srvcFrom }));
        cells.push(JSON.stringify({ TO: rec.srvcTo }));
        cells.push(
          JSON.stringify({
            "BILLED AMT": rec.srvcBilledAmt
              ? parseFloat(rec.srvcBilledAmt.trim().toString())
              : 0.0,
          })
        );
        if (rec.srvcPaidAmt) {
          cells.push(
            JSON.stringify({
              "PAID AMT": rec.srvcPaidAmt
                ? parseFloat(rec.srvcPaidAmt.trim().toString())
                : 0.0,
            })
          );
        }
        cells.push(JSON.stringify({ "DETAIL EOB": rec.srvcDetail }));
        if (rec.svDescription && rec.svDescription.length > 0) {
          let description = "";
          for (const d of rec.svDescription) {
            description += d + "/";
          }
          description = description.substring(0, description.length - 1);
          cells.push(JSON.stringify({ "DETAIL DESCRIPTION": description }));
        } else {
          cells.push(JSON.stringify({ "DETAIL DESCRIPTION": "" }));
        }
        if (rec.additionalPayment) {
          cells.push(JSON.stringify({ REM: rec.additionalPayment }));
        }

        // convert it to json
        let jsonObj = "";

        cells.forEach((c) => {
          for (let i = 0; i < c.length; i++) {
            if (i !== 0 && i !== c.length - 1) {
              jsonObj += c[i];
            }
          }
          jsonObj += ",";
        });
        jsonObj = JSON.parse(`{${jsonObj.substring(0, jsonObj.length - 1)}}`);
        results.push(jsonObj);
      }
    } else if (mode === "Services") {
      for (const rec of data) {
        const cells = [];
        cells.push(JSON.stringify({ "Service Code": rec.name }));
        cells.push(
          JSON.stringify({ "Medicare Paid Count": rec.medicarePaid || 0 })
        );
        cells.push(
          JSON.stringify({ "Medicaid Paid Count": rec.medicaidPaid || 0 })
        );
        cells.push(
          JSON.stringify({ "Medicare Denied Count": rec.medicareDenied || 0 })
        );
        cells.push(
          JSON.stringify({ "Medicaid Denied Count": rec.medicaidDenied || 0 })
        );
        cells.push(JSON.stringify({ Total: rec.total || 0 }));

        cells.push(JSON.stringify({ Description: rec.desc }));
        // convert it to json
        let jsonObj = "";
        cells.forEach((c) => {
          for (let i = 0; i < c.length; i++) {
            if (i !== 0 && i !== c.length - 1) {
              jsonObj += c[i];
            }
          }
          jsonObj += ",";
        });
        jsonObj = JSON.parse(`{${jsonObj.substring(0, jsonObj.length - 1)}}`);
        results.push(jsonObj);
      }
    }
    return results;
  }

  /**
   * @param {String | Null | Undefined | Boolean<false>} path - path of the image
   * @param {String} defaultPath - default path to render
   * @param {Object} options - options for aws image processing options
   * @returns {String | Null} - image's acual url or null
   */
  static buildS3UrlFromPath({
    // eslint-disable-next-line no-unused-vars
    path,
    type,
    options = {},
  }: {
    path: ?string,
    type: string,
    options?: Object,
  }): string {
    if (!path) {
      if (type === "avatar-1") {
        return NO_AVATAR_AVAILABLE;
      }
      if (type === "avatar-2") {
        return NO_AVATAR_AVAILABLE_2;
      }
      return NO_IMAGE_AVAILABLE;
    }

    return `${awsConfig.S3_URL_PREFIX}${path}`;
  }

  static formatAssociates(mode, data) {
    const storageKey = this.findStorageKey(mode);
    const recentlyUsedStorage =
      StorageUtil.getUsedProperty(`${"used"}-${storageKey}`) || [];
    const arr = [];
    let recentlyIdTag = "persons";
    let recentlyNameTag = "Recently Used Persons";
    let currentIdTag = "otherPersons";
    let currentNametag = "Others Persons";
    let category = "person";

    if (data && data.length && mode === "locations") {
      recentlyIdTag = "locations";
      recentlyNameTag = "Recently Used Locations";
      currentIdTag = "otherLoc";
      currentNametag = "Others Locations";
      category = "location";
    }
    const recentlyInfo = {
      id: recentlyIdTag,
      name: recentlyNameTag,
      entries: [],
    };
    const currentInfo = {
      id: currentIdTag,
      name: currentNametag,
      entries: [],
    };
    if (recentlyUsedStorage && recentlyUsedStorage.length) {
      recentlyUsedStorage.forEach((f, i) => {
        const getLatestInfo = data.filter(
          (u) => f && u.name.toLowerCase() === f.toLowerCase()
        );
        if (getLatestInfo && getLatestInfo.length) {
          const [first] = getLatestInfo;
          recentlyInfo.entries.push({
            id: first._id.toString(),
            key: `${i}-${first._id}`,
            name: first.name,
            info: first.companyName || "",
            details: first,
            category: category,
          });
        }
      });
    }
    if (recentlyInfo && recentlyInfo.entries.length > 3) {
      //maintain 3 recent info
      const cntRemaining = recentlyInfo.entries.length - 3;
      recentlyInfo.entries.splice(3, cntRemaining);
    }
    data.forEach((item, i) => {
      if (
        !recentlyInfo.entries.filter(
          (p) => item.name && p.id.toString() === item._id.toString()
        ).length > 0
      ) {
        currentInfo.entries.push({
          id: item._id.toString(),
          key: `${i}-${item._id}`,
          name: item.name,
          info: item.companyName || "",
          details: item,
          category: category,
        });
      }
    });
    arr.push(recentlyInfo);
    arr.push(currentInfo);
    return arr;
  }
  static returnUtcFormatDate(dt, tm, tz) {
    var date = moment(dt, "YYYY-MM-DD", true);
    if (!date.isValid()) {
      dt = moment(dt, "DD/MM/YYYY").format("YYYY-MM-DD");
    }
    if (tz === "Local") {
      const newDt = dt + "T" + tm + "Z";
      return newDt;
    } else {
      const newDt = dt + " " + tm;
      return moment.tz(newDt, tz).utc().format();
    }
  }
}

export default Helper;
