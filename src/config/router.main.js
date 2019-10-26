import React from "react";
import { Switch } from "react-router-dom"
import * as path from "./router.config";
import ScrollToTopRoute from "./router.scrollToTop"
import Page404 from "../components/pages/404";
import HomePage from "../components/pages/home/home";
import LevelPage from "../components/pages/level/level";
import Exercises from "../components/pages/exercises/exercises";
import DietsPage from "../components/pages/diets/diets";
import BodypartsPage from "../components/pages/bodyparts/bodyparts";
import MealsPage from "../components/pages/meals/meals";
import DishesPage from "../components/pages/dishes/dishes";
import IngredientsPage from "../components/pages/ingredients/ingredients";
import QuotesPage from "../components/pages/quotes/quotes";

const RouterIndex = (
    <Switch>
        <ScrollToTopRoute exact path={path.home} component={HomePage} />
        <ScrollToTopRoute exact path={path.level} component={LevelPage} />
        <ScrollToTopRoute exact path={path.exercises} component={Exercises} />
        <ScrollToTopRoute exact path={path.bodyparts} component={BodypartsPage} />
        <ScrollToTopRoute exact path={path.diets} component={DietsPage} />
        <ScrollToTopRoute exact path={path.meals} component={MealsPage} />
        <ScrollToTopRoute exact path={path.dishes} component={DishesPage} />
        <ScrollToTopRoute exact path={path.ingredients} component={IngredientsPage} />
        <ScrollToTopRoute exact path={path.quotes} component={QuotesPage} />
        <ScrollToTopRoute component={Page404} />
    </Switch>
);

export default RouterIndex;

