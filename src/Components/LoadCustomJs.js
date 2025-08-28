class LoadCustomJs extends React.Component {
	componentDidMount() {
		function includeJs(jsFilePath) {
			var js = document.createElement("script");
			js.type = "text/javascript";
			js.src = jsFilePath;
			document.body.appendChild(js);
		}

		// includeJs("js/lightpick.js");

		// includeJs("js/apexcharts.min.js");
		includeJs("js/auto-complete.js");
		includeJs("js/scripts.js");
		includeJs("js/custom/advance-filter.js");
		includeJs("js/custom/chart-customizer.js");
		includeJs("js/custom/slider.js");
		includeJs("js/custom/table-sort.js");
		includeJs("js/custom/interactive-map.js");
		includeJs("js/custom/table-dragdrop.js");
	//	includeJs("js/custom/count-down.js");
		includeJs("js/custom/table-edit.js");

		// if (document.querySelectorAll('.quick-edit-btn').length > 0) {
		//     console.log('tsing');
		// }
		includeJs("js/custom/select.js");

		// console.log(document.querySelectorAll('.quick-edit-btn'));
	}

	render() {
		// console.log(this.state.data)
		// console.log('hahah');

		return (
			<>
				<p>Hello</p>
			</>
		);
	}
}

ReactDOM.render(<LoadCustomJs />, document.querySelector(".loadingjs"));
