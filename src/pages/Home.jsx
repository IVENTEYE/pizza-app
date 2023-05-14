import React from 'react';
import qs from 'qs';
import Categories from '../components/Categories/index.tsx';
import Sort, { sortCategories } from '../components/Sort/index.tsx';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/index.tsx';
import Context from '../context';
import Pagination from '../components/Pagination/index.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import Info from '../components/Info/index.tsx';

function Home() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const { items, status } = useSelector((state) => state.pizzas);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  // const [pizzas, setPizzas] = React.useState([]);
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const pageCount = useSelector((state) => state.filter.pageCount);

  const { searchValue } = React.useContext(Context);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '',
      sortBy = sortType,
      order = sortType === 'title' ? 'asc' : 'desc',
      search = searchValue ? `&search=${searchValue}` : '';

    // await axios
    //   .get(
    //     `https://6358109bc26aac906f3ad42c.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    //   )
    //   .then((res) => {
    //     try {
    //       setPizzas(res.data);
    //       setIsLoading(false);
    //     } catch {
    //       console.log('error');
    //       setIsLoading(false);
    //     }
    //   });

    dispatch(fetchPizzas({ category, sortBy, order, search, pageCount }));
  };

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortProperty: sortType,
          categoryId,
          pageCount,
        },
        { addQueryPrefix: true },
      );

      navigate(`${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, pageCount]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortCategories.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);
  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    // fetch(
    //   `https://6358109bc26aac906f3ad42c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setPizzas(json);
    //     setIsLoading(false);
    //   });
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, pageCount]);

  const pizzaCards = items
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        ((
          <Info
            image="/img/pizzas__warning.png"
            title="Не далось загрузить пиццы"
            text="Проверьте подключение к Интернету и порпобуйте снова."
          />
        ): null)
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : pizzaCards}
        </div>
      )}
      {status === 'success' && <Pagination pageCount={pageCount} />}
    </div>
  );
}

export default Home;
