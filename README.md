# Instagram Clone

This is a clone of Instagram made with React, and uses Laravel as the backend API. It has the following features:
- Users can login/signup (using JWT for authentication).
- Users can edit their profiles.
- Users can follow others.
- Users can create posts with captions.
- Users can browse, like and comment on posts in the feed page according to users that they follow.
- Users can get recommendations of users to follow (according to a depth of 2 follower nodes).

## How to run:

After cloning the repository, follow the steps below in each respective folder:

### backend
- Run `composer install`, and wait for the dependencies to install.
- Copy the file `.env.example` and paste it as `.env`. Inside the `.env` file, make sure to specify your database connection in the `DB_CONNECTION=sqlite` section.
- Run the following commands:
  - `php artisan key:generate`
  - `php artisan jwt:secret`
  - `php artisan storage:link`
  - `php artisan migrate` (use `--seed` if you want some predefined data)

To serve the backend, run: `php artisan serve`

### frontend
- Run `npm install` to install dependencies.

To start the frontend, run: `npm start`.
