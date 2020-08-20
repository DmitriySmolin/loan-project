export default class Difference {
  constructor(oldOfficer, newOfficer, items) {
    try {
      this.oldOfficer = document.querySelector(oldOfficer);
      this.newOfficer = document.querySelector(newOfficer);
      this.oldItems = this.oldOfficer.querySelectorAll(items);
      this.newItems = this.newOfficer.querySelectorAll(items);
      this.items = items;
      this.oldCounter = 0;
      this.newCounter = 0;
    } catch (error) {}

  }

  bindTriggers(btnPlus, items, counter) {
    btnPlus.addEventListener("click", () => {
      if (counter < items.length - 2) {
        items[counter].style.display = "flex";
        counter += 1;
      } else {
        items[counter].style.display = "flex";
        items[items.length - 1].remove();
      }
    });
  }

  hideItems(items) {
    items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = "none";
      }
    });
  }

  init() {
    try {
      this.hideItems(this.oldItems);
      this.hideItems(this.newItems);

      this.bindTriggers(this.oldOfficer.querySelector(".plus"), this.oldItems, this.oldCounter);
      this.bindTriggers(this.newOfficer.querySelector(".plus"), this.newItems, this.newCounter);
    } catch (error) {}

  }
}