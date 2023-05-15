export function hasViewVisitNotePermission(permissions) {
	return permissions.find(p => p === 'view-visit-notes');
}

export function hasViewANCNotePermission(permissions) {
	return permissions.find(p => p === 'view-antenatal-notes');
}
