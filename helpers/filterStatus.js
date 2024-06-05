const filterStatus = (query) => {
  let buttons = [
    {
      name: "All",
      status: "",
      active: ""
    },
    {
      name: "Active",
      status: "active",
      active: ""
    },
    {
      name: "Inactive",
      status: "inactive",
      active: ""
    }
  ];
  if (query.status) {
    let index = buttons.find(button => button.status === query.status);
    index.active = "active";
  } else {
    let index = buttons.findIndex(button => button.status === "");
    buttons[index].active = "active";
  }
  return buttons;
}

module.exports = filterStatus;