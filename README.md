# Afiliados - Frontend

This is a challenge by [Coodesh](https://lab.coodesh.com/devmateusalves/fullstack-afiliados).

### Technologies
- Node 16.13
- Docker 24.0.2
- React (Next and Tailwind)


### Run with Docker
 
First of all, make sure to have Docker already installed. After you done that, go to the following steps:

- Clone this project and then go to the repository directory
- Into the `afiliados` folder, there are a `.env.example` file. Make a copy of that and rename to `.env`.
- Change the `NEXT_PUBLIC_BASE_URL` com a url do backend.
- Then, go to the root project folder, then run that to start the project:
```sh
sudo docker compose up
```
It will starts a local web server at http://localhost:3000/