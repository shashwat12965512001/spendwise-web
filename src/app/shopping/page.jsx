'use client';

import { useEffect, useState } from 'react';
import { API_KEY } from '@/app/utils/apiConfig';
import Loader from '@/components/Loader';
export default function ShoppingPage() {
    const [loading, setLoading] = useState(true);
    const [offers, setOffers] = useState([
        {
            title: 'This is a placeholder title',
            description: 'This is a placeholder description. Please wait while we fetch the latest offers.',
            image: 'https://m.media-amazon.com/images/G/31/AmazonBusiness/980_AB_GIF_Wave03_SP_TopBanner_1242x450_1.jpg',
            price: '$0.00',
            link: '#'
        },
        {
            title: 'This is a placeholder title',
            description: 'This is a placeholder description. Please wait while we fetch the latest offers.',
            image: 'https://m.media-amazon.com/images/G/31/AmazonBusiness/980_AB_GIF_Wave03_SP_TopBanner_1242x450_1.jpg',
            price: '$0.00',
            link: '#'
        },
        {
            title: 'This is a placeholder title',
            description: 'This is a placeholder description. Please wait while we fetch the latest offers.',
            image: 'https://m.media-amazon.com/images/G/31/AmazonBusiness/980_AB_GIF_Wave03_SP_TopBanner_1242x450_1.jpg',
            price: '$0.00',
            link: '#'
        },
        {
            title: 'This is a placeholder title',
            description: 'This is a placeholder description. Please wait while we fetch the latest offers.',
            image: 'https://m.media-amazon.com/images/G/31/AmazonBusiness/980_AB_GIF_Wave03_SP_TopBanner_1242x450_1.jpg',
            price: '$0.00',
            link: '#'
        },
    ]);

    useEffect(() => {
        const fetchOffers = async (url) => {
            try {
                const res = await fetch(``);
                const data = await res.json();
                setOffers(data.offers || []);
            } catch (error) {
                console.error("Failed to fetch offers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="px-4 pt-6 pb-20 bg-gray-50 min-h-screen">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Amazon Deals</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {offers.map((offer, index) => (
                    <a
                        href={offer.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        className="bg-white p-3 rounded-lg shadow-md flex flex-col hover:shadow-lg transition duration-200"
                    >
                        <img
                            src={offer.image}
                            alt={offer.title}
                            className="rounded-md w-full h-40 object-cover mb-3"
                        />
                        <div className="flex flex-col justify-between flex-grow">
                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                                {offer.title}
                            </h3>
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 line-clamp-2">{offer.description}</p>
                                <p className="text-md font-bold text-green-600 mt-1">{offer.price}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
