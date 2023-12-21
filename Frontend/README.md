# TenderRelease

# Full Stack Track

This is a decentralized web app for automating and removing the corruption in tender biddings.

### [Backend Repo Link](https://github.com/TenderRelease/backendtenderrelease)

Currently there is one tender registered with tender Id 123 and there is one company registered with company name: Company1.
In case the tender registeration deadline is over which is 1 day, you can go to admin panel whose credentials are mentioned here downside and add new tender to check the app.

### Also after registeration NFT can be added in metamask on binance testnet chain with the token id as received after registration and contract address as mentioned above in the link above and in backend repository.

## To check all transactions on the smart contract use the following url: ```https://testnet.bscscan.com/address/0xb23A4FcdC0E4d65fE3ecdDa523d7cC733d2A29aF```


## Running the app

``` starting the app
npm i
npm run start
```

### Routes

Home route gives infomation about the application and its advantages

```Home route
https://tenderrelease-61d5.onrender.com/
```

You have to login into the application for accessing the admin panel. New tenders can be floated using the admin route.

Currently there is only one admin signed up after which sign up route was removed.

The details are as follows:
Username: TeamNoobs
Password: TeamNoobs

``` Admin route
https://tenderrelease-61d5.onrender.com/admin
```


This route is used for registering new companies against the tender mentioned on the page for which bidding is live at that time.

## To check your transaction hash use the following url: ```https://testnet.bscscan.com/tx/{transactionHash}```

``` Register route
https://tenderrelease-61d5.onrender.com/register
```


Once the time for the bidding gets over which was set from admin panel the smart contract registration closes and the winner for that tender gets freezed which can seen on the result route


``` Result route
https://tenderrelease-61d5.onrender.com/result
```

The app has been deployed on render using this github repository and the backend repository can be found [here](https://github.com/TenderRelease/backendtenderrelease)

### [Deployed App Link](https://tenderrelease-61d5.onrender.com/)

Made with ❤️ by Team Noobs - [Sourabh Choudhary](https://github.com/SD-IITKGP), [Mahim Jain](https://github.com/jainmahim) and [Abhishek Sarjaliya](https://github.com/Abhi21sar)
