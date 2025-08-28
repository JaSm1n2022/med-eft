/*
 * All Selectors
 */

module.exports.tableEditInitJS = () => {
	/***
	 * Double click editmode
	 */
	

	const script1 = document.createElement("script");
	script1.src = "assets/js/scripts.js";
	script1.async = true;
	document.body.appendChild(script1);
   
	const script2 = document.createElement("script");
	script2.src = "assets/js/custom/table-edit.js";
	script2.async = true;
	document.body.appendChild(script2);
	let EditableFields = document.querySelectorAll(".editable");

	EditableFields.forEach((element) => {
		element.addEventListener("dblclick", function () {
			console.log("thik");
			console.log(this);
			// element.classList.remove("edit");
			this.classList.toggle("edit");
		});
	});
   

}