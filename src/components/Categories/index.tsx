import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../../redux/slices/filterSlice';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];


const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state: any) => state.filter.categoryId);
  let categoriesRef = React.useRef<HTMLUListElement>(null);
  const [categoryScrool, setCategoryScroll] = React.useState({
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
  });

  React.useEffect(() => {
    const el = categoriesRef.current;

    if (el) {
      const onWheel = (e: any) => {
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 3,
          behavior: 'smooth',
        });
      };

      el.addEventListener('wheel', onWheel);

      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);

  const onMouseDown = (e) => {
    if (categoriesRef && categoriesRef.current && !categoriesRef.current.contains(e.target)) {
      return
    }
    e.preventDefault();

    setCategoryScroll({
      ...categoryScrool,
      isScrolling: true,
      clientX: e.clientX,
    });
  };

  const onMouseUp = (e: any) => {
    if (categoriesRef && categoriesRef.current && !categoriesRef.current.contains(e.target)) {
      return
    }
    e.preventDefault();

    setCategoryScroll({
      ...categoryScrool,
      isScrolling: false,
    });
  };

  const onMouseMove = (e: any) => {
    if (categoriesRef && categoriesRef.current && !categoriesRef.current.contains(e.target)) {
      return  
    }
    e.preventDefault();

    const { clientX, scrollX, isScrolling } = categoryScrool;

    if (isScrolling) {
      let scroll = scrollX + e.clientX - clientX;
      if (categoriesRef.current) {
        categoriesRef.current.scrollLeft = scroll;
      }
      setCategoryScroll({
        ...categoryScrool,
        scrollX: scroll,
        clientX: e.clientX,
      });
      console.log(e.clientX);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  });

  const onChangeCategory: (id: number) => void = (id) => {
    dispatch(setCategoryId(id));
  };

  return (
    <div className="categories">
      <ul
        ref={categoriesRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}>
        {categories.map((category, index) => {
          return (
            <li
              key={category}
              className={categoryId === index ? 'active' : ''}
              onClick={() => onChangeCategory(index)}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
