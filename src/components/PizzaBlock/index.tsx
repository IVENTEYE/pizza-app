import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

type PizzaProps = {
  id: number;
  title: string;
  imageUrl: string;
  types: number;
  sizes: number[];
  price: number[];
};

const PizzaBlock: React.FC<PizzaProps> = ({ id, title, imageUrl, types, sizes, price }) => {
  const dispatch = useDispatch();

  const [activePizzaType, setActivePizzaType] = useState(null);
  const [activePizzaSize, setActivePizzaSize] = useState(null);
  const typeNames = ['тонкое', 'традиционное'];

  const cartItem = useSelector((state: any) => state.cart.items.find((obj) => obj.id === id && obj.type === typeNames[activePizzaType] && obj.size === sizes[activePizzaSize]));
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      uid: Math.random().toFixed(3),
      imageUrl,
      title,
      type: typeNames[activePizzaType],
      size: sizes[activePizzaSize],
      price,
    };

    dispatch(
      addItem(item)
    );
  };

  const mooveBar = (e) => {
    const item = e.target;
    const widthItem = item.offsetWidth;
    const itemParent = item.parentNode;
    const mooveBar = itemParent.querySelector('.mooveBar');
    const itemPosition = item.offsetLeft;
    mooveBar.style.width = widthItem + 'px';
    mooveBar.style.left = itemPosition + 'px';
    setTimeout(() => {
      mooveBar.classList.add('active');
    }, 100);
  };
  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt={title} />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li
              className={activePizzaType === type || types.length === 1 ? 'active' : null}
              onClick={(e) => {
                setActivePizzaType(type);
                mooveBar(e);
              }}>
              {typeNames[type]}
            </li>
          ))}
          <div className="mooveBar"></div>
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              className={activePizzaSize === index ? 'active' : null}
              onClick={(e) => {
                setActivePizzaSize(index);
                mooveBar(e);
              }}>
              {size} см.
            </li>
          ))}
          <div className="mooveBar"></div>
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          type="button"
          disabled={ activePizzaType !== null && activePizzaSize !== null ? false : true }
          className="button button--outline button--add"
          onClick={() => {
            onClickAdd();
          }}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
}

export default PizzaBlock;
