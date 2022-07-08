authentication :- means how secure is the user who is running your website.So i have divided levels of authentication:
so starting from the level 1 which will have the least security to the level 6 which will have the highest security 
like google or facebook. soo lets see

----level 1 :(LOGIN ID & PASSWORD) so at level 1 we will just store the user's password inside our database(in the plain text) and when 
the users trys to login we will featch the details from the req.body.password (using body parser) and then compare it with the value which
is stored in the database. so i consider there is no security at all so we have to level up.


----level 2:(ENCRYPTION) At level we we have used the method of encryption and decryption by using the package of mongoose-encryption
in this method we will have  a KEY which will be responsibe for the encryption / decryption of the password and then we will
save those password to database to ensure more security we will put our KEY in a secret file(.env) to use it we will install 
a package of dotev and require it in our code and then gitignore that file view code of level 2 for more clarity..


----level 3:(HASHING) so in the previous level if someone find a key then its super easy to crack the password so that not save so,
we are leveling up and now we will use the concept of HASHING. In this, once the user has created the password then we will pass 
it trough a hash function then it will provide a hash then we will store the hash in the database.(HASH function will always 
provide the same output for the same input pass:123 , hash:eudv3d673v2c623 and everytime we enter 123 it will provide the same 
hash:eudv3d673v2c623) and then when the user tries to login again we will convert his login password to hash code then, will
compare it with the database if both are same so we will proceed to the next step.To use it we will install an NPM package MD5.


----level 4:(SALTING) now a days computers are very fast and will be getting faster in future they  can generate lakhs of hash 
codes witin a sec.So we also have to level up , now we will use the concept of salting. in this we will be using the algorithm bcrypt
firstly we will do the same thing as we did in hashing -- convert the password into hashcode and then we will add a randon set of
characters/numbers to the resulatant hashcode. and then we will perfrom the hash function of the addition of both of them(hascode+random)
so we will get a new hash code so this is (1 round of saltinng) you and do as many salting round as you want now a days 10 round are good.
but remember the random set of char/ num will remain same in the the rounds.(visit level4 commits to review the code).


          ![images](https://user-images.githubusercontent.com/99245027/177948704-714fca4e-9d48-4075-8d0e-4b65f57ec549.jpg)

