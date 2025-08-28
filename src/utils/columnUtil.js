
/*
// Table sorting
// https://jsfiddle.net/speeedsam/w1afnvg6/4/
const findAncestor = (t, e) => {
  for (;
    (t = t.parentElement) && !t.classList.contains(e););
  return t
}

function unformatNumberString(t) {
  return t = t.replace(/[^\d\.-]/g, ""), Number(t)
}

function extractStringContent(t) {
  var e = document.createElement("span");
  return e.innerHTML = t, e.textContent || e.innerText
}

function setColHeaderDirection(t, e, n) {
  for (var r = 1; r < n.length; r++) r == e ? n[e].setAttribute("data-sort-direction", t) : n[r].setAttribute("data-sort-direction", 0)
}

function renderSortedTable(t, e) {
  for (var n = t.getElementsByTagName("tbody")[0].getElementsByTagName("tr"), r = 0; r < n.length; r++)
      for (var a = n[r].getElementsByTagName("td"), i = 1; i < a.length; i++) a[i].innerHTML = e[r][i]
}

const initializeAttributes = (tableId) => {
  const tabelaDrag = document.getElementById(tableId);
  if (tabelaDrag) {
    for (var t = tabelaDrag.getElementsByClassName("sortable-table"), e = [], n = 0; n < t.length; n++) ! function () {
      t[n].setAttribute("data-sort-index", n);
      for (var r = t[n].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), a = 0; a < r.length; a++)
          for (var i = r[a].getElementsByTagName("td"), o = 0; o < i.length; o++) void 0 === e[n] && e.splice(n, 0, []), void 0 === e[n][a] && e[n].splice(a, 0, []), e[n][a].splice(o, 0, i[o].innerHTML);

      for (var s = t[n].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th"), d = 2; d < s.length; d++) ! function () {

          var n = s[d].classList.contains("numeric-sort");
          
          s[d].setAttribute("data-sort-direction", 0), s[d].setAttribute("data-sort-index", d), s[d].addEventListener("click", function () {
              var r = this.getAttribute("data-sort-direction"),
                  a = this.getAttribute("data-sort-index"),
                  i = findAncestor(this, "sortable-table").getAttribute("data-sort-index");
              setColHeaderDirection(1 == r ? -1 : 1, a, s), e[i] = e[i].sort(function (t, e) {
                  var i = extractStringContent(t[a]),
                      o = extractStringContent(e[a]);
                  return n && (i = unformatNumberString(i), o = unformatNumberString(o)), i === o ? 0 : 1 == r ? i > o ? -1 : 1 : i < o ? -1 : 1
              }), renderSortedTable(t[i], e[i])
          })
      }()
    }()
  }
}
module.exports.initializeAttributes = initializeAttributes;
*/

const StorageUtil = require('./storageUtil');
function getDataColumns(tableId, rowNbr) {
  let dataSeq = [];
  const tabelaDrag = document.getElementById(tableId);
  const linhas = tabelaDrag.getElementsByTagName("TR");
  if (linhas && linhas.length>1) {
    const firstRow = linhas[rowNbr];
    if (firstRow) {
      let cols = firstRow.getElementsByTagName("td");
      for (let x = 2; x < cols.length; x++) {
        dataSeq.push(cols[x].dataset.hdr);
      }
    }
  }
  return dataSeq;
}
function getHeaderList(tableId) {
  const tabelaDrag = document.getElementById(tableId);
  const headers = tabelaDrag.getElementsByClassName("rowt");
  const headerList = [];
  for (let x = 0; x < headers.length; x++) {
    const h = headers[x];
    headerList.push(h.getAttribute('id'));
  }
  return headerList;
}

const arrayEquals = (a, b) => {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}
module.exports.arrayEquals = arrayEquals;


function ReApplyColumnOrder(tableId, columnArray, startingRow) {
  let hasChanges = false;
  const tabelaDrag = document.getElementById(tableId);
  const linhas = tabelaDrag.getElementsByTagName("TR");
  let dataSeq = (startingRow?getDataColumns(tableId, startingRow):getHeaderList(tableId));
  if (dataSeq && columnArray && dataSeq.length === columnArray.length) {
    const areEqual = arrayEquals(dataSeq, columnArray);
    if (!areEqual) {
      for (let x = startingRow; x < linhas.length; x++) {
        const tds = linhas[x].cells;
        const tmp = [];
        for (let i = 0; i < columnArray.length; i++) {
          dataSeq = (startingRow?getDataColumns(tableId, x):getHeaderList(tableId));
          const expectedColumn = columnArray[i];
          for (let j = 0; j < tds.length; j++) {
            const cella = tds[j];
            if (cella) {
              const hdr = cella.dataset.hdr;
              const id = cella.getAttribute('id');
              const col = hdr || id;
              if (col && expectedColumn && col == expectedColumn) {
                // console.log("***ReApplyColumnOrder startingRow:", startingRow, "row#", x, expectedColumn, "("+i+"); pos#", 
                //             j, col, new Date().getTime(), cella, columnArray, dataSeq);
                var celula = linhas[x].removeChild(tds[j]);
                linhas[x].appendChild(celula);
              }
            }
          }
        }
      }
      hasChanges = true;
    }
  } else {
    console.log("****** WARN length of saved columns not same as actual ****** actual:",
          dataSeq, "desired:", columnArray, "startingRow:", startingRow);
  }
  return hasChanges;
}


module.exports.loadColumnOrder = (tableId) => {
  const columnList = StorageUtil.getHeaderArriveTableStorage();
  if (columnList && columnList.length) {
    const columnArray = columnList.split(',');
    const hasHeaderChanged = ReApplyColumnOrder(tableId, columnArray, 0);
    if (!hasHeaderChanged) {
      // console.log("XXXXXXXXXXXX hasHeaderChanged:", hasHeaderChanged);
      // Make sure that the body is still in sync
      ReApplyColumnOrder(tableId, columnArray, 1);
    }
  }
}


module.exports.saveSortIndex = (tableId) => {
  const tabelaDrag = document.getElementById(tableId);
  let columnList = "";
  if (tabelaDrag) {
    const headers = tabelaDrag.getElementsByClassName("rowt");
    if (headers && headers.length) {
      for(let x = 0; x<headers.length; x++) {
        const h = headers[x];
        if (columnList.length) {
          columnList +=',';
        }
        columnList +=h.getAttribute('id');
        h.setAttribute('data-sort-index', (x+2))
      }
    }
  }
}

const reOrderTd = (tableId, coluna, destino) => {
  if (!destino || !coluna || coluna == destino) return
  const tabelaDrag = document.getElementById(tableId);
  const linhas = tabelaDrag.getElementsByTagName("TR");
  const linhaUm = tabelaDrag.rows[0]
  const ordenacaoMaxima = linhaUm.cells.length
  // console.log('reOrderTd', coluna, destino, linhas.length);
  for (let x = 0; x < linhas.length; x++) {
    const tds = linhas[x].cells
    var celula = linhas[x].removeChild(tds[coluna])
    if (destino >= ordenacaoMaxima || destino + 1 >= ordenacaoMaxima) {
      linhas[x].appendChild(celula)
      if (celula.classList.contains('rowt')) {
        this.saveSortIndex(tableId);
      }
    } else {
      linhas[x].insertBefore(celula, tds[destino])
      if (celula.classList.contains('rowt')) {
        this.saveSortIndex(tableId);
      }
    }
  }
  
  this.setColumnOrder(tableId);
}
module.exports.reOrderTd = reOrderTd;

module.exports.setColumnOrder = (tableId) => {
  if (document.querySelectorAll('#'+tableId).length > 0) {
    const tabelaDrag = document.getElementById(tableId);
    const celulas = tabelaDrag.getElementsByTagName("TH");
    const viewProfile = StorageUtil.getColumnsHeaderProfile();
    let cols = [];
    for (let x = 0; x < celulas.length; x++) {
      if (celulas[x].classList.contains("rowt")) {
      cols.push(celulas[x].classList[1]);
      
      }
    }
    if (viewProfile && viewProfile.current === 'Pickup') {
      viewProfile.pickup.colOrder = cols;
    } else {
      viewProfile.delivery.colOrder = cols;
    }
    StorageUtil.setLocalStorage('columnsHeaderProfile',viewProfile);

  }
}
module.exports.setTableHandler = (tableId) => {
 
  let coluna = null;
  if (document.querySelectorAll('#'+tableId).length > 0) {
    document.onmouseup = soltar;
    let drag = false;
    window.onload = initDrag
    const tabelaDrag = document.getElementById(tableId);
    //const celulas = tabelaDrag.getElementsByTagName("TH");
    const celulas = tabelaDrag.querySelectorAll("TH:not(.notDragable)");
		
    tabelaDrag.onselectstart = function () {
      return false;
    }
    tabelaDrag.onmousedown = function () {
      return false;
    }
    for (let x = 0; x < celulas.length; x++) {
      arrastar(celulas[x])
      celulas[x].onmouseover = pintar
      celulas[x].onmouseout = pintar
    }
    function initDrag() {
      const tabelaDrag = document.getElementById(tableId);
      //const celulas = tabelaDrag.getElementsByTagName("TH");
     const celulas = tabelaDrag.querySelectorAll("TH:not(.notDragable)");
		

      tabelaDrag.onselectstart = function () {
        return false;
      }
      tabelaDrag.onmousedown = function () {
        return false;
      }
      for (let x = 0; x < celulas.length; x++) {
        arrastar(celulas[x])
        celulas[x].onmouseover = pintar
        celulas[x].onmouseout = pintar
      }
    }
    function capturarColuna(obj) {
      if (obj && obj.classList.contains("rowt")) {
        coluna = obj.cellIndex;
        return coluna
      } else {
        coluna = null;
      }
    }

    function orderTd(obj) {
      const destino = obj.cellIndex;
      reOrderTd(tableId, coluna, destino);
      coluna = null;
    }

    function soltar(e) {
      const tabelaDrag = document.getElementById(tableId);
      if (tabelaDrag) {
        const linhas = tabelaDrag.getElementsByTagName("TR");
        if (!e) e = window.event
        let targ = undefined;
        if (e.target) targ = e.target
        else if (e.srcElement) targ = e.srcElement

        orderTd(targ)
        drag = false

        for (let x = 0; x < linhas.length; x++) {
          for (let y = 0; y < linhas[x].cells.length; y++) {
            linhas[x].cells[y].classList.remove('hover', 'selecionado');
          }
        }
      }
    }

    function arrastar(obj) {
      const tabelaDrag = document.getElementById(tableId);
      const linhas = tabelaDrag.getElementsByTagName("TR");
      const linhaUm = tabelaDrag.rows[0]
      if (!obj) return;
      obj.onmousedown = function (ev) {
        const colunaAtual = this.cellIndex
        for (let x = 0; x < linhas.length; x++) {
          if (linhas[x].cells[this.cellIndex] && linhas[x].cells[this.cellIndex].classList) {
  
          linhas[x].cells[this.cellIndex].classList.add('selecionado')
          }
        }
        drag = true
        capturarColuna(this);
        return false;
      }
    }

    function pintar(e) {
      const tabelaDrag = document.getElementById(tableId);
      const linhas = tabelaDrag.getElementsByTagName("TR");
      if (!e) e = window.event
      const ev = e.type

      if (ev == "mouseover") {
        console.log('[mouseover]');
        if (drag) {
          for (let x = 0; x < linhas.length; x++) {
            if (this.className != "selecionado") {
              linhas[x].cells[this.cellIndex].classList.add('hover')
            }
          }
        }
      } else if (ev == "mouseout") {
        for (let x = 0; x < linhas.length; x++) {
          if (this.className != "selecionado") {
            if (linhas[x].cells[this.cellIndex] && linhas[x].cells[this.cellIndex].classList) {
            linhas[x].cells[this.cellIndex].classList.remove('hover', 'selecionado');
            }
          }
        }
      }
    }
  }

}

