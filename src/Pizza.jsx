const Pizza = (props) => {
  return (
    <div className="pizza">
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <img
        src={props.image ? props.image : "https://picsum.photos/100"}
        alt={props.name ? props.name : "Default pizza image"}
      />
    </div>
  );
};

export default Pizza;
