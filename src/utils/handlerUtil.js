/**
 * Method to filter shipment data based on user's keyword
 * entered from search in shipment input field.
 */
const StorageUtil = require('./storageUtil');
module.exports.searchFilterHandler = (query, resultRows, originalRows) => {
  console.log('my query]', query,resultRows,originalRows);
  if (!query || query === '') {
    resultRows = [...originalRows];
    return resultRows;
  }
  resultRows = originalRows.filter(
    (r) =>
      (r.data && r.data.shipmentNbr && r.data.shipmentNbr.toUpperCase().indexOf(query.toUpperCase()) > -1) ||
      (r.data && r.data.reference && r.data.reference.toUpperCase().indexOf(query.toUpperCase()) > -1) ||
      (r.data  && r.data.status && r.data.status.toUpperCase().indexOf(query.toUpperCase()) > -1) ||
      (r.data  && r.data.consignee && r.data.consignee.name && r.data.consignee.name.toUpperCase().indexOf(query.toUpperCase()) > -1) ||
      (r.data  && r.data.deliveryLoc && r.data.deliveryLoc.length  && r.data.deliveryLoc[0].toUpperCase().indexOf(query.toUpperCase()) > -1) ||
      (r.data  && r.data.deliveryLoc && r.data.deliveryLoc.length > 1 && r.data.deliveryLoc[1].toUpperCase().indexOf(query.toUpperCase()) > -1)
    );
  
  return resultRows;
}
/** 
 * Method to hide all shipments that were set to 
 * true
 * 
*/

module.exports.hideAllHandler = (resultRows) => {
  const ids = [];
  if (resultRows && Object.keys(resultRows).length) {
    for (let i = 0; i < Object.keys(resultRows).length; i++) {
      if (resultRows[i].isChecked) {
        ids.push(resultRows[i].id);
        resultRows[i].hide = 'none';

      }
    }
  }
  return resultRows;
}
/**
 * Setup shipments data based on view category pickup or delivery
 */
module.exports.dataInitViewHandler = (DELIVERY_DEFAULT_VIEW, PICKUP_DEFAULT_VIEW, viewMe ) => {

  let resp = undefined;
  let viewProfile = StorageUtil.getColumnsHeaderProfile();
  const viewbtn = document.getElementById('view_switch');
  if (viewbtn) {
    if (viewProfile === null) {
      viewbtn.checked = true;
      document.querySelector('.delivery-view-label').classList.add('active');
      document.querySelector('.pickup-view-label').classList.remove('active');
      resp = { columnOrder: DELIVERY_DEFAULT_VIEW, viewMe: !viewMe, currentView: 'Delivery' };
      viewProfile = {
        current: 'Delivery',
        delivery : {
          colOrder : DELIVERY_DEFAULT_VIEW,
          isSortAsc : true,
          isViewable : true,
          sort: 'shipmentNbr'
        },
        pickup : {
          colOrder : PICKUP_DEFAULT_VIEW,
          isSortAsc : true,
          isViewable : true,
          sort: 'shipmentNbr'
        }
      };
      StorageUtil.setLocalStorage('columnsHeaderProfile', viewProfile);
		
    } else if (viewProfile.current === 'Pickup') {
      viewbtn.checked = false;
      document.querySelector('.pickup-view-label').classList.add('active');
      document.querySelector('.delivery-view-label').classList.remove('active');

      resp = { columnOrder: viewProfile.pickup.colOrder, viewMe: !viewMe, currentView: 'Pickup' };
    } else if (viewProfile.current === 'Delivery') {
      viewbtn.checked = true;
      document.querySelector('.delivery-view-label').classList.add('active');
      document.querySelector('.pickup-view-label').classList.remove('active');

      resp = { columnOrder: viewProfile.delivery.colOrder, viewMe: !viewMe, currentView: 'Delivery' };

    } else {
      viewbtn.checked = true;
      document.querySelector('.delivery-view-label').classList.add('active');
      document.querySelector('.pickup-view-label').classList.remove('active');
      resp = { columnOrder: DELIVERY_DEFAULT_VIEW, viewMe: !viewMe, currentView: 'Delivery' };
    }
  }
  console.log('[responding]',resp);
  return resp;
}
/**
 * Method to save shipment view either pickup or delivery
 */
module.exports.saveColumnOrderHandler = (v, viewMe) => {
  console.log('[Handler Util Save View Handler]', v, viewMe);
  var viewbtn = document.getElementById('view_switch');
  const currentViewProfile = StorageUtil.getColumnsHeaderProfile();
  let newViewProfile = {
    current: '',
    delivery: {
      colOrder: [],
      sort: 'shipmentNbr',
      isSortAsc: true,
      isViewable: false
    },
    pickup: {
      colOrder: [],
      sort: 'shipmentNbr',
      isSortAsc: true,
      isViewable: false
    }
  };
  if (currentViewProfile !== null) {
    newViewProfile = currentViewProfile;
  }
  if (viewbtn.checked) {// delivery view
    newViewProfile.current = 'Delivery';
    newViewProfile.delivery.colOrder = v;
    newViewProfile.delivery.isViewable = true;

  } else {
    newViewProfile.current = 'Pickup';
    newViewProfile.pickup.colOrder = v;
    newViewProfile.pickup.isViewable = true;


  }
  StorageUtil.setLocalStorage('columnsHeaderProfile', newViewProfile);
  return { columnOrder: v, viewMe: !viewMe, currentView: newViewProfile.current };

}

module.exports.switchViewHandler = (DELIVERY_DEFAULT_VIEW, PICKUP_DEFAULT_VIEW) => {
  const viewProfile = StorageUtil.getColumnsHeaderProfile();
  let vw = undefined;
  var viewbtn = document.getElementById('view_switch');
  if (viewbtn.checked) {
    if (viewProfile === null) {
      vw = DELIVERY_DEFAULT_VIEW;
    } else if (viewProfile.delivery && viewProfile.delivery.isViewable) {
      vw = viewProfile.delivery.colOrder;
    } else {
      vw = DELIVERY_DEFAULT_VIEW;
    }
    document.querySelector('.delivery-view-label').classList.add('active');
    document.querySelector('.pickup-view-label').classList.remove('active');

  } else {
    if (viewProfile === null) {
      vw = PICKUP_DEFAULT_VIEW;
    } else if (viewProfile.pickup && viewProfile.pickup.isViewable) {
      vw = viewProfile.pickup.colOrder;
    } else {
      vw = PICKUP_DEFAULT_VIEW;
    }


    document.querySelector('.pickup-view-label').classList.add('active');
    document.querySelector('.delivery-view-label').classList.remove('active');
  }
  return vw;
}

module.exports.expectedColumnHandler = (columnOrder, col, isExpected) => {
 
  if (isExpected) {
    columnOrder.push(col);
  } else { // splice
    const i = columnOrder.indexOf(col);
    columnOrder.splice(i,1);
  }
  return columnOrder;

}
