var db = require('../dbconnection'); //reference of dbconnection.js  
var Item = {  
    getAllItems: function(callback) {  
        return db.query("Select * from item", callback);  
    },  
    getItemById: function(id, callback) {  
        return db.query("select * from item where Id=?", [id], callback);  
    },  
    addItem: function(Item, callback) {  
        return db.query("Insert into item values(?,?,?)", [Item.id, Item.item_name, Item.item_name, Item.group_id], callback);  
    },  
    deleteItem: function(id, callback) {  
        return db.query("delete from item where Id=?", [id], callback);  
    },  
    updateItem: function(id, Item, callback) {  
        return db.query("update item set item_name=?,price=? where group_id=?", [Item.Title, Item.price, Item.group_id], callback);  
    }  
};  
module.exports = Item;  