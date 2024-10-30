import { PortfolioData } from '../../../network/models/ProfileModel';
import './portfolioCard.scss';

function Portfoliocard(data: PortfolioData) {
  return (
    <div className="card">
      <div className="categoryTitle">
        <div className="dataCategory">
          <img src="./rupee.svg" alt="icon" />
          <h1 className="categoryName">{data.category}</h1>
        </div>
        <h1
          className="dataValue"
          style={{
            marginLeft: '4px',
          }}>
          {data.totalValue}
        </h1>
      </div>
      <div
        className="divider"
        style={{
          width: '100%',
          marginTop: '8px',
          marginBottom: '6px',
        }}
      />

      {data.items.map((item) => {
        return (
          <div
            className="cardRow"
            key={item.name}
            style={{
              marginTop: '8px',
            }}>
            <div className="itemName"> {item.name} </div>
            <div>₹{item.value} </div>
          </div>
        );
      })}
    </div>
  );
}

export default Portfoliocard;
