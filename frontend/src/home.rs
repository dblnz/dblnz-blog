use gloo::net::http::Request;
use yew::prelude::*;
use wasm_bindgen_futures::spawn_local;

use crate::post::{Post, PostProps};

#[function_component(Home)]
pub fn home() -> Html {
    let message = use_state(|| "".to_string());
    let posts = use_state(Vec::new);

    let get_posts = {
        let posts = posts.clone();
        let message = message.clone();

        Callback::from(move |_| {
            let posts = posts.clone();
            let message = message.clone();

            spawn_local(async move {
                match Request::get("http://127.0.0.1:8000/api/v1/posts").send().await {
                    Ok(resp) if resp.ok() => {
                        let fetched_posts: Vec<PostProps> = resp.json().await.unwrap_or_default();
                        println!("{:?}", fetched_posts);
                        posts.set(fetched_posts);
                        message.set("Fetched posts".into());
                    }

                    _ => message.set("Failed to fetch posts".into()),
                }
            });
        })
    };

    html! {
        <div class="container mx-auto p-4">
            <h1 class="text-4xl font-bold text-blue-500 mb-4">{ "Posts" }</h1>
                <div class="mb-4">
                        if !message.is_empty() {
                        <p class="text-green-500 mt-2">{ &*message }</p>
                    }
                </div>

                <button
                    onclick={get_posts.reform(|_| ())}  
                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
                >
                    { "Fetch User List" }
                </button>

                <h2 class="text-2xl font-bold text-gray-700 mb-2">{ "Posts List" }</h2>

                <ul class="list-disc pl-5">
                    {
                        for (*posts).iter().map(
                            |post| {
                                let PostProps {id, title, date, desc, content} = &post;
                                html! {
                                    <li class="mb-2">
                                        <span class="font-semibold">{ format!("ID: {}", id) }</span>
                                        <Post id={id.clone()} title={title.clone()} date={date.clone()} desc={desc.clone()} content={content.clone()} />
                                    </li>
                                }
                            }
                        )
                    }
                </ul>
        </div>
    }
}

