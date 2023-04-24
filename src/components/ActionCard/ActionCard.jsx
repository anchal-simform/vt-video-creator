import './ActionCard.scss';

function ActionCard(props) {
  const { icon, title, description, action } = props;
  return (
    <div className="actioncard" onClick={action}>
      <div className="actioncard__icon">{icon}</div>
      <div className="actioncard__content">
        <p>{title}</p>
        <span>{description}</span>
      </div>
    </div>
  );
}

export default ActionCard;
