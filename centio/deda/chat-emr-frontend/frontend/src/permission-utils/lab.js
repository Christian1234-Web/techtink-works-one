export function hasCreateLabPermission(permissions) {
	return permissions.find(p => p === 'create-lab');
}

export function hasReceiveSpecimenPermission(permissions) {
	return permissions.find(p => p === 'receive-specimen');
}

export function hasFillResultPermission(permissions) {
	return permissions.find(p => p === 'fill-result');
}

export function hasApproveResultPermission(permissions) {
	return permissions.find(p => p === 'approve-result');
}

export function hasViewResultPermission(permissions) {
	return permissions.find(p => p === 'view-result');
}

export function hasPrintResultPermission(permissions) {
	return permissions.find(p => p === 'print-result');
}

export function hasCancelLabPermission(permissions) {
	return permissions.find(p => p === 'cancel-lab');
}

export function hasEditLabResultPermission(permissions) {
	return permissions.find(p => p === 'edit-lab-result');
}
