const resourceTypeMap = {
	post: "Blog",
	ebook: "eBook",
	event: "Event",
	podcast: "Podcast",
	article: "Article",
};

export type ResourceType = keyof typeof resourceTypeMap;

export default function getResourceType(type: ResourceType): string {
	return resourceTypeMap[type] || type;
}
