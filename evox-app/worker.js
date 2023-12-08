// Event listener for the push event
self.addEventListener('push', function (e) {
		// Parse push notification data as JSON
		const data = e.data.json();

		// Show the notification
		self.registration.showNotification(
				data.title,
				{
						body: data.body,
				}
		);
});
