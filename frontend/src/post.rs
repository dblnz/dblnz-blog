use gloo::net::http::Request;
use serde::{Deserialize, Serialize};
use yew::prelude::*;
use yew_router::hooks::use_navigator;
use wasm_bindgen_futures::spawn_local;

use crate::app::Route;

#[derive(Clone, Debug, Default, Deserialize, PartialEq, Properties, Serialize)]
pub struct PostShortProps {
    pub id: u32,
    pub title: String,
    pub date: String,
    pub desc: String,
}


#[derive(Clone, Debug, Default, Deserialize, PartialEq, Properties, Serialize)]
pub struct PostFullProps {
    pub id: u32,
    pub title: String,
    pub date: String,
    pub desc: String,
    pub content: String,
}

#[function_component(Post)]
pub fn post(props: &PostShortProps) -> Html {
    let navigator = use_navigator().unwrap();
    let PostShortProps { id, title, date, desc } = &props;
    let id = id.clone();


    let onclick = {
        let navigator = navigator.clone();

        Callback::from(move |_| {
            let navigator = navigator.clone();
            navigator.push(&Route::ViewPostPage { id: id.to_string().into() });
        })
    };

    html! {
        <a
            {onclick}
            href={ format!("/view/{id}") }
        >
            <>{title}</>
            <>{date}</>
            <>{desc}</>
        </a>
    }
}
