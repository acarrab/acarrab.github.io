/* Auto generated tsx */

import React from "react";
import ReactMarkdown from "react-markdown";
import { Route, Switch } from "react-router-dom";

export class Page {
    source: string
    name: string
    route: string 
}
export class Directory {
    title: string
    pages: Array<Page>
    children: Array<Directory>
}

export var Content: Directory = {
    title: 'Content',
    pages: [
        {
            name: 'Home',
            source: '../CompiledContent/_.html',
            route: '/'
        },
        {
            name: 'Cv',
            source: '../CompiledContent/cv_.html',
            route: '/cv'
        },
        {
            name: 'About',
            source: '../CompiledContent/about_.html',
            route: '/about'
        }
    ],
    children: [
        {
            title: 'Projects',
            pages: [
                {
                    name: 'Topic Modeling And Hypothesis Generation',
                    source: '../CompiledContent/topic_modeling_and_hypothesis_generation_.html',
                    route: '/projects/topic_modeling_and_hypothesis_generation'
                },
                {
                    name: 'Multi-Robot Environment',
                    source: '../CompiledContent/multi-robot_environment_.html',
                    route: '/projects/multi-robot_environment'
                },
                {
                    name: 'Pubsub Architecture Analysis',
                    source: '../CompiledContent/pubsub_architecture_analysis_.html',
                    route: '/projects/pubsub_architecture_analysis'
                },
                {
                    name: 'Building Websites',
                    source: '../CompiledContent/building_websites_.html',
                    route: '/projects/building_websites'
                },
                {
                    name: 'Deep Learning',
                    source: '../CompiledContent/deep_learning_.html',
                    route: '/projects/deep_learning'
                }
            ],
            children: [
            ]
        },
        {
            title: 'School Work',
            pages: [
                {
                    name: '2017 Spring | 2D Game Engine Design',
                    source: '../CompiledContent/2017_Spring_2D_Game_Engine_Design_.html',
                    route: '/school_work/2017_Spring_2D_Game_Engine_Design'
                },
                {
                    name: '2017 Spring | Computer Graphics',
                    source: '../CompiledContent/2017_Spring_Computer_Graphics_.html',
                    route: '/school_work/2017_Spring_Computer_Graphics'
                },
                {
                    name: '2015 Spring | 102 Raytracer',
                    source: '../CompiledContent/2015_Spring_102_RayTracer_.html',
                    route: '/school_work/2015_Spring_102_RayTracer'
                },
                {
                    name: 'Fun Courses',
                    source: '../CompiledContent/fun_courses_.html',
                    route: '/school_work/fun_courses'
                }
            ],
            children: [
            ]
        }
    ]
}

function htmlOf(text) {
    return (
        <div dangerouslySetInnerHTML={{ __html: text}}></div>
    )
}

var pageData = {
   'Home': require('../node_modules/raw-loader/index.js!../CompiledContent/_.html'),
   'Cv': require('../node_modules/raw-loader/index.js!../CompiledContent/cv_.html'),
   'About': require('../node_modules/raw-loader/index.js!../CompiledContent/about_.html'),
   'Topic Modeling And Hypothesis Generation': require('../node_modules/raw-loader/index.js!../CompiledContent/topic_modeling_and_hypothesis_generation_.html'),
   'Multi-Robot Environment': require('../node_modules/raw-loader/index.js!../CompiledContent/multi-robot_environment_.html'),
   'Pubsub Architecture Analysis': require('../node_modules/raw-loader/index.js!../CompiledContent/pubsub_architecture_analysis_.html'),
   'Building Websites': require('../node_modules/raw-loader/index.js!../CompiledContent/building_websites_.html'),
   'Deep Learning': require('../node_modules/raw-loader/index.js!../CompiledContent/deep_learning_.html'),
   '2017 Spring | 2D Game Engine Design': require('../node_modules/raw-loader/index.js!../CompiledContent/2017_Spring_2D_Game_Engine_Design_.html'),
   '2017 Spring | Computer Graphics': require('../node_modules/raw-loader/index.js!../CompiledContent/2017_Spring_Computer_Graphics_.html'),
   '2015 Spring | 102 Raytracer': require('../node_modules/raw-loader/index.js!../CompiledContent/2015_Spring_102_RayTracer_.html'),
   'Fun Courses': require('../node_modules/raw-loader/index.js!../CompiledContent/fun_courses_.html')
}
export function CompiledRoutes() {
    return (
        <Switch>
            <Route exact path='/' component={() => (htmlOf(pageData['Home']))} />
            <Route path='/cv' component={() => (htmlOf(pageData['Cv']))} />
            <Route path='/about' component={() => (htmlOf(pageData['About']))} />
            <Route path='/projects/topic_modeling_and_hypothesis_generation' component={() => (htmlOf(pageData['Topic Modeling And Hypothesis Generation']))} />
            <Route path='/projects/multi-robot_environment' component={() => (htmlOf(pageData['Multi-Robot Environment']))} />
            <Route path='/projects/pubsub_architecture_analysis' component={() => (htmlOf(pageData['Pubsub Architecture Analysis']))} />
            <Route path='/projects/building_websites' component={() => (htmlOf(pageData['Building Websites']))} />
            <Route path='/projects/deep_learning' component={() => (htmlOf(pageData['Deep Learning']))} />
            <Route path='/school_work/2017_Spring_2D_Game_Engine_Design' component={() => (htmlOf(pageData['2017 Spring | 2D Game Engine Design']))} />
            <Route path='/school_work/2017_Spring_Computer_Graphics' component={() => (htmlOf(pageData['2017 Spring | Computer Graphics']))} />
            <Route path='/school_work/2015_Spring_102_RayTracer' component={() => (htmlOf(pageData['2015 Spring | 102 Raytracer']))} />
            <Route path='/school_work/fun_courses' component={() => (htmlOf(pageData['Fun Courses']))} />
        </Switch>
    );
}