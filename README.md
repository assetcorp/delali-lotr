# The Lord of the Rings Showcase

A React, Typescript web application to showcase the Lord Of The Rings.

## Installation

Clone the repository

```bash
git clone https://github.com/assetcorp/delali-lotr
```

Enter the folder in which you cloned the repo and install all dependencies

```bash
cd delali-lotr && yarn install
```

After everything is installed, you can run `yarn dev` or `npm dev` to start the development server.
You can then navigate to <http://localhost:3000> to view the web app in your bowser

## Environment variables

In order for the web app to work, you will need your LOTR API key. You can get one via <https://the-one-api.dev/>.
Then create a `.env` file with the following content:

```bash
LOTR_API_KEY=<YOUR_API_KEY>
```

Replace `<YOUR_API_KEY>` with the API you obtaiend from the LOTR API.

## Testing

The SDK includes an e2e testing suit using playwrite. To run the tests just run `yarn test`. You can also run the test in UI mode by typing `yarn test --ui` in your command window
