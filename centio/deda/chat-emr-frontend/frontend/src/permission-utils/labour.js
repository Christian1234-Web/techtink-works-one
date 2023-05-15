export function hasCloseLabourPermission(permissions) {
	return permissions.find(p => p === 'close-labour');
}
