use serde::{Deserialize, Serialize};
use yew::prelude::*;

#[derive(Clone, Deserialize, PartialEq, Properties, Serialize)]
pub struct PostProps {
    pub title: String,
    pub content: String,
}

#[function_component(Post)]
pub fn post(props: &PostProps) -> Html {
    let PostProps { title, content } = props;

    html! {
        <>
            <>{title}</>
            <>{content}</>
        </>
    }
}
