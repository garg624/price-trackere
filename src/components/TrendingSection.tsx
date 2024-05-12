


import CardsWrapper from './CardWrapper';

const TrendingSection = () => {
    return (
        <>
            <h1 className='text-4xl m-4 font-bold'>Trending...</h1>
            <div className="grid grid-cols-1 m-2 md:grid-cols-3 lg:grid-cols-4 grid-auto-rows-minmax(200px, auto) gap-4">
                <CardsWrapper/>
            </div>
        </>
    )
}















export default TrendingSection