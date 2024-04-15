import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import Gallery from "./gallery";

function HomeGallery({children}) {	
	const { actions } = useContext(Context)

    return(
    <>
	<div className="row py-5">
		<h3 className="text-warning">{children}</h3>
        <Link to={"/" + children} className=" link-warning link-underline link-underline-opacity-0 link-opacity-25-hover">
			<p className="text-end">
				See All
			</p>
        </Link>
		<ul className="d-inline-flex gap-1 overflow-x-auto">
			<Gallery category={children} />
		</ul>
	</div>
	</>
	);
};

export default HomeGallery