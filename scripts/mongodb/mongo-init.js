db.createUser({
	user: 'appuser',
	pwd: 'PassForAppUser',
	roles: [{ role: 'readWrite', db: 'google_analytics' }],
});
