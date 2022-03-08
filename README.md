# Project REST-Rant

REST-Rant is an app where users can review restaurants.

Here are the various routes a user can take on Rest-Rant.

| Method      | Path                    | Purpose                  |
|:------------|:-----------------------:|-------------------------:|
| GET         |     /                   | Home page                |
| GET         |    /places              | Places index page        |
| POST        |    /places              | Create new place         |
| GET         | /places/new             | Form to create new place |
| GET         | /places/:id             | Place details            |
| PUT         | /places/:id             | Update places            |
| GET         |/places/:id/edit         | Edit existing places form|
| DELETE      | /places/:id             | Delete given place       |
| POST        | /places/:id/rant        | Create rant about place  |
| DELETE      | /places/:id/rant/:rantId| Delete rant about place  |
| GET         |       *                 |  404 page                |