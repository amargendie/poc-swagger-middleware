Swagger-middleware Proof of Concept
=============

Fully-functional mock implementations for every operation in your API, including data persistence, all with zero code! Based in [swagger-express-middleware](https://www.npmjs.com/package/swagger-express-middleware) . Besides, the Swagger Editor is also inluded.


Prerequisites
-------------

* node.js > 4.x
* git
* docker
* paas heroku

#### Building/Testing
To build/test the project locally on your computer:

1. **Clone this repo**<br>
For deployment (read only, public access)

    git clone https://amargendie@bitbucket.org/isbanapimanagement/poc-swagger-middleware.git

For development (full access, auth. users)

    git clone git@gitlab.ci.gsnet.corp:apimanageruk/poc-swagger-middleware.git


**Tip:** For windows users, if you recieve this error: "Filename too long" the try to run this cmd:

    git config --system core.longpaths true
  
  

2. **Install dependencies**<br>
Choose one:

    ###### Without proxy
    `npm install` <br>

    ###### With Proxy
    `npm config set proxy http://your-proxy:port` <br>
    `npm config set https-proxy http://your-proxy:port` <br>
    `npm install`

    
    

3. **Run the build script**<br>
`npm run build`


4. **Run the build script**<br>
`npm start`


5. **Build and run docker image (TODO)**


* docker build --build-arg http_proxy=http://your-proxy:port -t poc-swagger .
* docker run -p 12707:9000 -d poc-swagger


6. **Swagger edit**

You can run the swagger definition and test API locally by running
