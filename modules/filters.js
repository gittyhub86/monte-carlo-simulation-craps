function trusted($sce) {
	return function(val) {
		console.log('In filter. reslog: ', val)
		return $sce.trustAsHtml(val);
	}
}