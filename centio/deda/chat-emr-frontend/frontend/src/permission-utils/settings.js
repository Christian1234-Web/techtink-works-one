export function hasViewSettingsPermission(permissions) {
	return permissions.find(p => p === 'view-settings');
}
