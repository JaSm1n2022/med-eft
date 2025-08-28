/* eslint-disable no-underscore-dangle */

class SortUtil {


  /**
 * @param {String | Date} date -
 * @param {Boolean} withDay -
 * @returns {String} -  Aug 6, 2007
 */
  static formatSortObject(a, b, mode, page) {
    if (page === 'shipmentPage') {
      if (mode === 'shipmentNbr') {
        this._a = a.data.shipmentNbr;
        this._b = b.data.shipmentNbr;

      } else
        if (mode === 'eta') {
          this._a = a.data.etaSortValue ? new Date(a.data.etaSortValue) : '';
          this._b = b.data.etaSortValue ? new Date(b.data.etaSortValue) : '';
        } else if (mode === 'etaSeverityHr') {
          console.log('[a.data.etaSeverityHr]',a.data.etaSeverityHr);
          this._a = parseInt(a.data.etaSeverityHr);
          this._b = parseInt(b.data.etaSeverityHr);
        } else if (mode === 'fclSeverityDay') {
          this._a = parseInt(a.data.fclSeverityDay);
          this._b = parseInt(b.data.fclSeverityDay);
        } else if (mode === 'detentionSeverityDay') {
          this._a = parseInt(a.data.detentionSeverityDay);
          this._b = parseInt(b.data.detentionSeverityDay);
        } else if (mode === 'freeTime') {
          this._a = parseInt(a.data.freeTime);
          this._b = parseInt(b.data.freeTime);  
        } else if (mode === 'fclAvailableDt') {
          this._a = a.data.fclAvailableDt ? new Date(a.data.fclAvailableDt) : '';
          this._b = b.data.fclAvailableDt ? new Date(b.data.fclAvailableDt) : '';
        } else if (mode === 'detentionStartDt') {
          this._a = a.data.contrDetentionDt ? new Date(a.data.contrDetentionDt) : '';
          this._b = b.data.contrDetentionDt ? new Date(b.data.contrDetentionDt) : ''
          
        } else if (mode === 'etd') {
          this._a = a.data.etdSortValue ? new Date(a.data.etaSortValue) : '';
          this._b = b.data.etdSortValue ? new Date(b.data.etaSortValue) : '';
        } else if (mode === 'etdSeverityHr') {
          this._a = parseInt(a.data.etdSeverityHr);
          this._b = parseInt(b.data.etdSeverityHr);
      
        } else if (mode === 'actualDelvDt') {
          this._a = a.data.actualDelvDt ? new Date(a.data.actualDelvDt) : '';
          this._b = b.data.actualDelvDt ? new Date(b.data.actualDelvDt) : '';
        } else if (mode === 'apt') {
          this._a = a.data.actualPickupDt ? new Date(a.data.actualPickupDt) : '';
          this._b = b.data.actualPickupDt ? new Date(b.data.actualPickupDt) : '';

        } else if (mode === 'priority') {
          let aTemp = 0;
          if (a.data.priority === 'High') {
            aTemp = 3;
          } else if (a.data.priority === 'Medium') {
            aTemp = 2;
          } else if (a.data.priority === 'Low') {
            aTemp = 1;
          }

          let bTemp = 0;
          if (b.data.priority === 'High') {
            bTemp = 3;
          } else if (b.data.priority === 'Medium') {
            bTemp = 2;
          } else if (b.data.priority === 'Low') {
            bTemp = 1;
          }

          this._a = aTemp;
          this._b = bTemp;
        }
    } else if (page === 'userPage') {

      if (mode === 'name') {
        this._a = a.name;
        this._b = b.name;
      } else if (mode === 'role') {
        this._a = a.role;
        this._b = b.role;
      } else if (mode === 'account') {
        this._a = a.account;
        this._b = b.account;

      } else if (mode === 'workTitle') {
        this._a = a.workTitle;
        this._b = b.workTitle;
      }
      else if (mode === 'status') {
        this._a = a.active;
        this._b = b.active;
      }
      else if (mode === 'phone') {
        this._a = a.phone;
        this._b = b.phone;
      }
    } else if (page === 'locationPage') {
      if (mode === 'name') {
        this._a = a.name;
        this._b = b.name;
      } else if (mode === 'locType') {
        this._a = a.locType;
        this._b = b.locType;
      } else if (mode === 'address') {
        this._a = a.address;
        this._b = b.address;

      } else if (mode === 'parent') {
        this._a = a.parent;
        this._b = b.parent;
      }
      else if (mode === 'control') {
        this._a = a.control;
        this._b = b.control;
      }
      else if (mode === 'status') {
        this._a = a.status;
        this._b = b.status;
      } else if (mode === 'update') {

        this._a = a.update ? new Date(a.update) : '';
        this._b = b.update ? new Date(b.update) : '';
      }
    }



  }
  static sortByColumn(mode, isAsc, items, page) {
   
    if (!isAsc) {
      items.sort((a, b) => {
        this.formatSortObject(a, b, mode, page);
        if (this._a < this._b) {
          return -1;
        } else if (this._a > this._b) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (isAsc) {
      items.sort((a, b) => {
        this.formatSortObject(a, b, mode, page);
        if (this._a > this._b) {
          return -1;
        } else if (this._a < this._b) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return items;
  }

}

export default SortUtil;
