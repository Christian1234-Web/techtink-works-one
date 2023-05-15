export function hasViewHmoPermission(permissions) {
	return permissions.find(p => p === 'view-hmo');
}

export function hasViewHmoCompanyPermission(permissions) {
	return permissions.find(p => p === 'view-hmo-company');
}

export function hasViewHmoSchemesPermission(permissions) {
	return permissions.find(p => p === 'view-hmo-schemes');
}

export function hasViewHmoTransactionsPermission(permissions) {
	return permissions.find(p => p === 'view-hmo-transactions');
}

export function hasEditHmoSchemePermission(permissions) {
	return permissions.find(p => p === 'edit-hmo-scheme');
}

export function hasDeleteHmoSchemePermission(permissions) {
	return permissions.find(p => p === 'delete-hmo-scheme');
}
