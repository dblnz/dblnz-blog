use yew::prelude::*;
use yew_router::prelude::*;

use crate::home::Home;
use crate::not_found::NotFound;
use crate::view::{ViewPost, ViewProps};

#[derive(Clone, Routable, PartialEq)]
pub enum Route {
    #[at("/")]
    HomePage,
    #[at("/view/:id")]
    ViewPostPage { id: AttrValue },
    #[not_found]
    #[at("/404")]
    PageNotFound,
}

fn switch(route: Route) -> Html {
    match route {
        Route::HomePage => html! { <Home /> },
        Route::ViewPostPage { id } => {
            let props = ViewProps { id };

            html! { <ViewPost ..props />}
        }
        Route::PageNotFound => html! { <NotFound /> },
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
