// use "p" to avoid later errors
class p {
    static Home = "Home";
    static About = "About";
    static Contact = "Contact";
}

export class Page {
    
    public name:string;
    public route:string;
    public connectionNames: Array<string>;

    public constructor(name:string, route:string, connectionNames?: Array<string>) {
        this.name = name;
        this.route = route;
        if (connectionNames !== undefined) {
            this.connectionNames = connectionNames;
        } else {
            this.connectionNames = [];
        }
    }
}

export default class Pages {

    private static instance: Pages;
    static getInstance():Pages {
        if (Pages.instance === undefined || Pages.instance === null) {
            Pages.instance = new Pages();
        }
        return Pages.instance;
    }

    private homePage: string;
    public getHomePage(): string {
        return this.homePage.slice();
    }
    
    private currentRoute: string;
    private routeSubscriptions: { [route:string]: { [id:number]:(isActive:boolean) => void } } = {};
    
    public getCurrentRoute(): string {
        return this.currentRoute.slice();
    }


    private alertRoute(route:string, isActive:boolean) {
        for (let routeId in this.routeSubscriptions[route]) {
            this.routeSubscriptions[route][routeId](isActive);
        }
    }
    private alertAll( oldRoute:string, newRoute:string) {
        if (newRoute === oldRoute) return;
        this.alertRoute(oldRoute, false);
        this.alertRoute(newRoute, true);
    }

    
    public setCurrentRoute(route:string) {
        this.alertAll(this.currentRoute, route);
        this.currentRoute = route.slice();
    }
    /**
     * 
     * @param route route that you want to subscribe to
     * @param callback the callback that is called when switched to and from this route
     * @return returns subscription id that is used to unsubscribe later
     */

    // could make this have an alternate data structure with numbers we can definitely use 
    // after deleted, but it probably wont be used for that many things
    public subscribeToRoute(route:string, callback:(isActive:boolean) => void):number {
        let id = -1;
        if (this.routeSubscriptions[route] === undefined) {
            this.routeSubscriptions[route] = { 0:callback };
            id = 0
        } else {
            id = 0
            while (this.routeSubscriptions[route][id] !== undefined) {
                id++;
            }
            this.routeSubscriptions[route][id] = callback;
        }
        // call route and tell it whether it is active
        callback(route === this.currentRoute);
        return id;
    }

    public unsubscribeToRoute(route:string, subscriptionId: number) {
        if (this.routeSubscriptions[route][subscriptionId] !== undefined) {
            delete this.routeSubscriptions[route][subscriptionId];
        }
    }

    
    
    private pages: Array<Page>;
    public get(index:number): Page {
        return this.pages[index];
    }

    public indexOf(name:string):number {
        let results = this.pages.filter((page) => (page.name === name));
        return results.length > 0 ? this.pages.indexOf(results[0]) : -1;
    }
    
    private constructor() {
        this.homePage = p.Home;
        this.currentRoute = "/";
        this.pages = [
            new Page(p.Home, "/", [p.About]),
            new Page(p.About, "/about", [p.Contact]),
            new Page(p.Contact, "/contact", [])
        ];
        this.fixPages();
    }

    private fixPages() {
        let wasVague = false;
        if (this.pages.length < 1) {
            throw "There should be at least the home page";
        }
        
        let myThis = this;
        
        this.pages.forEach(currentPage => {
            // go through pages friends and see if they contain myself
            currentPage.connectionNames.forEach(pageName => {
                let pageIndex = myThis.indexOf(pageName);
                // this is a failure if it doesn't exist anywhere
                if (pageIndex === -1) {
                    console.error("Page " + pageName + " does not exist, which was referenced by " + currentPage.name);
                    wasVague = true;
                    return;
                } 
                // if it doesn't exist then we add ourself
                if (this.pages[pageIndex].connectionNames.indexOf(currentPage.name) === -1) {
                    this.pages[pageIndex].connectionNames.push(currentPage.name);
                }
            });
        });
        
        if (wasVague) {
            throw new Error("Failed to fix page problems");
        }
    }

}