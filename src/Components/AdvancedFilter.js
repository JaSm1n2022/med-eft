import React from 'react';
import HelperJS from '../utils/helperJS';
import TOAST from '../modules/toastManager';

class AdvanceFilter extends React.Component {
  constructor() {
    super();
  }

  saveAdvancedFilter = () => {
    var filterName = document.getElementById("filterName");
    if (!filterName) {
      TOAST.error('Filter name is required.');
      return;
    }
    const qArr = [];
    const filterData = this.props.filterList.filter(f => f.name === filterName.value.trim());
    let isUpdate = false;
    let filterId = '';
    let isPin = false;
    if (filterData && filterData.length) {
      isUpdate = true;
      filterId = filterData[0]._id;
      isPin = filterData[0].isPin;
    }
    this.props.rowAdvancedFilter.forEach((e) => {
      qArr.push({
        columnName: e.columnName,
        operation: e.operation,
        inputValue: e.inputValue,
        multiValue: e.multiValue,
        alias: e.alias,
        dataType: e.dataType,
      
        dates: e.inputDate1 && e.inputDate2 ? { from: e.inputDate1, to: e.inputDate2 } : undefined
      })
    });
    const payload = {
      query: qArr,
      filterName: filterName.value.trim(),
      isUpdate: isUpdate || false,
      filterId: filterId,
      isPin: isPin,
      user: { userId: this.props.user._id, companyId: this.props.user.company._id }
    }
    console.log('[payload]', payload);
  this.props.saveUserFilter(payload);
  }

  removeAdvancedRowFitlerHandler = (i) => {
    this.props.rowAdvancedFilter.splice(i, 1);
    this.props.toggleIsResetChecked();
  }

  render() {
    return (
      <div className="notice-advance-search collapse-search alert alert-warning" style={{ paddingBottom: '10px' }}>
        <div className="filter-box">
          <h2>Advanced Filter</h2>
          <button className="filter-expnad-btn"><i className="fas fa-minus-square"></i></button>
          <form onSubmit={(e) => e.preventDefault()} className="filter-form">
            <div className="form-row f-items">
              <div className="col">
                <p className="a-filter-name">Advanced Filter Name:</p>
              </div>
              <div className="col">
                <input type="text" name="" id="filterName" className="TitleFiled" placeholder="Name this filter to save it" />
              </div>
              <div className="col">
                <div className="btn-area">
                  <button type="button" className="btn btn-info" onClick={this.props.applyAdvancedFilter}>Apply</button>
                  <button type="button" className="btn btn-success" onClick={this.saveAdvancedFilter}>Save Filter</button>
                  <button type="button" className="btn btn-danger" onClick={this.props.newAdvancedFilterHandler}>Clear</button>
                </div>
              </div>
            </div>
            {this.props.rowAdvancedFilter && this.props.rowAdvancedFilter.length > 0 && this.props.rowAdvancedFilter.map((item, i) => (
              <div className="form-row  f-items" key={i}>
                <div className="col-1">
                  <a style={{ color: '#008AFF' }} onClick={() => this.removeAdvancedRowFitlerHandler(i)} className="delete-row"><i className="fas fa-minus-circle"></i></a>
                </div>
                <div className="col">
                  <select className="custom-select mr-sm-2" value={item.columnName} name={`columnName${i}`} onChange={(e) => this.props.advancedRowFilterChangeHandler('columnName', e.target.value, item)}>
                    {item.columns && item.columns.length && item.columns.map(c => (
                      <option key={c}>{c}</option>
                    ))}

                  </select>
                </div>
                <div className="col">
                  <select className="custom-select mr-sm-2" value={item.operation} name={`operation${i}`} onChange={(e) => this.props.advancedRowFilterChangeHandler('operation', e.target.value, item)}>
                    {item.operations && item.operations.length && item.operations.map(c => (
                      <option key={c.operation}>{c.operation}</option>
                    ))}
                  </select>
                </div>
                {item.dataType && item.dataType === 'string' &&
                  <div className="col">
                    <input type="text" className="" value={item.inputValue} name={`inputValue${i}`} id={`inputValue${i}`} onChange={(e) => this.props.advancedRowFilterChangeHandler('inputValue', e.target.value, item)} />
                  </div>
                }
                {item.dataType && item.dataType === 'int' &&
                  <div className="col">
                    <input type="number" className="" value={item.inputValue} name={`inputValue${i}`} id={`inputValue${i}`} onChange={(e) => this.props.advancedRowFilterChangeHandler('inputValue', e.target.value, item)} />
                  </div>
                }
                {item.dataType && item.dataType === 'date' &&
                  <div className="col">
                    <span>{item.inputValue}</span>
                  </div>
                }
                {item.dataType && item.dataType === 'dates' &&
                  <div className="col">
                    <span>{item.inputDate1}  - {item.inputDate2}</span>
                  </div>
                }
                {item.dataType && item.dataType === 'date range' &&
                  <div className="col">
                    <div className="date-group">
                      <input type="date" value={item.inputDate1} name={`dateRange1${i}`} id={`dateRange1${i}`} onChange={(e) => this.props.advancedRowFilterChangeHandler('dateRange1', e.target.value, item)} />
                      <input type="date" value={item.inputDate2} name={`dateRange2${i}`} id={`dateRange2${i}`} onChange={(e) => this.props.advancedRowFilterChangeHandler('dateRange2', e.target.value, item)} />
                    </div>
                  </div>
                }
                {item.dataType && item.dataType === 'calendar' &&
                  <div className="col">
                    <div className="date-group">
                      <input type="date" value={item.inputValue} name={`calendar${i}`} id={`calendar${i}`} onChange={(e) => this.props.advancedRowFilterChangeHandler('calendar', e.target.value, item)} />
                    </div>
                  </div>
                }
                {item.dataType && item.dataType === 'list' &&
                  <div className="col">
                    <select className="custom-select mr-sm-2" value={item.inputValue} name={`list${i}`} onChange={(e) => this.props.advancedRowFilterChangeHandler('inputValue', e.target.value, item)}>
                      {item.default && item.default.length > 0 && item.default.map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                }
                {item.dataType && item.dataType === 'list multi' &&
                  <div className="col">
                    <div onClick={() => HelperJS.showMultiItemsJS(`multiId${i}`)} id={`multiId${i}`} className="dropdown-check-list cwork-select" type="multi">
                      <span className={`anchorMullti${i}`}>{item.multiValue && item.multiValue.length ? item.multiValue.toString() : 'Select'}</span>
                      <ul className="items">
                        {item.default && item.default.length > 0 && item.default.map(c => (
                          <li key={c.name}><input type="checkbox" checked={c.isChecked} name={`default${c.name.replace(' ', '')}${i}`} onChange={(e) => this.props.displayMultiAdvancedSelectorHandler(`anchorMullti${i}`, item, e, c, item.alias)} />{c.name} </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                }
              </div>
            ))}
          </form>
          <div className="add-new-filter-items">
            <div className="form-row  f-items">
              <div className="col-1">
                <a style={{ color: '#008AFF' }} onClick={(e) => this.props.addAdvancedRowFilterHandler(e)} className="add-filter-btn"><i className="fas fa-plus-circle"></i></a>
              </div>
              <div className="col">
                <p>Add New Filter</p>
              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default AdvanceFilter;
