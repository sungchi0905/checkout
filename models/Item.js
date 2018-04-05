var db = require('../dbconnection'); //reference of dbconnection.js  
var Item = {  
    getAllItems: function(callback) {  
        return db.query("Select * from item", callback);  
    },  
    getItemById: function(id, callback) {  
        return db.query("select * from item where Id=?", [id], callback);  
    },  
    addItem: function(Item, callback) {  
        return db.query("Insert into item(acct_id, item_name, price, group_id) values(?,?,?,?)", [Item.acctId, Item.itemName, Item.price, Item.group_id], callback);  
    },  
    deleteItem: function(id, callback) {  
        return db.query("delete from item where Id=?", [id], callback);  
    },  
    updateItem: function(id, Item, callback) {  
        return db.query("update item set item_name=?,price=?,group_id=? where id=?", [Item.itemName, Item.price, Item.groupId, Item.id], callback);  
    },
  
    //add item group
    addItemGroup: function(ItemGroup, callback) {  
        return db.query("Insert into item_group(acct_id, group_name) values(?,?)", [ItemGroup.acctId, ItemGroup.groupName], callback);  
    },  
};  
module.exports = Item;  