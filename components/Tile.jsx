const Tile = ({letter}) => {
	return (
		<div className="tile">
			<div className="tile-letter hidden">
				{letter.toUpperCase()}
			</div>
		</div>
	);
}