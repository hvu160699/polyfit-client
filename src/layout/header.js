import React from 'react'
import { Link } from 'react-router-dom'
import * as path from '../config/router.config'

const Header = () => {
    return (
        <div className="container">
            <ul className="nav justify-content-center">
                <li className="nav-brand">
                    <Link className="nav-link" to={path.home}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={path.level}>Level</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={path.exercises}>Exercises</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={path.bodyparts}>Bodyparts</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={path.diets}>Diets</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={path.meals}>Meals</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={path.dishes}>Dishes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={path.ingredients}>Ingredients</Link>
                </li>
            </ul>

        </div>
    )
}

export default Header;
