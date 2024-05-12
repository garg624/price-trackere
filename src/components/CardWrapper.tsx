import { Suspense, useCallback, useEffect, useState } from 'react';
import CardSkeleton from './CardSkeleton';
import { getAllProducts } from '@/actions';
import Card from './Card';
import { toast } from 'sonner';

 export interface ProductInterFace {
  _id: string;
  category: string;
  currency: string;
  image: string;
  lowestPrice: number;
  title: string;
}

const CardsWrapper = () => {
  const [products, setProducts] = useState<ProductInterFace[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const data: ProductInterFace[] = await getAllProducts();
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("There is an error while getting all trending products")
      // Display an error message to the user
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if(products.length == 0){
    return(
      [1, 2, 3, 4].map((id) => (
        <CardSkeleton key={id} />
      ))
    )
  }
 

  return (
    <Suspense
      fallback={
        [1, 2, 3, 4].map((id) => (
          <CardSkeleton key={id} />
        ))
      }
    >
      {products.map((prod) => (
        <Card 
        id={prod._id} 
        key={prod._id} 
        image={prod.image} 
        title={prod.title} 
        price={prod.lowestPrice} 
        category={prod.category} 
        currency={prod.currency} 
        className="col-span-1" />
      ))}
    </Suspense>
  );
};

export default CardsWrapper;