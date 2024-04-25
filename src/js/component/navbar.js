import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context)

	return (
		<div className="container d-flex justify-content-center p-3">
			<Link to="/">
			<img className="col-6 col-lg-1"
					src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F6c%2FStar_Wars_Logo.svg%2F2560px-Star_Wars_Logo.svg.png&f=1&nofb=1&ipt=473bcf95a9524665a86644a583c3c34fe4297820e52b80554c69baeaf042ffc7&ipo=images"
				/>
			</Link>
			<div className="dropdown">
				<button className="btn btn-warning btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Favorites
					<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
						{store.favorites.length}
					</span>
				</button>
					<ul className="dropdown-menu dropdown-menu-end">
					{store.favorites.length > 0
						? store.favorites.map((item, index) => (
							<li className="d-flex justify-content-between px-3 text-warning" key={item.uid}>
									<Link to={'/' + item.category + '/' + item.uid}
										className="text-warning link-underline link-underline-opacity-0">
											{item.name}
									</Link>
								<i className="fas fa-ban"
									onClick={() => actions.removeFavorite(item.uid)}></i>
							</li>))
						: <li className="px-3 text-secondary text-center">
							<p>empty</p>
						  </li>}
					</ul>
			</div>
		</div>
	);
};