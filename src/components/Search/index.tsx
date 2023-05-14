import React from 'react'
import debounce from 'lodash.debounce';
import Context from '../../context'
import { useDispatch, useSelector } from 'react-redux';
import { setVisibility } from '../../redux/slices/searchSlice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const searchVisible = useSelector((state: any) => state.search.visibility);
  const { setSearchValue }: any = React.useContext(Context);
  const [ inputValue, setInputValue ] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      setSearchValue(str);
    }, 500), [],
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClickClose = () => {
    dispatch(setVisibility(false));
  };

  return (
    <div className={`search ${searchVisible ? 'active' : ''}`}>
      <div className="search__items">
      <div className="search__body">
        <input 
          placeholder='Поиск по пиццам' 
          type="text" 
          className='input' 
          ref={inputRef}
          value={inputValue} 
          onChange={(e) => {
            onChangeInput(e);
          }}
        />
        <button 
          className={inputValue === '' || inputValue === ' ' ? 'reset-input' : 'reset-input active'}
          onClick={() => {
            setSearchValue('');
            setInputValue('');
            inputRef.current?.focus();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
        </button>
      </div>
      <button onClick={onClickClose} type='button' className="search__close"></button>
      </div>
    </div>
  )
}

export default Search