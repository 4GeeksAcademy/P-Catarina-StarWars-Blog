import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { FindCannot } from "./component/notFound";
import { Home } from "./views/home";
import { CategoryGallery } from "./views/categoryGallery";
import { SingleCard } from "./views/single";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/:category" element={<CategoryGallery />} />
						<Route path="/:category/:id" element={<SingleCard />} />
						<Route path="*" element={<FindCannot />} />
					</Routes>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);