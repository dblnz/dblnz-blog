use yew::prelude::*;
use yew_router::prelude::*;

use crate::home::Home;

#[derive(Clone, Routable, PartialEq)]
enum Route {
    #[at("/")]
    HomePage,
}

fn switch(route: Route) -> Html {
    match route {
        Route::HomePage => html! { <Home /> },
    }
}

#[function_component(App)]
pub fn app() -> Html {
    html! {
        <BrowserRouter>
            <Switch<Route> render={switch} /> // <- Must be child of <BrowserRouter>
        </BrowserRouter>
    }
}
