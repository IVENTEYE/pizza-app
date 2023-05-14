import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSort } from '../../redux/slices/filterSlice';

type SortItem = {
  name: string;
  sortProperty: string;
};

export const sortCategories: SortItem[] = [
  {name: "популярности", sortProperty: 'rating'}, 
  {name: "цене", sortProperty: 'price'}, 
  {name: "алфавиту", sortProperty: 'title'}];

function Sort() {
  const [sortOpen, setSortOpen] = React.useState(false);
  const dispath = useDispatch();
  const sort = useSelector((state: any) => state.filter.sort);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const changeSortType = (obj: SortItem) => {
    dispath(setActiveSort(obj));
  }

  React.useEffect(() => {
    const clickOutSort = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setSortOpen(false);
      }
    };

    document.body.addEventListener('click', clickOutSort);

    return () => document.body.removeEventListener('click', clickOutSort);
  }, []);

  return (
    <div ref={sortRef} className={sortOpen ? 'sort active' : 'sort'}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setSortOpen(!sortOpen)}>{sort.name}</span>
      </div>
      <div className="sort__popup">
        <ul>
          {
            sortCategories.map((obj, index) => (
              <li 
                key={index}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                onClick={() => {
                  changeSortType(obj);
                  setSortOpen(false);
                }}
              >
                {obj.name}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Sort;
