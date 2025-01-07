use gloo::net::http::Request;
use yew::prelude::*;
use wasm_bindgen_futures::spawn_local;

use crate::post::PostFullProps;

#[derive(Clone, PartialEq, Properties)]
pub struct ViewProps {
    pub id: AttrValue,
}

#[function_component(ViewPost)]
pub fn view_post(props: &ViewProps) -> Html {
    let ViewProps { id } = &props;    

    let message = use_state(String::new);
    let post = use_state(|| None);

    {
        let post = post.clone();
        let id = id.clone();

        use_effect_with((), move |_| {
            let posts = post.clone();
            let id = id.clone();

            if post.is_none() {
                wasm_bindgen_futures::spawn_local(async move {
                    let fetched_post: PostFullProps = Request::get(&format!("http://127.0.0.1:8000/api/v1/post/{}", id))
                        .send()
                        .await
                        .unwrap()
                        .json()
                        .await
                        .unwrap();

                    posts.set(Some(fetched_post));
                });
            }
        });
    }

    html! {
        <div>
            {
                if let Some(PostFullProps {id, title, date, desc, content}) = post.as_ref() {
                    html! {
                        <>
                            {id}
                            {title}
                            {date}
                            {desc}
                            {content}
                        </>
                    }
                }
                else {
                    html! {
                        <>{"EMPTY"}</>
                    }
                }
            }
        </div>
    }
}
