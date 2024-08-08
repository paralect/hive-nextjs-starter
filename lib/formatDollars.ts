const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD'
});

export default (centsAmount) => {
	return formatter.format((centsAmount || 0) / 100);
};