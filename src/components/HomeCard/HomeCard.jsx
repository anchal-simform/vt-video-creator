import { More } from "../../assets/icons/More";
import { Clock } from "../../assets/icons/Clock";
import { ProfileCircle } from "../../assets/icons/ProfileCircle";
import "./HomeCard.scss";

function HomeCard(props) {
  const { image, title, edited, author } = props;
  return (
    <div className="homecard">
      <div className="homecard__img">
        <img src={image} alt="" />
      </div>
      <div className="homecard__title">
        <p>{title}</p>
        <More />
      </div>
      {edited && (
        <div className="homecard__edited">
          <Clock size={20} color="#999" /> <span>Last edited: {edited}</span>
        </div>
      )}
      {author && (
        <div className="homecard__author">
          <ProfileCircle /> <span>Edited by: {author}</span>
        </div>
      )}
    </div>
  );
}

export default HomeCard;
