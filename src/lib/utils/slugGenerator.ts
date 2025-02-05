const maxLength = 25;
export function generateSlug(title, date) {
	if (!date) {
		date = new Date();
	}
	let slug = `${title}-${date.getUTCMonth().toLocaleString()}-${date.getUTCFullYear().toString().substring(2, 4)}`}
	slug.trim().toLowerCase().replace(/\s/g, "-").replace(/\[^a-z0-9-]/g, '').substring(0, maxLength);