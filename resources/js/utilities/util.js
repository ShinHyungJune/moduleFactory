let timer;

export const debounce = (method) => {
	if (timer)
		clearTimeout(timer);
	
	timer = setTimeout(() => {
		method();
	}, 200)
	
};