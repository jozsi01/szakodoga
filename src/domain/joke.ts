/* scaffolding-delete-file unless keepExamples */
// Domain object factories make it explicit what properties
// and expectations exist for the most important data types
// the application uses. They are especially useful when
// connecting to a REST API.
// Note that domain objects also may parse or tweak the naming of parameters
// they receive. In this example the prop "joke" is renamed as "content".
export function Joke(
	{ id, content }:
	{ id: number; content?: string },
) {
	return { id, content };
}
export type Joke = ReturnType<typeof Joke>;

// Instead of coupling methods on the objects directly favor
// simply exporting pure functions. They return updated objects
// or derive additional information from the passed in data.
export function anonymize<T extends Partial<Joke>>({ content = '', ...rest }: T) {
	const newContent = content.replaceAll('Chuck Norris', 'You-know-who');
	return { ...rest, content: newContent };
}
