mod app;
mod post;

use app::App;

fn main() {
    yew::Renderer::<App>::new().render();
}

