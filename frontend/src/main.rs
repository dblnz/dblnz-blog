mod app;
mod home;
mod not_found;
mod post;
mod view;

use app::App;

fn main() {
    yew::Renderer::<App>::new().render();
}

