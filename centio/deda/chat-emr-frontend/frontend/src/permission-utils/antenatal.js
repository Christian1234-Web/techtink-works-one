export function hasCloseAncPermission(permissions) {
	return permissions.find(p => p === 'close-antenatal');
}
