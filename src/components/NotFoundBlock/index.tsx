import React from 'react';

const NotFoundBlock: React.FC = () => {
  return (
    <div className="notfound">
      <span>😕</span>
      <h2>Страница не найдена.</h2>
      <p>К сожалению данная страница отсутствует в нашем интернет-магазине.</p>
    </div>
  );
}

export default NotFoundBlock;
