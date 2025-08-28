import React from "react";

const StatCard = (props) => {
	const {
		title,
		className,
		statData,
		growthRatio,
		positiveGrowth,
		growthFrom,
	} = props;

	return (
		<div className={`${className} countChart`}>
			<header>
				<strong>{title}</strong>

				<div
					id="arriveShipmentsreport"
					style={{
						background: "#fff",
						cursor: "pointer",
						padding: "5px 10px",
						border: "1px solid #ccc",
						width: "100%",
					}}
				>
					<i className="fa fa-calendar"></i>&nbsp;
					<span></span> <i className="fa fa-caret-down"></i>
				</div>
			</header>
			<article>
				<p>
					{statData}
					<a href="#">
						<i className="fas fa-chart-area"></i>
					</a>
				</p>
			</article>
			<footer>
				<p>
					<span>
						{positiveGrowth !== false ? "+" : "-"} {`${growthRatio}%`}
					</span>{" "}
					from {growthFrom}
				</p>
			</footer>
		</div>
	);
};

export default StatCard;
