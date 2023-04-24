import ActionCard from '../ActionCard/ActionCard';
import HomeCard from '../HomeCard/HomeCard';
import { actionData, recentData, latestData } from '../../Pages/homedata';
import './HomeMain.scss';
import { Link } from 'react-router-dom';

function HomeMain() {
  return (
    <div className="homemain">
      <h1 className="homemain__title">
        Welcome Back, <span>John Doe</span>
      </h1>
      <div className="homemain__action">
        {actionData.map((item, index) => {
          if (item.title === 'Create Video') {
            return (
              <Link key={index} to="/editor">
                <ActionCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  key={index}
                />
                ;
              </Link>
            );
          }
          return (
            <ActionCard
              icon={item.icon}
              title={item.title}
              description={item.description}
              key={index}
            />
          );
        })}
      </div>
      <h2 className="homemain__subtitle">Recently Edited</h2>
      <div className="homemain__recent">
        {recentData.map((item, index) => {
          return (
            <HomeCard
              image={item.image}
              title={item.title}
              edited={item.edited}
              author={item.author}
              key={index}
            />
          );
        })}
      </div>
      <h2 className="homemain__subtitle">Explore the Latest Templates</h2>
      <div className="homemain__latest">
        {latestData.map((item, index) => {
          return <HomeCard image={item.image} title={item.title} key={index} />;
        })}
      </div>
    </div>
  );
}

export default HomeMain;
