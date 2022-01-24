export default (context, inject) => {
  const businessTypes = [
    {
      id: 1,
      url: require("~/assets/icon/car_icon.svg"),
      title: "Car Dealer",
      type: "type_1",
    },
    {
      id: 2,
      url: require("~/assets/icon/education_icon.svg"),
      title: "Education",
      type: "type_2",
    },
    {
      id: 3,
      url: require("~/assets/icon/hvac_icon.svg"),
      title: "HVAC",
      type: "type_3",
    },
    {
      id: 4,
      url: "",
      title: "Mauri Snon",
      type: "type_4",
    },
    {
      id: 5,
      url: "",
      title: "Fusce Digs",
      type: "type_5",
    },
    {
      id: 6,
      url: "",
      title: "Pellentesqu",
      type: "type_6",
    },
    {
      id: 7,
      url: "",
      title: "Curabitur",
      type: "type_7",
    },
    {
      id: 8,
      url: "",
      title: "Doneclib",
      type: "type_8",
    },
  ]

  const businessRoles = [
    {
      value: "owner",
      text: "Owner",
    },
    {
      value: "marketing_director",
      text: "Marketing Director",
    },
    {
      value: "creative_director",
      text: "Creative Director",
    },
    {
      value: "account_director",
      text: "Account Director",
    },
    {
      value: "project_manager",
      text: "Project Manager",
    },
    {
      value: "other",
      text: "Other",
    },
  ]

  inject("businessTypes", businessTypes)
  inject("businessRoles", businessRoles)
}
