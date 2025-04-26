export interface Author {
  name: string;
  picture: string;
  bio: string;
  profession: string;
  github: string;
  bluesky: string;
  linkedin: string;
  email: string;
}

// Author information
export const AUTHOR: Author = {
  name: "Doru Blânzeanu",
  picture: "https://github.com/dblnz.png",
  profession: "Software Engineer",
  bio: "Passionate about systems, Rust, and clean code. Currently exploring WebAssembly.",
  github: "github.com/dblnz",
  bluesky: "dblnz",
  linkedin: "linkedin.com/in/dblnz",
  email: "dblnz@pm.me"
};