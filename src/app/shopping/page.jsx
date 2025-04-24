'use client';

import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import { API_BASE_URL, API_KEY } from '../utils/apiConfig';
import Slider from "react-slick";

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
    const [banner, setbanner] = useState([
        'https://m.media-amazon.com/images/G/31/AmazonBusiness/980_AB_GIF_Wave03_SP_TopBanner_1242x450_1.jpg',
        'https://m.media-amazon.com/images/G/31/AmazonBusiness/980_AB_GIF_Wave03_SP_TopBanner_1242x450_1.jpg',
        'https://m.media-amazon.com/images/G/31/AmazonBusiness/980_AB_GIF_Wave03_SP_TopBanner_1242x450_1.jpg',
    ]);
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const amazonProductDetails = async (url) => {
        try {
            const res = await fetch(`https://api.scraperapi.com/?api_key=${API_KEY}&url=${url}&output_format=json&autoparse=true&country_code=in&device_type=desktop`)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                });
            const data = await res.json();
            console.log("Response: ", data);
            return data;
        } catch (error) {
            console.log("Failed to fetch product details:", error);
            return null;
        }
    };

    const fetchOffers = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/platform/deals/Amazon`);
            const data = await res.json();
            if (data.data != null && data.data.home_page_banner_images != null) {
                setbanner(data.data.home_page_banner_images);
            }
            if (data.data != null && data.data.products != null) {
                const products = data.data.products;
                const deals = [];
                Object.keys(products).forEach(async (key) => {
                    const product = products[key];
                    const productObject = await amazonProductDetails(URL.parse(product.url).href);
                    if (productObject == null) return;
                    deals.push({
                        title: productObject.name,
                        description: productObject.full_description,
                        image: productObject.images[0],
                        price: productObject.pricing,
                        link: product.url
                    });
                });
                setOffers(deals);
            }
        } catch (error) {
            console.log("Failed to fetch offers:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="px-4 pt-6 pb-20 bg-gray-50 min-h-screen">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Amazon Deals</h2>

            <Slider {...sliderSettings} className='mb-5'>
                {banner.map((img, index) => (
                    <div key={index} className="px-2">
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-3 flex flex-col hover:shadow-lg transition duration-200"
                        >
                            <img
                                src={img}
                                width="20"
                                alt="Offer Banner"
                                className="rounded-md w-full max-h-60 mb-5"
                            />
                        </a>
                    </div>
                ))}
            </Slider>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
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
