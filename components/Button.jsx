const Button = ({ label, onClick }) => {
	return (
		<button className="button" onClick={onClick}>
			<div>
				{label}
			</div>
		</button>
	);
}