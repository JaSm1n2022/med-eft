
var elemHeight = '';

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}
function slideUp(el) {
    var elem = document.querySelector(el);
    elem.style.transition = "all .5s ease-in-out";
    elem.style.height = "0px";
    setTimeout(function () {
        elem.style.display = "none";
    }, 510)
}

function slideDown(el) {
    var elem = document.querySelector(el);
    elem.style.display = "block";
    elem.style.transition = "all .5s ease-in-out";
    setTimeout(function () {
        elem.style.height = elemHeight + "px";
    }, 5)
}

function advancedSerachFilter() {
    var FieldsRow = `
    <div class="form-row  f-items">
        <div class="col-1">
            <a href="#" class="delete-row"><i class="fas fa-minus-circle"></i></a>
        </div>
        <div class="col">
            <select class="custom-select mr-sm-2">
                <option selected>Property</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
        <div class="col">
            <select class="custom-select mr-sm-2">
                <option selected>Oparent</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
        <div class="col">
            <select class="custom-select mr-sm-2">
                <option selected>Parameter</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
    </div>`;

    var addNewFields = document.querySelector('.add-filter-btn');
    var filterForm = document.querySelector('.filter-form');
    //var filterDelBtn = document.querySelector('.filter-btn-delete');
    var filterEditBtn = document.querySelector('.filter-btn-edit');
    var searchTitle = document.querySelector('.searchTitle');
    var TitleFiled = document.querySelector('.TitleFiled');
    var moreSaveBtn = document.querySelector('.more-save-btn');
    var moreSaveList = document.querySelector('.more-search-filter');
    if (moreSaveBtn) {
        moreSaveBtn.addEventListener('click', function () {
            moreSaveList.classList.toggle("active")
        })
    }
    /*
    addNewFields.addEventListener('click', function () {
        filterForm.innerHTML += FieldsRow;
    })
    */
    /*
      if (filterDelBtn) {
      filterDelBtn.addEventListener('click', function () {
          this.parentNode.parentNode.parentNode.remove();
      })
      
  }
  */

    if (filterEditBtn) {
        filterEditBtn.addEventListener('click', function () {
            var Title = searchTitle.textContent;
            console.log(Title);
            slideDown('.collapse-search');
            TitleFiled.value = Title;
            // this.parentNode.parentNode.parentNode.remove();

        })
    }

    document.querySelector('.new-filter-btn').addEventListener('click', function (e) {
        slideDown('.collapse-search');
        TitleFiled.value = '';
    }, false);
    document.querySelector('.filter-expnad-btn').addEventListener('click', function (e) {
        slideUp('.collapse-search');
    }, false);
    /*
    setInterval(() => {
        var removeRows = document.querySelectorAll('.delete-row');
        for (let index = 0; index < removeRows.length; index++) {
            removeRows[index].addEventListener('click', function (e) {
                e.preventDefault();
                var row = this.parentNode.parentNode.remove();
            })
        }
    }, 1000);
    */

}



module.exports.hasClass = hasClass;

module.exports.setLocationFacilityJS = (facilities) => {
    var anchor = document.querySelector('.anchor1');
    var arr = []
    var mainArr = [];
    var locs = '';


    for (let index = 0; index < facilities.length; index++) {
        if (facilities[index].isChecked) {
            arr.push(facilities[index].name + ' (' + facilities[index].city + ',' + facilities[index].state + ')');
        }
    }
    if (arr.length > 2) {
        mainArr.push(arr[0]);
        mainArr.push(arr[1]);

    } else {
        mainArr = arr;
    }

    anchor.innerHTML = arr.length > 2 ? mainArr + '...' : mainArr;

    if (mainArr === undefined || mainArr.length === 0) {
        anchor.innerHTML = 'Select Location';
    }


}

module.exports.setCompanyJS = (companies) => {
    var anchor = document.querySelector('.anchor5');
    var arr = []
    var mainArr = [];
    var locs = '';


    for (let index = 0; index < companies.length; index++) {
        if (companies[index].isChecked) {
            arr.push(companies[index].name);
        }
    }
    if (arr.length > 2) {
        mainArr.push(arr[0]);
        mainArr.push(arr[1]);

    } else {
        mainArr = arr;
    }

    anchor.innerHTML = arr.length > 2 ? mainArr + '...' : mainArr;

    if (mainArr === undefined || mainArr.length === 0) {
        anchor.innerHTML = 'Select Company';
    }


}

module.exports.setLocationFacilityJS = (facilities) => {
    var anchor = document.querySelector('.anchor1');
    var arr = []
    var mainArr = [];



    for (let index = 0; index < facilities.length; index++) {
        if (facilities[index].isChecked) {
            arr.push(facilities[index].name + ' (' + facilities[index].city + ',' + facilities[index].state + ')');
        }
    }
    if (arr.length > 2) {
        mainArr.push(arr[0]);
        mainArr.push(arr[1]);

    } else {
        mainArr = arr;
    }

    anchor.innerHTML = arr.length > 2 ? mainArr + '...' : mainArr;

    if (mainArr === undefined || mainArr.length === 0) {
        anchor.innerHTML = 'Select Location';
    }
}

module.exports.setCarrierJS = (carriers) => {
    var anchor = document.querySelector('.anchor2');
    var arr = []
    var mainArr = [];
    for (let index = 0; index < carriers.length; index++) {
        if (carriers[index].isChecked) {
            arr.push(carriers[index].name);
        }
    }
    if (arr.length > 2) {
        mainArr.push(arr[0]);
        mainArr.push(arr[1]);

    } else {
        mainArr = arr;
    }

    anchor.innerHTML = arr.length > 2 ? mainArr + '...' : mainArr;

    if (mainArr === undefined || mainArr.length === 0) {
        anchor.innerHTML = 'Select Carrier';
    }
}

function customDropdown(label, listItems, atr) {
    // Close the dropdown if the user clicks outside of it
    var doorBtn = document.querySelectorAll(label)
    var dropdowns = document.querySelectorAll(listItems);
    var doorValue = document.querySelectorAll(listItems + " li");

    for (let dIndex = 0; dIndex < doorBtn.length; dIndex++) {
        doorBtn[dIndex].addEventListener('click', function () {
            for (let drIndex = 0; drIndex < dropdowns.length; drIndex++) {
                dropdowns[drIndex].style.display = 'none'
            }
            var el = this.nextElementSibling;

            if (hasClass(el, 'block')) {
                this.nextElementSibling.style.display = 'none';
                this.nextElementSibling.classList.remove('block');
            } else {
                this.nextElementSibling.style.display = 'block';
                this.nextElementSibling.classList.add('block');
            }



        })
    }

    for (let dvavnumber = 0; dvavnumber < doorValue.length; dvavnumber++) {
        doorValue[dvavnumber].addEventListener('click', function () {
            for (let drIndex = 0; drIndex < dropdowns.length; drIndex++) {
                dropdowns[drIndex].style.display = 'none';
                dropdowns[drIndex].classList.remove('block');
            }
            var getDoorValue = this.getAttribute(atr)
            var tt = this.parentElement.previousSibling.previousSibling.textContent = getDoorValue;
        })
    }

}
module.exports.customDropdown = customDropdown;



function documentReady(t) {
    /in/.test(document.readyState) ? setTimeout("documentReady(" + t + ")", 9) : t()
}

function findAncestor(t, e) {
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
module.exports.tableSortingJS = () => {
    documentReady(function () {
        for (var t = document.getElementsByClassName("sortable-table"), e = [], n = 0; n < t.length; n++) ! function () {
            t[n].setAttribute("data-sort-index", n);
            for (var r = t[n].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), a = 0; a < r.length; a++)
                for (var i = r[a].getElementsByTagName("td"), o = 0; o < i.length; o++) void 0 === e[n] && e.splice(n, 0, []), void 0 === e[n][a] && e[n].splice(a, 0, []), e[n][a].splice(o, 0, i[o].innerHTML);

            for (var s = t[n].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th"), d = 2; d < s.length; d++) ! function () {

                var n = s[d].classList.contains("numeric-sort");
                // console.log(s);

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
    });
}

module.exports.CustomMultiSelect = (listId, checkboxInput, anchorClass) => {

    if (document.querySelectorAll(anchorClass).length > 0) {


        // Selectorss
        const locationLists = document.getElementById(listId);
        var checkList = document.getElementById(listId);
        var locationItems = document.querySelectorAll(checkboxInput);
        var anchor = document.querySelector(anchorClass);
        var arr = []
        var mainArr = [];
        var anchorTxt = anchor.textContent;
        /*  Hide lcoation outside click */
        if (checkList !== null) {
            document.addEventListener("click", function (event) {
                // If user clicks inside the element, do nothing
                if (event.target.closest("#" + listId)) return;
                // If user clicks outside the element, hide it!
                checkList.classList.remove("visible");
            });

        }

        // Dropdown Hide & show
        if (checkList !== null) {
            anchor.addEventListener('click', function () {
                if (checkList.classList.contains('visible'))
                    checkList.classList.remove('visible');
                else
                    checkList.classList.add('visible');
            })
        }

        // Checkbox select
        if (locationItems !== null) {
            for (let index = 0; index < locationItems.length; index++) {
                mainArr.push(locationItems[index].textContent);
                locationItems[index].addEventListener('click', function () {
                    if (hasClass(this, 'active')) {
                        this.checked = false;
                        const index = arr.indexOf(this.parentElement.textContent);
                        if (index > -1) {
                            arr.splice(index, 1);
                        }
                    } else {
                        arr.push(this.parentElement.textContent);
                        this.checked = true;
                    }
                    this.classList.toggle('active');
                    anchor.innerHTML = arr;
                    if (arr === undefined || arr.length == 0) {
                        anchor.innerHTML = anchorTxt;
                    }
                })
            }
        }
        if (hasClass(checkList, 'list')) {
            for (let index = 0; index < locationItems.length; index++) {
                locationItems[index].addEventListener('click', function () {
                    if (!hasClass(this, 'custom-date')) {
                        console.log('haha');
                        var getLiestText = this.textContent;
                        anchor.innerHTML = getLiestText;
                        if (checkList.classList.contains('visible'))
                            checkList.classList.remove('visible');
                        else
                            checkList.classList.add('visible');
                    }
                })

            }
        }
    }
}



module.exports.doorPriorityJS = () => {
    if (window.innerWidth > 768) {
        customDropdown('.desk-door', '.door-list', 'data-door');
    }
    customDropdown('.priority-label', '.priority-list', 'data-priority');
    var cbtns = document.querySelectorAll('.colunm-btn')
    for (let index = 0; index < cbtns.length; index++) {
        cbtns[index].addEventListener('click', function () {
            var attr = this.getAttribute('data-check');
            var id = document.querySelectorAll(attr);
            if (this.checked) {
                for (let pIndex = 0; pIndex < id.length; pIndex++) {
                    id[pIndex].style.display = 'table-cell';
                }
            } else {
                for (let pIndex = 0; pIndex < id.length; pIndex++) {
                    id[pIndex].style.display = 'none';
                }
            }
        })
    }

}
module.exports.tableRowJS = () => {
    let tableRow = document.querySelectorAll('.table tr')
    tableRow.forEach(row => {
        row.addEventListener('click', function () {
            tableRow.forEach(item => {
                if (item !== row) {
                    item.classList.remove('active')
                }
            })
            this.classList.add('active')
        })
    })
}



module.exports.customMultiSelectJS = () => {
  this.CustomMultiSelect('list1', '#list1 .items li input', '.anchor1')
  this.CustomMultiSelect('list2', '#list2 .items li input', '.anchor2')
  this.CustomMultiSelect('list3', '#list3 .items li', '.anchor3')
  this.CustomMultiSelect('list4', '#list4 .items li', '.anchor4')
  this.CustomMultiSelect('list5', '#list5 .items li', '.anchor5')
}
module.exports.locationJS = () => {
    var checkList = document.getElementById('list1');
    const locationLists = document.getElementById('list1');
    if (locationLists !== null) {
        document.addEventListener("click", function (event) {
            // If user clicks inside the element, do nothing
            if (event.target.closest("#list1")) return;
            // If user clicks outside the element, hide it!
            locationLists.classList.remove("visible");
        });


    }

    if (checkList !== null) {
        checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {

            if (checkList.classList.contains('visible'))
                checkList.classList.remove('visible');
            else
                checkList.classList.add('visible');
        }

    }

    var checkList2 = document.getElementById('list2');
    const locationLists2 = document.getElementById('list2');
    if (locationLists2 !== null) {
        document.addEventListener("click", function (event) {
            // If user clicks inside the element, do nothing
            if (event.target.closest("#list2")) {

                return;
            }
            // If user clicks outside the element, hide it!
            locationLists2.classList.remove("visible");
        });


    }

    if (checkList2 !== null) {
        checkList2.getElementsByClassName('anchor')[0].onclick = function (evt) {
            if (checkList2.classList.contains('visible'))
                checkList2.classList.remove('visible');
            else
                checkList2.classList.add('visible');
        }
    }

}
module.exports.collapseMapJS = () => {
    let responsiveEl = document.querySelector('.collapse');
    if (responsiveEl && responsiveEl.classList) {
        responsiveEl.classList.remove('show');
    }
}
module.exports.searchFilterToogleButtonJS = () => {
    console.log('[searh filter toogle button]');
    let slideUps = (target, duration = 500) => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            //alert("!");
        }, duration);
    }

    let slideDowns = (target, duration = 500) => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;

        if (display === 'none')
            display = 'block';

        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
        }, duration);
    }
    var slideToggle = (target, duration = 500) => {
        if (window.getComputedStyle(target).display === 'none') {
            return slideDowns(target, duration);
        } else {
            return slideUps(target, duration);
        }
    }
    if (document.querySelectorAll('.Search-filter-btn').length > 0) {
        var SerachToggleBtn = document.querySelector('.Search-filter-btn');
        SerachToggleBtn.addEventListener('click', function () {
            slideToggle(document.getElementById("RegularSerachFilter"), 200);
            this.classList.toggle('active');
            if (hasClass(this, 'active')) {
                this.firstChild.innerText = 'Expand Filters ';
            } else {
                this.firstChild.innerText = 'Hide Filters ';
            }
        });
    }

}
function toggleSlideJS(el) {
    var getHeight = function (el) {
        var el_style = window.getComputedStyle(el),
            el_display = el_style.display,
            el_position = el_style.position,
            el_visibility = el_style.visibility,
            el_max_height = el_style.maxHeight.replace("px", "").replace("%", ""),
            wanted_height = 0;

        // if its not hidden we just return normal height
        if (el_display !== "none" && el_max_height !== "0") {
            return el.offsetHeight;
        }

        // the element is hidden so:
        // making the el block so we can meassure its height but still be hidden
        el.style.position = "absolute";
        el.style.visibility = "hidden";
        el.style.display = "block";

        wanted_height = el.offsetHeight;

        // reverting to the original values
        el.style.display = el_display;
        el.style.position = el_position;
        el.style.visibility = el_visibility;

        return wanted_height;
    };
    var el_max_height = 0;

    if (el.getAttribute("data-max-height")) {
        // we've already used this before, so everything is setup
        if (el.style.maxHeight.replace("px", "").replace("%", "") === "0") {
            el.style.maxHeight = el.getAttribute("data-max-height");
        } else {
            el.style.maxHeight = "0";
        }
    } else {
        el_max_height = getHeight(el) + "px";
        el.style["transition"] = "max-height 0.5s ease-in-out";
        el.style.overflowY = "hidden";
        el.style.maxHeight = "0";
        el.setAttribute("data-max-height", el_max_height);
        el.style.display = "block";

        // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
        setTimeout(function () {
            el.style.maxHeight = el_max_height;
            el.style.maxHeight = el_max_height;
        }, 10);
    }
}

function customCounter(secs) {
    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 10;
    const ALERT_THRESHOLD = 5;
    const COLOR_CODES = {
        info: {
            color: "green"
        },
        warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: "red",
            threshold: ALERT_THRESHOLD
        }
    };

    const TIME_LIMIT = secs;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;
    console.log('[remainingPathColor]', remainingPathColor);
    if (document
        .getElementById("base-timer-path-remaining")
    ) {

        document
            .getElementById("base-timer-path-remaining")
            .classList.remove("red");
    }
    document.getElementById("app").innerHTML = `
    <div class="base-timer" id="baseTime">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
        </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(
            timeLeft
        )}</span>
    </div>
    `;

    return startTimer();

    function onTimesUp() {
        clearInterval(timerInterval);
        if (document.getElementById("refreshDataBtn") && document.getElementById("base-timer-label")) {
            document.getElementById("refreshDataBtn").click();
        }
    }

    function startTimer() {
        if (!document.getElementById("base-timer-label") || document.getElementById("base-timer-label") === null || document.getElementById("base-timer-label") === undefined) {
            onTimesUp();
            return;
        }
        const timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            if (!document.getElementById("base-timer-label") || document.getElementById("base-timer-label") === null || document.getElementById("base-timer-label") === undefined) {
                onTimesUp();
                return;
            }
            document.getElementById("base-timer-label").innerHTML = formatTime(
                timeLeft
            );
            setCircleDasharray();
            setRemainingPathColor(timeLeft);

            if (timeLeft === 0) {
                onTimesUp();
            }
        }, 1000);
        return timerInterval;
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    function setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {

            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
        } else {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove("red");
            if (!document
                .getElementById("base-timer-path-remaining").classList.contains("green")) {
                document.getElementById("base-timer-path-remaining")
                    .classList.add("green");
            }
        }
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }

}
module.exports.revertFieldName = (val1,val2, category, id, DATE_ELEMENTS) => {
    let mainClassId1 = `${category}-${id}`;
    let mainClassId2 = '';
    if (DATE_ELEMENTS.includes(category)) {
        mainClassId1 = `${mainClassId1}-dFrom`;
        mainClassId2 = `${mainClassId2}-tFrom`;
    }
    const locItemEl1 = document.getElementById(mainClassId1);
    const locItemEl2 = document.getElementById(mainClassId2);

    if (locItemEl1) {
        locItemEl1.textContent = val1;
    }
    if (locItemEl2) {
        locItemEl2.textContent = val2;
    }

}
module.exports.toggleActiveEl = (el) => {
    if (el && el.classList.contains('active')) {
        el.classList.toggle('active');
    }
}
module.exports.closeAssignPopupItems = () => {
    this.toggleActiveEl(document.querySelector(".table-location-items"));
    this.toggleActiveEl(document.querySelector(".person-popup"));
    this.toggleActiveEl(document.querySelector(".calender-popup"));
}

module.exports.startCounter = (secs) => {
    console.log('[start custom Counter]');
    return customCounter(secs);
}
module.exports.mapToggleJS = () => {

    const m = document.querySelector('#mapToggle');
    m.classList.toggle('active');
    if (m.innerHTML === '<i class="fas fa-map-marker-alt"></i> Hide') {
        m.innerHTML = '<i class="fas fa-map-marker-alt"></i> Show';
    } else {
        m.innerHTML = '<i class="fas fa-map-marker-alt"></i> Hide';
    }
    document.querySelector('.table-content-col').classList.toggle('col-md-12')
    document.querySelector('.map-col').classList.toggle('d-none')
    toggleSlideJS(document.querySelector(".map-wrap-inner"));
    document.querySelector(".map-wrap-inner").classList.toggle("active");
    /*
      if (document.querySelectorAll('#mapToggle').length > 0 && document.querySelectorAll('.m-map-toggler').length > 0) {
        document.querySelector('#mapToggle').addEventListener('click', function (e) {
          this.classList.toggle('active');
          if (this.innerHTML === "Hide Map") {
            this.innerHTML = "Show Map";
          } else {
            this.innerHTML = "Hide Map";
          }
          document.querySelector('.table-content-col').classList.toggle('col-md-12')
          document.querySelector('.map-col').classList.toggle('d-none')
        }, false);
      }
      */
}
module.exports.dropDownMenuJS = (e) => {
    e = e.target.parentElement;
    if (
        e.classList.contains("active") == true ||
        e.nextElementSibling.style.display == "block"
    ) {
        e.classList.remove("active");
        e.nextElementSibling.style.display = "none";
    } else if (e.nextElementSibling.style.display == "") {
        e.nextElementSibling.style.display = "block";
        e.classList.add("active");
    } else {
        e.nextElementSibling.style.display = "block";
        e.classList.add("active");
    }

}
module.exports.pickupDeliveryViewGridJS = () => {
    let pickupControl = document.getElementById("pickupControl");
    let pickupSelectBox = document.getElementById("pickupSelectBox");
    let pickupSave = document.querySelector(
        "#pickupSelectBox button.btn.btn-success"
    );
    let pickupCancel = document.querySelector(
        "#pickupSelectBox button.btn.btn-danger"
    );

    if (pickupControl !== null) {
        pickupControl.addEventListener("click", function () {
            // console.log('clicked');
            pickupSelectBox.classList.toggle("show");
            this.classList.toggle("active");
        });
        pickupSave.addEventListener("click", function () {
            var prarents = this.closest("#pickupSelectBox");
            // console.log(prarents);
            pickupSelectBox.classList.toggle("show");
            this.classList.toggle("active");
        });
        pickupCancel.addEventListener("click", function () {
            var prarents = this.closest("#pickupSelectBox");
            // console.log(prarents);
            pickupSelectBox.classList.toggle("show");
            this.classList.toggle("active");
        });
    }

}
module.exports.gridViewJS = () => {

    if (document.querySelectorAll("#navbtn").length > 0) {
        var getHeight = function (el) {
            var el_style = window.getComputedStyle(el),
                el_display = el_style.display,
                el_position = el_style.position,
                el_visibility = el_style.visibility,
                el_max_height = el_style.maxHeight.replace("px", "").replace("%", ""),
                wanted_height = 0;

            // if its not hidden we just return normal height
            if (el_display !== "none" && el_max_height !== "0") {
                return el.offsetHeight;
            }

            // the element is hidden so:
            // making the el block so we can meassure its height but still be hidden
            el.style.position = "absolute";
            el.style.visibility = "hidden";
            el.style.display = "block";

            wanted_height = el.offsetHeight;

            // reverting to the original values
            el.style.display = el_display;
            el.style.position = el_position;
            el.style.visibility = el_visibility;

            return wanted_height;
        },
			/**
			 * toggleSlide mimics the jQuery version of slideDown and slideUp
			 * all in one function comparing the max-heigth to 0
			 */
            toggleSlide = function (el) {
                var el_max_height = 0;

                if (el.getAttribute("data-max-height")) {
                    // we've already used this before, so everything is setup
                    if (el.style.maxHeight.replace("px", "").replace("%", "") === "0") {
                        el.style.maxHeight = el.getAttribute("data-max-height");
                    } else {
                        el.style.maxHeight = "0";
                    }
                } else {
                    el_max_height = getHeight(el) + "px";
                    el.style["transition"] = "max-height 0.5s ease-in-out";
                    el.style.overflowY = "hidden";
                    el.style.maxHeight = "0";
                    el.setAttribute("data-max-height", el_max_height);
                    el.style.display = "block";

                    // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
                    setTimeout(function () {
                        el.style.maxHeight = el_max_height;
                        el.style.maxHeight = el_max_height;
                    }, 10);
                }
            };

        document.querySelector("#navbtn").addEventListener(
            "click",
            function (e) {
                toggleSlide(document.querySelector("#navbarSupportedContent"));
            },
            false
        );


        if (
            document.querySelectorAll("#filterBtn").length > 0 &&
            document.querySelectorAll("#filterBtn").length > 0
        ) {
            document.querySelector("#filterBtn").addEventListener(
                "click",
                function (e) {
                    toggleSlide(document.querySelector(".search-filtter"));
                    this.classList.toggle("active");
                },
                false
            );
        }


        var profileTab = document.querySelector("#profiletab");
        if (profileTab !== null && window.innerWidth < 992) {
            profileTab.addEventListener(
                "click",
                function (e) {
                    toggleSlide(document.querySelector(".profile-dropdown"));
                },
                false
            );
        }
    }

}
module.exports.advancedSearchFilterJS = () => {
    if (document.querySelectorAll('.collapse-search').length > 0) {
        var elem = document.querySelector('.collapse-search');
        elemHeight = elem.offsetHeight;
        elem.style.display = "none";
        elem.style.height = 0;
        elem.style.overflowY = 'scroll';
    }

    if (document.querySelectorAll('.filter-form').length > 0) {
        advancedSerachFilter();
    }
}
module.exports.hideBasicFilterJS = () => {
    slideDown('.collapse-search');


}
module.exports.enabledMoreFilterBtnJS = () => {
    var moreSaveBtn = document.querySelector('.more-save-btn');
    var moreSaveList = document.querySelector('.more-search-filter');
    if (moreSaveBtn) {
        moreSaveBtn.addEventListener('click', function () {
            moreSaveList.classList.toggle("active")
        })
    }
}
function listSearch(id1, id2, id3) {
    var clearSearchField = document.querySelector(id3);
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById(id1);
    if (input) {
    input.addEventListener("keyup", CategorySearch, false);
    function CategorySearch() {
        filter = input.value.toUpperCase();
        ul = document.getElementById(id2);
        // console.log(ul);
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            const span = li[i].getElementsByTagName("span")[0];
            txtValue = span.textContent || span.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }

        clearSearchField.addEventListener("click", function () {
            input.value = "";
            for (let index = 0; index < li.length; index++) {
                li[index].style.display = "";
            }
        });
    }
}


}
module.exports.multiAdvancedFilterJS = () => {
    var selectTotal = document.querySelectorAll('.cwork-select');

    for (let index = 0; index < selectTotal.length; index++) {
        const elementID = selectTotal[index].getAttribute('id');
        var checkList = document.getElementById(elementID);
        /*  Hide lcoation outside click */
        if (checkList !== null) {
            console.log('[adding event outside]');
            document.addEventListener("click", function (event) {
                // If user clicks inside the element, do nothing
                if (event.target.closest("#" + elementID)) return;
                // If user clicks outside the element, hide it!
                checkList.classList.remove("visible");
            });

        }

    }
}
module.exports.showMultiItemsJS = (listId) => {
    console.log('[click me]', listId);
    var checkList = document.getElementById(listId);
    checkList.classList.add('visible');
    this.multiAdvancedFilterJS();

}
module.exports.listMoreSaveFiltersJS = () => {
    listSearch('seachSaveInput', 'saveSearchLists', '.clearSearchList');

}
module.exports.listSearchForFieldJS = () => {
    listSearch("searchForField", "CategoeySearchBox", ".clearSearchField");
    listSearch("seachSaveInput", "saveSearchLists", ".clearSearchList");
    listSearch("locationSearchForField", "LocationSearchBox", ".clearLocationSearchField");
    listSearch("PartySearchForField", "ParthSearchBox", ".clearPartySearchField");
    listSearch("PersonSearchForField", "PersonSearchBox", ".clearPersonSearchField");


}
module.exports.initJS = () => {
    /**
     * Remove conflict script @ scripts.js
     * Be sure that there's no duplicate flow.
     */
    this.tableRowJS();
    this.doorPriorityJS();
    this.searchFilterToogleButtonJS();
    this.advancedSearchFilterJS();
    this.customMultiSelectJS();
    //  this.startCounter();
    // this.gridViewJS();
    // this.pickupDeliveryViewGridJS();

}
