## This is a Next JS Project

Before start project:<br/>
Have to create your own token in GitHub account.<br/>
Go to settings of GitHub > Go to develop settings > Create Personal Access Token > Have to select field: "repo" and "user" in the list.<br/>
Copy this token and replace it in file apolloClient.js<br/>
Open directory of project and go to lib folder where will be apolloClient.js<br/>
In 10-th line code in method *localStorage.setItem("token", **"the token that copied"**)* replace the second property with the token you created.<br/>
![image](https://user-images.githubusercontent.com/48220261/119320315-bfcfd480-bc7b-11eb-93b2-068efb8b3c2e.png)

First, run the development server:

```bash
npm install
# and
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

![image](https://user-images.githubusercontent.com/48220261/119269618-e862ba80-bbf8-11eb-88ee-a0b85dbec440.png)

## Technologies

React / NextJS (SSR) / Graphql / Apollo / Next-Auth
