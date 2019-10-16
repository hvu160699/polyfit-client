import React from "react";
import { Switch } from "react-router-dom"
import * as path from "./router.config";
import ScrollToTopRoute from "./router.scrollToTop"
import Page404 from "../components/pages/404";
import HomePage from "../components/pages/home/home";
import LevelPage from "../components/pages/level/level";
import Exercises from "../components/pages/exercises/exercises";

const RouterIndex = (
    <Switch>
        <ScrollToTopRoute exact path={path.home} component={HomePage} />
        <ScrollToTopRoute exact path={path.level} component={LevelPage} />
        <ScrollToTopRoute exact path={path.exercises} component={Exercises} />
        <ScrollToTopRoute component={Page404} />
    </Switch>
);

export default RouterIndex;

