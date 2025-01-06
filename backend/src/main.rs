use axum::response::IntoResponse;
use axum::{Router, routing::get};
use axum::Json;
use sqlx::migrate::MigrateDatabase;
use sqlx::Sqlite;
use std::error::Error;
use std::net::SocketAddr;
use tokio::net::TcpListener;

use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Deserialize, Serialize)]
struct MyStruct {
    my_field: String
}

async fn return_a_struct_as_json() -> impl IntoResponse {
     let my_struct = MyStruct { my_field: "Hello world!".to_string() };

     Json(my_struct)
}

async fn root() -> impl IntoResponse {
    Json(json!("Ok"))
}

#[derive(Debug, sqlx::FromRow)]
struct Post {
    title: String,
}

const DB: &str = "sqlite://sqlite.db";

fn api_routes() -> Router {
    Router::new()
        .route("/", get(root))
        .route("/ex", get(return_a_struct_as_json))
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    if !Sqlite::database_exists(DB).await.unwrap_or(false) {
        match Sqlite::create_database(DB).await {
            Ok(_) => println!("Created db"),
            Err(error) => println!("Cannot create db"),
        }
    }
    let pool = sqlx::sqlite::SqlitePool::connect(DB).await?;
    let result = sqlx::query("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL);").execute(&pool).await.unwrap();
    let res = sqlx::query("INSERT INTO posts (title) VALUES (?)")
        .bind("Example title")
        .execute(&pool)
        .await
        .unwrap();

    let posts: Vec<Post> = sqlx::query_as("SELECT * FROM posts")
        .fetch_all(&pool).await?;
    for post in posts.iter() {
        println!("{post:?}");
    }

    let router = Router::new()
        .nest("/api/v1", api_routes());

    let addr = SocketAddr::from(([127,0,0,1], 8000));
    let tcp = TcpListener::bind(&addr).await.unwrap();

    axum::serve(tcp, router).await.unwrap();

    Ok(())
}

