# How To Run

## Frontend

* Install node.js and use npm (inside node.js) install yarn
* set server SSH hostname to Panel ( For privacy concern, not listed here )

```
scp -r ./build ween-Versee:/home/www/energy-panel/
```

## Backend

* set server SSH hostname to Panel ( For privacy concern, not listed here )
* The backend code is at /home/liu/backend/
* install `screen` on yourv server ( for Panel, already installed )
* install `python` 3.8+ on yourv server ( for Panel, already installed )
* pip install `django` on yourv server ( for Panel, already installed )

Login Server

```
ssh Panel
```

on server, create or retrive the screen "backend":

```
# For the first time you use the screen
screen -S backend
# Or if you already created the screen named "backend"
screen -r backend
```

inside screen "backend"

```
cd /home/liu/backend/
python manage.py runserver 8000
```

## URL redirection

* Used nginx. See `/home/liu/backend/nginx.conf`

## Core Algorithm

`/home/liu/backend/api/core/xxx.py`
