export default function highlightTextContent(text: string, className = "") {
	if (text) {
		return text.replace(/\|(.*?)\|/g, `<span class="${className}">$1</span>`);
	}
	return null;
}
