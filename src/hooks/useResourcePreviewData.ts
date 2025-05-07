import getResourceType, { ResourceType } from "../utils/getResourceType";

export type ResourceCardProps = {
	post_title: string;
	post_type?: ResourceType;
	permalink: string;
	featured_image?: any;
	acf?: {
		podcast_details: {
			video_url?: string;
			description?: string;
		};
	};
	className?: string;
};

type ResourceData = Pick<ResourceCardProps, "post_type" | "acf" | "permalink">;

type ResourcePreviewData = {
	resourceType: string;
	isPodcast: boolean;
	hasPermalink: boolean;
	resourceUrl: string | null;
	target: string;
};

export default function useResourcePreviewData(data: ResourceData): ResourcePreviewData {
	const { post_type, acf, permalink } = data;
	const resourceType = getResourceType(post_type as ResourceType);
	const isPodcast = resourceType === "Podcast";
	const videoUrl = acf?.podcast_details?.video_url || "";
	const hasPermalink = Boolean((isPodcast && videoUrl) || permalink);

	const resourceUrl = isPodcast && videoUrl ? videoUrl : permalink || null;

	const target = isPodcast && videoUrl ? "_blank" : "_self";

	return {
		resourceType,
		isPodcast,
		hasPermalink,
		resourceUrl,
		target,
	};
}
