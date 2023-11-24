export const copyObjectX = (y: any): any => {
	if (typeof y !== "object" || y === null) {
		return y;
	}

	let x: any = {};

	for (let key in y) {
		if (y.hasOwnProperty(key)) {
			if(Array.isArray(y[key])){
				x[key] = new Array();
				for(var idx = 0; idx < y[key].length; idx++){
					x[key][idx] = copyObjectX(y[key][idx])
				}	
			}

			x[key] = copyObjectX(y[key]);
		}
	}

	return x;
};
