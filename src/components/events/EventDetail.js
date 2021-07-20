import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./AnimalProvider"
import "./Event.css"
import { useParams, useHistory } from "react-router-dom"

export const EventDetail = () => {
  const { getEventById, releaseAnimal } = useContext(AnimalContext)

	const [animal, setAnimal] = useState({})

	const {animalId} = useParams();

  useEffect(() => {
    console.log("useEffect", animalId)
    getAnimalById(animalId)
    .then((response) => {
      setAnimal(response)
    })
  }, [])

const history = useHistory()

const handleRelease = () => {
    releaseAnimal(animal.id)
      .then(() => {
        history.push("/animals")
      })
  }

  return (
    <section className="animal">
      <h3 className="animal__name">{animal.name}</h3>
      <div className="animal__breed">{animal.breed}</div>
      {/*Question mark: Tries to find property, skips it if DNE. Otherwise nested trying to access property of undefined obj would blow up.*/}
      <div className="animal__location">Location: {animal.location?.name}</div>
      <div className="animal__owner">Customer: {animal.customer?.name}</div>
      <br />
      <button onClick={handleRelease}>Release Animal</button>
      <button onClick={() => {
          history.push(`/animals/edit/${animal.id}`)
      }}>Edit</button>
    </section>
  )
}
