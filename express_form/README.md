# express form 

#### --- managing file data

### Instruction

    1. download express_form folder

    2. enter "./express_form" directory and install node modules          
        cmd:
            npm install
    
    3. run application 
        cmd:
            node examforms.js

    4. open URL 
        url:
            http://localhost:3000


    Nodejs version : v10.13.0
    testing OS : 64-bit windows 10 

#### Description
    
    manage input object :
            Change /list to show the list sorted by name.
    
            Create a /delete page that asks for a name to delete. It then POSTs to /deleted 
            which confirms that the name was deleted. This page has a button to go back Home.

    save state file when server down

    log state file when server up

            Make the server save the entered names to a file when the server is terminated 
            by a Ctrl-C and load those names when the server is restarted.
        
    
