"use client"
import { scrapAndStoreProduct } from '@/actions';
import TrendingSection from '@/components/TrendingSection';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from "sonner"


const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">PriceTracker</h1>
      </div>
   
    </nav>
  );
};

const isValidAmazonProductURL = (url: string) => {
  try {
    // console.log("before parsed Url",url)
    //? just find the properties of the url given by the user.
    const parsedURL = new URL(url);
    // console.log("after parsed Url",parsedURL)
    const hostname = parsedURL.hostname;
    // console.log("Host Name",hostname)
    if(
      hostname.includes('amazon.com') || 
      hostname.includes ('amazon.') || 
      hostname.endsWith('amazon') ||
      hostname.includes('amzn.in')
     
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
}


const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const router=useRouter();

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    // console.log("input before every thing",searchInput)
    // handle form submission here
    //  its your choice if you want to check if its valid or not amazon link.
    const isValidLink = isValidAmazonProductURL(searchInput);
    // console.log(isValidLink);
    if(!isValidLink) return alert('Please provide a valid Amazon link')
    const responseAction=await scrapAndStoreProduct(searchInput);
    setSearchInput("");
    console.log("client side ",responseAction)
    if(responseAction?.sucess===true){
      toast.success('Product added successfully');
    }else{
      toast.error('Product already exists');
      
    }
    router.push(`/product/${responseAction?.productId}`)



    
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center h-80  ">
      <Navbar />
      <h1 className="text-center mx-2 text-4xl font-bold text-gray-800 ">Track prices of your favorite products with ease!</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md mt-8">
        <div className="relative">
          <input
            required
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter the amazon product link..."
            className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 text-gray-800 focus:outline-none focus:border-blue-500"
            />
          <i className="fas fa-search absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"></i>
        </div>
        <button type="submit" className="w-full block bg-blue-500 text-white rounded-md py-2 mt-4 hover:bg-blue-600">Search</button>
      </form>
      {/* btn to go down to the trending section */}
    </div>
    
      <TrendingSection />
      
            </>
  );
};

export default Home;