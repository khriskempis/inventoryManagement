
## Inventory Management Tool

[Visit Site](https://obscure-springs-35933.herokuapp.com/)

#### Description

This web application is meant to be used as an internal tool to manage and organize a company's inventory of products and items.

##### Features

-	create users to be able to sign in
-	sign in using authentication
- 	viewing of entire company's inventory
-	creating items that can be added to the database
- 	viewing item and its details
- 	updating of current items in the database
- 	deleting specific items

----
##### User Flow

![](./public/source-files/img/landing-page.png)

The landing page has all the information about the product and the functionality that it currently
has. If you click the Try for Free button it will automatically scroll down to the register button.

![](./public/source-files/img/register-form.png)

You can also click the Sign In link at the top-right of the landing page which will take you to the Sign-in page where you must provide your username and password to access the website.

![](./public/source-files/img/sign-in.png)

Once signed in, you will then have access to view the inventory.
In the upper left hand corner is a button to add an item.
To the right of each item are buttons to view/edit and delete items.

![](./public/source-files/img/main.png)

From the main page, you can edit each individual item.
To update an item, simply click the update item button.
A form will pop up and will display a dropdown menu of the fields in which you can edit along with a text area to input a value.
Clicking the add button will include the field and value in the changes to be updated section.
Once you are sure of the changes to be made, click the update fields button above the form and your changes will be immediately displayed.

![](./public/source-files/img/item-display.png)

----

Technologies Used 

- HTML
- CSS
- jQuery
- Node.js
- Express
- Passport
- MongoDB
- Mongoose