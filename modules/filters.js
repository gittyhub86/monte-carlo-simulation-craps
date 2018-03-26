function trusted($sce) {
	return function(val) {
		return $sce.trustAsHtml(val);
	}
}