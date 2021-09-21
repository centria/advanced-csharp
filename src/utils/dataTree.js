/**
 * This DataTree was inspired by https://github.com/hasura/gatsby-gitbook-starter
 */

export const calculateTreeData = edges => {
	// support markdown with slug
	const originalData = edges.filter(
		({
			node: {
				fields: { slug },
			},
		}) => slug !== '/',
	)

	if (originalData.length === 0) {
		return { items: [] }
	}
	// create an array of tree data
	const tree = originalData.reduce(
		(
			accu,
			{
				node: {
					fields: { slug, title },
				},
			},
		) => {
			const parts = slug.split('/')
			let { items: prevItems } = accu
			for (const part of parts.slice(1, -1)) {
				let tmp = prevItems.find(({ label }) => label === part)
				if (tmp) {
					if (!tmp.items) {
						tmp.items = []
					}
				} else {
					tmp = { label: part, items: [] }
					prevItems.push(tmp)
				}
				prevItems = tmp.items
			}
			const existingItem = prevItems.find(
				({ label }) => label === parts[parts.length - 1],
			)
			if (existingItem) {
				existingItem.url = slug
				existingItem.title = title
			} else {
				prevItems.push({
					label: parts[parts.length - 1],
					url: slug,
					items: [],
					title,
				})
			}
			return accu
		},
		{ items: [] },
	)

	return tree
}
