import { useState } from "react";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [],
			starships: [],
			planets: [],
			favorites: [],
			single: {}
		},
		actions: {
			loadData: () => {
				getActions().getSomeCharacters()
				getActions().getSomeStarships()
				getActions().getSomePlanets()
			},

			addFavorite: (singleObject, category) => {
				singleObject['category'] = category
				setStore({...getStore, favorites: [...getStore().favorites, singleObject]})
				console.log(singleObject)
			},

			removeFavorite: (id) => {
				const updatedFavorites = getStore().favorites.filter(item => item.uid !== id)
				console.log(updatedFavorites)
				setStore({...getStore, favorites: updatedFavorites})
			},

			removeItem: (category, id) => {
				const updatedCategory = getStore()[category].filter(item => item.uid !== id)
				setStore({...getStore, [category]: updatedCategory})
			},

			getSomeCharacters: () => {
				fetch(`https://www.swapi.tech/api/people`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json"
					}
				}).then(response => {
					if(response.ok) return response.json()
					throw Error(response.status)
				}).then((dataObject) => {
					setStore({...getStore, characters: dataObject.results})
				}).catch(err => {
					console.log(err)
				})
			},

			getSomeStarships: () => {
				fetch(`https://www.swapi.tech/api/starships`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json"
					}
				}).then(response => {
					if(response.ok) return response.json()
					throw Error(response.status)
				}).then((dataObject) => {
					setStore({...getStore, starships: dataObject.results})
				}).catch(err => {
					console.log(err)
				})
			},

			getSomePlanets: () => {
				fetch(`https://www.swapi.tech/api/planets`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json"
					}
				}).then(response => {
					if(response.ok) return response.json()
					throw Error(response.status)
				}).then((dataObject) => {
					setStore({...getStore, planets: dataObject.results})
				}).catch(err => {
					console.log(err)
				})
			},

			getCategory: (category) => {
				if(category == 'characters') return getActions().getAllCharacters()
				if(category == 'starships') return getActions().getAllStarships()
				if(category == 'planets') return getActions().getAllPlanets()
			},

			getAllCharacters: () => {
				const charactersFetch = [
					fetch(`https://www.swapi.tech/api/people?page=1&limit=10`),
					fetch(`https://www.swapi.tech/api/people?page=2&limit=10`),
					fetch(`https://www.swapi.tech/api/people?page=3&limit=10`),
					fetch(`https://www.swapi.tech/api/people?page=4&limit=10`),
					fetch(`https://www.swapi.tech/api/people?page=5&limit=10`),
					fetch(`https://www.swapi.tech/api/people?page=6&limit=10`),
					fetch(`https://www.swapi.tech/api/people?page=7&limit=10`),
					fetch(`https://www.swapi.tech/api/people?page=8&limit=10`),
					fetch(`https://www.swapi.tech/api/people?page=9&limit=10`)
				]

				Promise.all(charactersFetch, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json"
					}
				}).then(responses => {
					return Promise.all(responses.map(response => {
						if(response.ok) return response.json()
					}))
				}).then((arrayDataObject) => {
					const newData = []
					arrayDataObject.map(dataObject => newData.push(...dataObject.results))
					setStore({...getStore, characters: newData})
				}).catch(err => {
					console.log(err)
				})
			},

			getAllStarships: () => {
				const starshipsFetch = [
					fetch(`https://www.swapi.tech/api/starships?page=1&limit=10`),
					fetch(`https://www.swapi.tech/api/starships?page=2&limit=10`),
					fetch(`https://www.swapi.tech/api/starships?page=3&limit=10`),
					fetch(`https://www.swapi.tech/api/starships?page=4&limit=10`)
				]

				Promise.all(starshipsFetch, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json"
					}
				}).then(responses => {
					return Promise.all(responses.map(response => {
						if(response.ok) return response.json()
					}))
				}).then((arrayDataObject) => {
					const newData = []
					arrayDataObject.map(dataObject => newData.push(...dataObject.results))
					setStore({...getStore, starships: newData})
				}).catch(err => {
					console.log(err)
				})
			},

			getAllPlanets: () => {
				const planetsFetch = [
					fetch(`https://www.swapi.tech/api/planets?page=1&limit=10`),
					fetch(`https://www.swapi.tech/api/planets?page=2&limit=10`),
					fetch(`https://www.swapi.tech/api/planets?page=3&limit=10`),
					fetch(`https://www.swapi.tech/api/planets?page=4&limit=10`),
					fetch(`https://www.swapi.tech/api/planets?page=5&limit=10`),
					fetch(`https://www.swapi.tech/api/planets?page=6&limit=10`),
				]

				Promise.all(planetsFetch, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json"
					}
				}).then(responses => {
					return Promise.all(responses.map(response => {
						if(response.ok) return response.json()
					}))
				}).then((arrayDataObject) => {
					const newData = []
					arrayDataObject.map(dataObject => newData.push(...dataObject.results))
					setStore({...getStore, planets: newData})
				}).catch(err => {
					console.log(err)
				})
			},

			getSingle: (category, id) => {
				if(category == 'characters') category = 'people'

				fetch(`https://www.swapi.tech/api/${category}/${id}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json"
					}
				}).then(response => {
					if(response.ok) return response.json()
					throw Error(response.status)
				}).then((object) => {
					setStore({...getStore, single: object.result})
				}).catch(err => {
					console.log(err)
				})
			},
		}
	};
};

export default getState;