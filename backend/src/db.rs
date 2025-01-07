use sqlx::{Pool, Sqlite};
use sqlx::migrate::MigrateDatabase;
use std::error::Error;

use crate::Post;

const DB: &str = "sqlite://sqlite.db";

async fn create_table(pool: &Pool<Sqlite>) {
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY NOT NULL,
            title VARCHAR(100) NOT NULL,
            date VARCHAR(50) NOT NULL,
            desc VARCHAR(300) NOT NULL,
            content VARCHAR(5000) NOT NULL
         );
        ")
        .execute(pool)
        .await
        .expect("Couldn't create table");
}

pub async fn insert_post(
    pool: &Pool<Sqlite>,
    title: String,
    date: String,
    desc: String,
    content: String,
    ) {
    sqlx::query("INSERT INTO posts (title, date, desc, content) VALUES (?, ?, ?, ?)")
        .bind(title)
        .bind(date)
        .bind(desc)
        .bind(content)
        .execute(pool)
        .await
        .unwrap();
}

pub async fn get_posts(pool: &Pool<Sqlite>) -> Result<Vec<Post>, Box<dyn Error>> {
    let posts: Vec<Post> = sqlx::query_as("SELECT * FROM posts")
        .fetch_all(pool).await?;

    Ok(posts)
}

pub async fn get_post_by_id(pool: &Pool<Sqlite>, post_id: u32) -> Post {
    let post: Post = sqlx::query_as("SELECT * FROM posts WHERE id = (?))")
        .bind(post_id)
        .fetch_one(pool)
        .await
        .unwrap();

    post
}

pub async fn setup_database() -> Result<Pool<Sqlite>, Box<dyn Error>> {
    if !Sqlite::database_exists(DB).await.unwrap_or(false) {
        match Sqlite::create_database(DB).await {
            Ok(_) => println!("Created db"),
            Err(error) => println!("Cannot create db"),
        }
    }
    let pool = sqlx::sqlite::SqlitePool::connect(DB).await?;

    create_table(&pool).await;
    
    Ok(pool)
}
