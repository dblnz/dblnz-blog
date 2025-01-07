mod db;

use axum::extract::Path;
use axum::response::IntoResponse;
use axum::{Router, routing::get};
use axum::{Extension, Json};
use chrono::Utc;
use sqlx::migrate::MigrateDatabase;
use sqlx::{Pool, Sqlite};
use std::error::Error;
use std::net::SocketAddr;
use tokio::net::TcpListener;

use serde::{Deserialize, Serialize};
use serde_json::json;

use db::{get_post_by_id, get_posts, insert_post, setup_database};

#[derive(Debug, Deserialize, Serialize, sqlx::FromRow)]
struct Post {
    id: u32,
    title: String,
    date: String, 
    desc: String,
    content: String,
}

async fn root() -> impl IntoResponse {
    Json(json!("Ok"))
}

async fn post(
    Extension(db): Extension<Pool<Sqlite>>,
    Path(post_id): Path<String>,
) -> impl IntoResponse {
    let post_id = post_id.parse::<u32>().unwrap();

    let post = get_post_by_id(&db, post_id).await;
    println!("{:?}", post);

    Json(post)
}

async fn posts(
    Extension(db): Extension<Pool<Sqlite>>,
) -> impl IntoResponse {
    let posts = get_posts(&db).await.unwrap();

    Json(posts)
}

fn api_routes() -> Router {
    Router::new()
        .route("/", get(root))
        .route("/post/{post_id}", get(post))
        .route("/posts", get(posts))
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let pool = setup_database().await.unwrap();

    let now = Utc::now();
    insert_post(&pool,
        "New Title".to_string(),
        now.format("%a %b %e %Y").to_string(),
        "New blog post about x".to_string(),
        "We were talking about".to_string(),
    ).await;

    let router = Router::new()
        .nest("/api/v1", api_routes())
        .layer(Extension(pool));

    let addr = SocketAddr::from(([127,0,0,1], 8000));
    let tcp = TcpListener::bind(&addr).await.unwrap();

    axum::serve(tcp, router).await.unwrap();

    Ok(())
}

