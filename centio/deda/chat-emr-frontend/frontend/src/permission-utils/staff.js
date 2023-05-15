export function hasEditStaffPermission(permissions) {
	return permissions.find(p => p === 'edit-staff');
}

export function hasEditAccountPermission(permissions) {
	return permissions.find(p => p === 'edit-account');
}

export function hasResetPasswordPermission(permissions) {
	return permissions.find(p => p === 'reset-password');
}

export function hasDisableStaffPermission(permissions) {
	return permissions.find(p => p === 'disable-staff');
}

export function hasEnableStaffPermission(permissions) {
	return permissions.find(p => p === 'enable-staff');
}

export function hasEditSalaryPermission(permissions) {
	return permissions.find(p => p === 'edit-salary');
}
