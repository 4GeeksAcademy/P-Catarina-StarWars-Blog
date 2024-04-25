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
	<h5 className="card-text">Born in: {property !== undefined? property.birth_year : null}</h5>
	<h5 className="card-text">Gender: {property !== undefined? property.gender : null}</h5>
	<h5 className="card-text">Height: {property !== undefined? property.height : null}</h5>
	<h5 className="card-text">Skin: {property !== undefined? property.skin_color : null}</h5>
	<h5 className="card-text">Hair: {property !== undefined? property.hair_color : null}</h5>
	<h5 className="card-text">Eyes: {property !== undefined? property.eye_color : null}</h5>
	<h5 className="card-text">{store.single.description}</h5>
	</>

	const starshipData = <>
		<h5 className="card-text">Model: {property !== undefined? property.model : null}</h5>
		<h5 className="card-text">Class: {property !== undefined? property.starship_class : null}</h5>
		<h5 className="card-text">Manufacturer: {property !== undefined? property.manufacturer : null}</h5>
		<h5 className="card-text">Cost: {property !== undefined? property.cost_in_credits : null}</h5>
		<h5 className="card-text">Max Speed: {property !== undefined? property.max_atmosphering_speed : null}</h5>
		</>

	const planetData = <>
			<h5 className="card-text">Diameter: {property !== undefined? property.diameter : null}</h5>
			<h5 className="card-text">Rotation: {property !== undefined? property.rotation_period : null} hours</h5>
			<h5 className="card-text">Orbital: {property !== undefined? property.orbital_period : null} days</h5>
			<h5 className="card-text">Population: {property !== undefined? property.population : null}</h5>
			<h5 className="card-text">Climate: {property !== undefined? property.climate : null}</h5>
			<h5 className="card-text">Terrain: {property !== undefined? property.terrain : null}</h5>
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
			<div className="card-body d-grid row-gap-3 text-warning ">
				
				<h1 className="card-title">
					{property !== undefined? property.name : null}
				</h1>
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