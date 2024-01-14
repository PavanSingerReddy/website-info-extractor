# Website Info Extractor

Extract essential information from any website with ease!

## About

website info extractor is a Node.js API that empowers you to seamlessly extract valuable metadata from websites, including :

`Title`
`Description`
`Keywords`
`Images`
`Open Graph (OG) tags`
**And more!**
## Getting Started

### Installation : 

1. **Clone the project from GitHub :**

```
git clone https://github.com/PavanSingerReddy/website-info-extractor
```

2. **Install Dependencies :**


```
cd website-info-extractor
npm install
```

### Setup : 

1. **Create .env File :**

In the root directory, create a `.env` file with the following variables:

```
PORT=<your_port> 
APIKEY=<your_api_key>
```

Replace `<your_port>` and `<your_api_key>` with your desired port number and API key respectively.


### Optional : 

You can also set the proxy environment variables through which your Website Info Extractor can send the request to the appropriate website for getting the metadata.you can set the proxy by adding these two environment variables : 

```
PROXYPORT=<Your_Proxy_Server_Port_Number>
PROXYURL=<Your_Proxy_Server_Ip_Address>
```


## Usage : 

### Local API :

1. **Start the API :**

Go to the root of the project and type the following command to start the node js api :

```
node server.js
```


2. **Send a POST request to the API :**

Send a POST request to the localhost API with the API key in the URL, like so:

```
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "url=https://www.example.com" http://localhost:<your_port>/<your_api_key>
```
In the form-encoded body of the request, include `"url"` as a key and the website URL you want to fetch information from as the value.

You will receive the metadata of the specified website in JSON format.



Please replace `<your_port>` and `<your_api_key>` with the actual values you want to use.


### Live API :

1. **Send a POST request to the live API:**

Send a POST request to the Live API with the API key in the URL, like so:

```
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "url=https://www.example.com" https://webinfo-pavan.cyclic.app/7d8b5ac6125c186b329a6ef5de74b6cc
```

In the form-encoded body of the request, include `"url"` as a key and the website URL you want to fetch information from as the value.

You will receive the metadata of the specified website in JSON format.


### Response : 

The API will return the extracted metadata in JSON format :

```json
{
  "title": "Example Website",
  "description": "This is an example website.",
  "keywords": ["example", "website", "tags"],
  "images": ["https://www.example.com/image1.jpg", "https://www.example.com/image2.jpg"]
}
```

## Contributing

We welcome contributions! Feel free to open issues or pull requests to improve this project.

## License

MIT License: LICENSE