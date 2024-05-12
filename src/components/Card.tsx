import Image from "next/image";
import Link from "next/link";



const Card = ({ image, title, price, category, id, currency }: any) => (

    <Link
        className="bg-white shadow-md rounded-md overflow-hidden grid-cols-span"
        href={`/product/${id}`}
    >
        <Image src={image} alt={title} className="w-full h-48 object-contain" width={100} height={100}/>
        <h2 className="text-xl font-semibold mx-4 capitalize truncate">{title}</h2>
        <div className="p-4 flex justify-between">
            <p className="text-lg font-semibold mb-2 text-blue-700">{currency}{price}</p>
            <p className="text-gray-600 text-sm">{category}</p>
        </div>
    </Link>
);

export default Card;