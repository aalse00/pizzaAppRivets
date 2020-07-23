var data = {
    content: {
      menu: 'MENU',
      addToBag: 'Add to bag',
      pizzaBag: 'Your pizza bag',
      bagEmpty: 'Your pizza bag is empty ! Please select some from the menu.',
      quantity: 'Quantity',
      orderSummary: 'Order summary',
      price: 'Price',
      gst: 'GST',
      total: 'Total',
      orderNow: 'Order now !'
    },
    products: [
      {
        title: 'Veg Xtravaganza',
        price: 150,
        img: 'vegxtra.jpeg'
      },
      {
        title: 'Spicy Peprica',
        price: 150,
        img: 'peprica.jpeg'
      },
      {
        title: 'Veg Margharita',
        price: 100,
        img: 'margharita.jpeg'
      },
      {
        title: 'Paneer Tika',
        price: 150,
        img: 'paneer.jpeg'
      }
    ],

    bag: []
  };

  var controller = {
    updatePrice: function(data) {
      var bag = data.bag;
      var subtotal = 0;

      for(var i=0; i < bag.length; i++) {
        var product = bag[i];
        subtotal += product.price * product.quantity;
      }

      data.subtotal = subtotal;
      data.tax = subtotal * 0.08;
      data.total = subtotal + data.tax;
    },

    addToBag: function(e, model) {
      var product = model.data.products[model.index];
      var bag = model.data.bag;
      var updatePrice = model.controller.updatePrice;

      for(var i=0; i < bag.length; i++) {

        if(bag[i].title === product.title) {

          bag[i].quantity++;
          updatePrice(model.data);
          return;
        }
      }

      bag.push(product);
      bag[bag.length - 1].quantity = 1;
      updatePrice(model.data);
    },

    addItem: function(e, model) {
      model.data.bag[model.index].quantity++;
      model.controller.updatePrice(model.data);
    },

    removeItem: function(e, model) {
      var index = model.index,
        bag = model.data.bag,
        product = bag[index],
        updatePrice = model.controller.updatePrice;

      if(product.quantity > 1) {
        product.quantity--;
        updatePrice(model.data);
        return;
      }

      bag.splice(index, 1);
      updatePrice(model.data);
    }
  };

rivets.formatters.formatPrice = function (val) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(val);
};

rivets.formatters.getLength = function(val) {
  return val.length;
}

rivets.bind(
  document.querySelector('#container'),
  {
    data: data,
    controller: controller
  }
);

function loadImages() {
  var imgTags = document.getElementsByClassName('card-img-top');
  data.products.forEach(function (product, index) {
    imgTags[index].src = 'public/' + product.img;
  });
}