import PropTypes from 'prop-types';
import { useContentStore } from "../store/content"
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);

  const sliderRef = useRef();

  const formattedContentType = contentType === 'movie' ? "Movies" : "TV Shows";
  const formattedCategoryName = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
  
    useEffect(() => {
        const getContent = async () => {
            const res = await axios.get(`/api/v1/${contentType}/${category}`);
            setContent(res.data.content);
        };

        getContent();
    }, [contentType, category]);
    
    const scrollLeft = () => {
        if(sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' })
    }
    
   return (
    <div className="bg-black text-white relative px-5 md:px-20"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
    >
        <h2>
            {formattedCategoryName} {formattedContentType}
        </h2>

        <div className="flex space-x-4 overflow-x-auto scrollbar-hide" ref={sliderRef}>
            {content?.map((item) => (
                <Link key={item?.id} to={`/watch/${item?.id}`} className='min-w-[250px] relative group'>
                    <div className="rounded-lg overflow-hidden">
                        <img 
                            src={`${SMALL_IMG_BASE_URL}${item?.backdrop_path}`}
                            alt={item?.name}
                            loading='lazy'
                            decoding='async'
                            className='transition-transform duration-300 ease-in-out group-hover:scale-125'
                        />
                    </div>

                    <p className="mt-2 text-center">
                        {item?.title || item?.name}
                    </p>
                </Link>
            ))}
        </div>

        {showArrows && (
            <>
                <button onClick={scrollLeft} className='absolute top-1/2 -translate-y-1/2 left-5 md:left-20 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-black-opacity-75 text-white z-10'>
                    <ChevronLeft size="24" />
                </button>

                <button onClick={scrollRight} className='absolute top-1/2 -translate-y-1/2 right-5 md:right-20 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-black-opacity-75 text-white z-10'>
                    <ChevronRight size="24" />
                </button>
            </>
        )}
    </div>
  )
}

MovieSlider.propTypes = {
    category: PropTypes.string.isRequired
}

export default MovieSlider