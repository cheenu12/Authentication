authentication :- means how secure is the user who is running your website.So i have divided levels of authentication:
so starting from the level 1 which will have the least security to the level 6 which will have the highest security 
like google or facebook. soo lets see

----level 1 : so at level 1 we will just store the user's password inside our database(in the plain text) and when the users trys to login
we will featch the details from the req.body.password (using body parser) and then compare it with the value which is 
stored in the database. so i consider there is no security at all so we have to level up.


----level 2: At level we we have used the method of encryption and decryption by using the package of mongoose-encryption
in this method we will have  a KEY which will be responsibe for the encryption / decryption of the password and then we will
save those password to database to ensure more security we will put our KEY in a secret file(.env) to use it we will install 
a package of dotev and require it in our code and then gitignore that file view code of level 2 for more clarity..


--level 3: waittt
          
