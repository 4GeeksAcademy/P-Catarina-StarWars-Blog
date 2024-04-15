import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

function Gallery(props) {
	const { store, actions } = useContext(Context)	

	const category = props.category;
	
    return(
    <>
		{store[category].length > 0 && store[category].map((item, index) => (
			<li className="card col-lg-3 col-md-6" key={category + item.uid}>
				<Link to ={'/' + category + '/' + item.uid}>
					<img className="card-img-top img-fluid"
						src={"https://starwars-visualguide.com/assets/img/" + category + "/" + item.uid + ".jpg"}
						onError={() => actions.removeItem(category, item.uid)}
					/>
				</Link>
				<div className="card-body d-flex justify-content-between">
					<h5 className="card-title">{item.name}</h5>
					{store.favorites.includes(item) === false
					? <i className="far fa-heart" onClick={() => actions.addFavorite(item, category)}></i>
					: <i className="fas fa-heart" onClick={() => actions.removeFavorite(item.uid)}></i>}
				</div>
			</li>
		))}
	</>
    );
};

export default Gallery