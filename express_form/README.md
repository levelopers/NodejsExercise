# express form application
#### ---using express without middleware

#### Instruction

    1. download file using git or .rar file

    2. install node modules by npm ([click if you dont have](https://nodejs.org/en/))
        cmd:
            npm install
    
    3. run application with node command 
        cmd:
            node examforms.js

    4. open browser enter url
        url:
            http://localhost:3000


    Nodejs version : v10.13.0
    testing OS : windows 10 

#### Description
    
    manage input object :
            Change /list to show the list sorted by name.
    
            Create a /delete page that asks for a name to delete. It then POSTs to /deleted 
            which confirms that the name was deleted. This page has a button to go back Home.

    save state file when server down

    log state file when server up

            Make the server save the entered names to a file when the server is terminated 
            by a Ctrl-C and load those names when the server is restarted.
        
    
