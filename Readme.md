
# Poietic Generator Reloaded

## 1. Requirements

First, make install ruby and a proper version of rubygems (>=1.7) on your system

    sudo apt-get install rubygems1.8

Then, install  headers packages required to build some gems

    sudo apt-get install libmysqlclient-dev libsqlite3-dev

Also install mandatory gem packages on your system

    sudo gem install bundle 
    sudo gem install capistrano capistrano-ext
    sudo gem install thin

And make sure that /var/lib/gems/1.8/bin is in your path. Update your ~/.profile 
or ~/.bashrc or simply run

    export PATH=$PATH:/var/lib/gems/1.8/bin/

Finally, from the project directory, run the following command to install
locally into the "vendor/bundle" directory the gems required by this project
and all their dependencies :

    bundle install --path vendor/bundle


## 2. Configuration

Copy config/config.ini.example to config/config.ini then edit it to your needs.

Create a tmp directory locally. It will be use by the devel-script to run the service.

## 3. Running (development mode)

Simply type the following command, from the project directory :

    ./devel-run.sh

## 4. Deploying 

### 4.1. Configuring the web server

Install a reverse proxy server, like nginx :


    sudo apt-get install nginx

In the directory "/etc/nginx/sites-enabled/", create a configuration file for 
a virtual host called "poietic-generator.com", with the following content :

    upstream poietic-generator_cluster {
        server  unix:/var/tmp/poietic-generator.sock;
    }

    server {
        listen          80;
        server_name     poietic-generator.com;
     
        access_log      /var/log/nginx/poietic-generator.access_log;
        error_log       /var/log/nginx/poietic-generator.error_log warn;
    
            root            /var/www;
            index           index.php index.html;
    
            location / {
                break;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-Proto https;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass http://poietic-generator_cluster;
    
                # in order to support COPY and MOVE, etc
                set  $dest  $http_destination;
                if ($http_destination ~ "^https://(.+)") {
                    set  $dest   http://$1;
                }
                proxy_set_header  Destination   $dest;
            }
    }


The web server will then redirect any external request to internal unix
socket `/var/tmp/poietic-generator.sock` .

Enable the configuration :


    ln -s /etc/nginx/sites-available/poietic-generator.com \
        /etc/nginx/sites-enabled/poietic-generator.com

Restart nginx :


    /etc/init.d/nginx restart


### 4.1. Configuring 


