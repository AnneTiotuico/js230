var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      let date = new Date();
      document.querySelector("#order_date").textContent = date.toUTCString();
    },
    cacheTemplate: function() {
      let iTmpl = document.querySelector("#inventory_item");
      this.template = Handlebars.compile(iTmpl.innerHTML);
      iTmpl.remove();
    },
    add: function() {
      this.lastId++;
      let item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      let found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
        }
      });

      return found_item;
    },
    update: function(item) {
      let id = this.findID(item);
      let currentItem = this.get(id);

      currentItem.name = item.querySelector("[name^=item_name]").value;
      currentItem.stock_number = item.querySelector("[name^=item_stock_number]").value;
      currentItem.quantity = item.querySelector("[name^=item_quantity]").value;
    },
    newItem: function(e) {
      e.preventDefault();
      let item = this.add();
      let currentItem = this.template({ id: item.id });

      document.querySelector("#inventory").insertAdjacentHTML('beforeend', currentItem);
    },
    findParent: function(e) {
      return e.target.closest("tr");
    },
    findID: function(item) {
      return +item.querySelector("input[type=hidden]").value;
    },
    deleteItem: function(e) {
      e.preventDefault();

      if (e.target.className === 'delete') {
        let item = this.findParent(e);
        this.remove(this.findID(item));
        item.remove();
      }
    },
    updateItem: function(e) {
      if (e.target.closest('input')) {
        let item = this.findParent(e);
        this.update(item);
      }
    },
    bindEvents: function() {
      document.querySelector("#add_item").addEventListener("click", this.newItem.bind(this));
      document.querySelector("#inventory").addEventListener("click", this.deleteItem.bind(this));
      document.querySelector("#inventory").addEventListener("blur", this.updateItem.bind(this), true);
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', e => inventory.init.bind(inventory)());
