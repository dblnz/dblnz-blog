use serde::{Deserialize, Serialize};
use yew::prelude::*;

#[derive(Clone, Debug, Deserialize, PartialEq, Properties, Serialize)]
pub struct PostProps {
    pub id: u32,
    pub title: String,
    pub date: String,
    pub desc: String,
    pub content: String,
}

#[function_component(Post)]
pub fn post(props: &PostProps) -> Html {
    let PostProps { id, title, date, desc, content } = props;

    html! {
        <a
            href={ format!("/view/{id}") }
        >
            <>{title}</>
            <>{date}</>
            <>{desc}</>
            <>{content}</>
        </a>
    }
}
