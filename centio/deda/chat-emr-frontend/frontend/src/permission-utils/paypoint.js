export function hasDeleteTransactionPermission(permissions) {
	return permissions.find(p => p === 'delete-transaction');
}
