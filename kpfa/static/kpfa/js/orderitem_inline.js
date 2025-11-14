document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('select[id$="-item"], input[id$="-quantity"]').forEach(function (el) {
    el.addEventListener('change', function () {
      const row = el.closest('tr');
      const itemSelect = row.querySelector('select[id$="-item"]');
      const quantityInput = row.querySelector('input[id$="-quantity"]');
      const priceField = row.querySelector('input[id$="-unit_price"]');
      const subtotalCell = row.querySelector('td.field-subtotal');

      if (itemSelect && quantityInput && priceField) {
        const itemId = itemSelect.value;
        const quantity = parseInt(quantityInput.value) || 0;

        if (itemId) {
          fetch(`/api/shopitem/${itemId}/change/`)
            .then(response => response.json())
            .then(data => {
              const price = parseFloat(data.price);
              priceField.value = price.toFixed(2);

              const subtotal = price * quantity;
              if (subtotalCell) subtotalCell.innerText = `₦${subtotal.toFixed(2)}`;
            })
            .catch(() => console.error('Error fetching item details'));
        }
      }
    });
  });
});
