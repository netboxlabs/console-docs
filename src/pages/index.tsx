import { useEffect } from 'react';


export default function Home(): void {
	useEffect(() => {
		window.location.href = '/docs/netbox/';
	}, []);
}
