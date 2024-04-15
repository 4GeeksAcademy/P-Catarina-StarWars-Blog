import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import Gallery from "../component/gallery";

export const CategoryGallery = () => {
	const { category } = useParams()

	const { store, actions } = useContext(Context)

	useEffect(() => {
		actions.getCategory(category)
	}, [store[category]])

    return(
    <>
		<h3 className="text-warning">{category}</h3>
		<ul className="row g-1 py-5">
			<Gallery category={category} />
		</ul>
	</>
	);
};