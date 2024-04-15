import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SingleCard = () => {
	const {category, id} = useParams()

	const { store, actions } = useContext(Context)

	const [ property , setProperty ] = useState({})

	useEffect(() => {
		actions.getSingle(category, id)
		setProperty(store.single.properties)
	}, [store.single.properties])

	const characterData = <>
	<p className="card-text">Born in: {property !== undefined? property.birth_year : null}</p>
	<p className="card-text">Height: {property !== undefined? property.height : null}</p>
	<p className="card-text">{store.single.description}</p>
	</>

	const starshipData = <>
		<p className="card-text">Model: {property !== undefined? property.model : null}</p>
		<p className="card-text">Class: {property !== undefined? property.starship_class : null}</p>
		<p className="card-text">Manufacturer: {property !== undefined? property.manufacturer : null}</p>
		<p className="card-text">Cost: {property !== undefined? property.cost_in_credits : null}</p>
		<p className="card-text">Max Speed: {property !== undefined? property.max_atmosphering_speed : null}</p>
		</>

	const planetData = <>
			<p className="card-text">Diameter: {property !== undefined? property.diameter : null}</p>
			<p className="card-text">Rotation: {property !== undefined? property.rotation_period : null} hours</p>
			<p className="card-text">Orbital: {property !== undefined? property.orbital_period : null} days</p>
			<p className="card-text">Population: {property !== undefined? property.population : null}</p>
			<p className="card-text">Climate: {property !== undefined? property.climate : null}</p>
			<p className="card-text">Terrain: {property !== undefined? property.terrain : null}</p>
			</>

	return (
		<>
		<div className="card mb-3">
		<div className="row g-0">
			<div className="col">
				<img className="img-fluid rounded-start"
				src={"https://starwars-visualguide.com/assets/img/" + category + "/" + id + ".jpg"} />
			</div>
			<div className="col-8 ps-4">
			<div className="card-body text-warning">
				
				<h2 className="card-title">
					{property !== undefined? property.name : null}
				</h2>
					{ /* conditional rendereing - Single Info */
					category == 'characters'? characterData
					: category == 'starships'? starshipData
					: category == 'planets'? planetData
					: null
					}
			</div>
			</div>
		</div>
		</div>
		</>
	);
};